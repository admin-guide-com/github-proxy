import { Router } from "itty-router";

const INDEX_PAGE = `<pre>https://github-proxy.marcelcoding.workers.dev/&lt;github-release-asset-url&gt;
https://github-proxy.marcelcoding.workers.dev/https://github.com/traefik/traefik/releases/download/v2.4.13/traefik-v2.4.13.src.tar.gz

https://github-proxy.marcelcoding.workers.dev/&lt;account&gt;/&lt;repo&gt;/&lt;version&gt;/&lt;file&gt;
https://github-proxy.marcelcoding.workers.dev/traefik/traefik/v2.4.13/traefik-v2.4.13.src.tar.gz</pre>`;

const ERROR_HANDLER = (error) => new Response(error.message || "Server Error", { status: error.status || 500, });

const router = Router();

router.get("/", () => new Response(INDEX_PAGE, { headers: { "Content-Type": "text/html" }, }));

// https://github.com/traefik/traefik/releases/download/v2.4.13/traefik-v2.4.13.src.tar.gz

router.get("/:account/:repo/:version/:file", ({ params }) =>
  fetch(`https://github.com/${params.account}/${params.repo}/releases/download/${params.version}/${params.file}`)
);

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

addEventListener("fetch", (event) => event.respondWith(router.handle(event.request).catch(ERROR_HANDLER)));
