# Deploy React P4 ke Vercel

## Struktur yang harus di-upload

Upload **isi folder project ini** ke repository GitHub. File `vercel.json` harus berada satu level dengan `package.json`, `index.html`, dan `vite.config.js`.

```text
ifs24051-pabwe2026-reactjs/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example
└── src/
```

Jangan upload `node_modules`, `dist`, atau `.env`.

## Git baru

Jika memakai repository yang sama, pastikan remote benar:

```powershell
git remote set-url origin https://github.com/lannyy16/ifs24051-pabwe2026-reactjs.git
git add .
git commit -m "update P4 React Vercel routing"
git push -u origin main
```

## Vercel

Root Directory: folder project yang berisi `package.json`.

Build Command:

```text
npm run build
```

Output Directory:

```text
dist
```

Setelah deployment `Ready`, uji langsung:

- `/auth/login`
- `/auth/register`
- `/`
- `/stats`
- `/users`
- `/profile`

`vercel.json` melakukan rewrite semua client-side route ke `index.html`, sehingga React Router dapat mengambil alih routing.
