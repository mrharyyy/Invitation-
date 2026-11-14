# Arpita & Rupesh — Wedding Invitation

A responsive wedding invitation website with separate HTML, CSS and JavaScript files, three photos and one MP4 video.

## Repository structure

```text
.
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       ├── images/
│       │   ├── couple.jpg
│       │   ├── memory-1.jpg
│       │   └── memory-2.jpg
│       └── videos/
│           └── wedding-film.mp4
├── src/
│   └── worker.js
└── wrangler.jsonc
```

## Deploy to Cloudflare Workers (Static Assets)

1. Create a GitHub repository and upload **all files and folders** from this ZIP. Keep the folder structure unchanged.
2. In Cloudflare, open **Workers & Pages** and create a Worker using the Git repository / Workers Builds flow.
3. The project uses `wrangler.jsonc`; its static assets directory is `public` and the Worker entry point is `src/worker.js`.
4. If Cloudflare asks for a build command, leave it empty for this plain static site. Use `npx wrangler deploy` as the deploy command if the setup asks for one and has Wrangler available.
5. After deployment, open the `workers.dev` URL and check the photos and video on mobile.

If you use the Cloudflare dashboard's Git integration, select the repository root as the project root. Do not upload only the `public` folder.

## Updating photos or video

Replace the file contents while keeping the exact names:
- `public/assets/images/couple.jpg`
- `public/assets/images/memory-1.jpg`
- `public/assets/images/memory-2.jpg`
- `public/assets/videos/wedding-film.mp4`

Then commit and push to GitHub; Cloudflare should redeploy from the connected repository.

## Notes

- The wedding countdown is set to 30 November 2026 (India time).
- Google Fonts are loaded online; the site still has fallback fonts if they cannot load.
- The map link opens a Google Maps search for the venue area. Please verify the exact pin before sharing the invitation widely.
- The video is served from the repository as a static asset. If it exceeds GitHub's 100 MB per-file limit, host it on Cloudinary/R2 instead and update the video source URL.
