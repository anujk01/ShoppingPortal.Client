# ShoppingPortal Client

Standalone React + Vite storefront for the ASP.NET Core API in `../ShoppingPortal`.

## Run

1. Run `npm install` once in this folder.
2. Start `ShoppingPortal.sln` in Rider with the `http` profile. In Development, the backend starts Vite and redirects its root URL to `http://localhost:5173`.

To run only the UI during frontend work, run `npm run dev` here manually. The API uses `http://localhost:5187` by default.

The API base URL is read from `VITE_API_URL`. Copy `.env.example` to `.env.local` to override it. Sign-in calls `POST /api/auth/request-otp` and `POST /api/auth/verify-otp`; the storefront only renders after the API returns a session token. Existing tokens are checked with `GET /api/auth/me` when the app loads.

## Structure

- `src/components/LoginPage.jsx` — email/mobile OTP flow.
- `src/components/Storefront.jsx` — authenticated landing page, category rail and product cards.
- `src/services/api.js` — typed API functions and error handling.
- `src/data/catalog.js` — fallback catalog and product photography.
- `src/App.jsx` — session restoration and page selection.

Catalog photography uses remote Unsplash image URLs. Replace these with owned/local assets when the catalog content is finalized.
