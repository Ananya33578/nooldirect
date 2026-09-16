# NoolDirect — Prototype Setup Guide

This folder contains the 6 screens matching your Technical Approach flow:

| File | Step |
|---|---|
| `src/components/SignupScreen.jsx` | 01 — Weaver & Buyer Signup |
| `src/components/ProfileBriefScreen.jsx` | 02 — Profile / Brief Creation |
| `src/components/PriceCalculatorScreen.jsx` | 03 — Fair-Price Calculation |
| `src/components/OrderPaymentScreen.jsx` | 04 — Order & Milestone Payment |
| `src/components/ProductionQCScreen.jsx` | 05 — Production & Quality Check |
| `src/components/QRTaggingScreen.jsx` | 06 — QR Tagging & Delivery |
| `src/App.jsx` | Wires all 6 screens together |

## Where to put this code

You need a React project to run these files in. Two options:

### Option A — Create a new React app (recommended, ~5 min)
```bash
npx create-react-app nooldirect
cd nooldirect
npm install qrcode.react
```
Then:
1. Copy the `components/` folder into `nooldirect/src/components/`
2. Replace `nooldirect/src/App.js` with the `App.jsx` given here (rename to `App.js` or keep `.jsx` and update the import in `index.js`)
3. Run it:
```bash
npm start
```
It opens at `http://localhost:3000` — click through all 6 steps.

### Option B — Use CodeSandbox / StackBlitz (fastest, zero install)
1. Go to https://codesandbox.io → "Create Sandbox" → React template
2. Delete the default files in `src/`
3. Paste each file above into matching paths (`src/App.jsx`, `src/components/SignupScreen.jsx`, etc.)
4. In the sandbox's dependency panel, add `qrcode.react`
5. It auto-runs and gives you a shareable live link — good for showing judges without installing anything

## Deploying so judges can click a live link

Once it runs locally, deploy in one of these ways:

- **Vercel** (easiest): `npm install -g vercel` → run `vercel` inside the project folder → follow prompts → get a live URL
- **Firebase Hosting**: `npm install -g firebase-tools` → `firebase init hosting` → `npm run build` → `firebase deploy`
- **Netlify**: drag-and-drop the `build/` folder (after `npm run build`) onto netlify.com/drop

## What's stubbed vs real

- ✅ Real: form state, price calculation math, step navigation, QR code generation (actual scannable QR)
- 🔲 Stubbed (marked `// TODO` in code): Firebase Auth/Firestore writes, Razorpay/Stripe payments — these are simulated with `console.log` and timeouts so the demo flow works without backend setup

## Next steps to make it a real MVP

1. Create a Firebase project → enable Authentication (phone/email) + Firestore
2. Replace the `// TODO` comments with actual Firebase SDK calls (see data model discussed earlier: `users`, `weaverProfiles`, `products`, `orders`, `pooledOrders` collections)
3. Add Razorpay test-mode keys for the payment screen
4. Swap `console.log` QR product URL for a real hosted product page
