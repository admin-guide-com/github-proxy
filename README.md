# GitHub Proxy

Cloudflare Workers Proxy for GitHub releases to support IPv6.

## Usage

Grab the GitHub release asset download url and put it behind the proxy domain:

```
https://github-proxy.marcelcoding.workers.dev/<github-release-asset-url>
https://github-proxy.marcelcoding.workers.dev/https://github.com/traefik/traefik/releases/download/v2.4.13/traefik-v2.4.13.src.tar.gz

https://github-proxy.marcelcoding.workers.dev/<account>/<repo>/<version>/<file>
https://github-proxy.marcelcoding.workers.dev/traefik/traefik/v2.4.13/traefik-v2.4.13.src.tar.gz
```
