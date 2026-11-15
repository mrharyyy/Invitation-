export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set("Content-Type", "application/xml; charset=utf-8");
      headers.set("X-Content-Type-Options", "nosniff");

      return new Response(request.method === "HEAD" ? null : response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    if (url.pathname === "/robots.txt") {
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set("Content-Type", "text/plain; charset=utf-8");
      headers.set("X-Content-Type-Options", "nosniff");

      return new Response(request.method === "HEAD" ? null : response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return env.ASSETS.fetch(request);
  }
};
