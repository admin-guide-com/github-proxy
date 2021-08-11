import { Router } from "itty-router";

const errorHandler = (error) =>
  new Response(error.message || "Server Error", {
    status: error.status || 500,
  });

const router = Router();

// https://github.com/traefik/traefik/releases/download/v2.4.13/traefik-v2.4.13.src.tar.gz

router.get("/:account/:repo/:version/:file", async ({ params }) => {
  return fetch(
    `https://github.com/${params.account}/${params.repo}/releases/download/${params.version}/${params.file}`
  );
});

router.all("*", ({ url }) => {
  const [account, repo, x, y, version, file] = new URL(url).pathname
    .split("github.com/")[1]
    .split("/");

  const path = `/${account}/${repo}/${version}/${file}`;

  return new Response(`<a href="${path}">${path}</a>`, {
    status: 302, // found
    headers: { Location: path, "Content-Type": "text/html" },
  });
});

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request).catch(errorHandler))
);
