export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://invitation.ashish878905.workers.dev/</loc>
    <lastmod>2026-11-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      return new Response(request.method === "HEAD" ? null : xml, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    if (url.pathname === "/robots.txt") {
      const robots = `User-agent: *
Allow: /

Sitemap: https://invitation.ashish878905.workers.dev/sitemap.xml`;
      return new Response(request.method === "HEAD" ? null : robots, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};