# Dream Tour — GitHub Pages deploy

Files: index.html, manifest.webmanifest, sw.js, icons/ (all must sit in the same folder).

1. New GitHub repo → upload ALL files/folders (keep `icons/`).
2. Settings → Pages → Branch: main, folder: / (root) → Save.
3. Open https://<user>.github.io/<repo>/ (HTTPS = PWA install works).
4. Firebase Console → Authentication → Settings → Authorized domains → add `<user>.github.io`.
5. Add Google + Email/Password sign-in providers; set Realtime Database rules.
6. First admin: sign up with zahidgfxdeveloper@gmail.com (ADMIN_EMAILS) or set users/<uid>/role = "admin".
7. When you re-upload index.html, bump VERSION in sw.js so players get the update.

Logo / name / images / payment numbers: Admin → Appearance & Rewards, Payment Setup, Categories, Banners, Shop.
Replace icons/*.png (192, 512, maskable-512, apple-touch-icon 180) with your own logo for the home-screen icon.
Demo mode: add #demo to the URL.
