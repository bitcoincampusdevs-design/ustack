# UStack — Bitcoin Savings App

A premium, mobile-first, dark-mode fintech app for disciplined Bitcoin saving. No trading UI. Calm, vibrant, youthful. Reference image used for mood (dark surfaces, floating cards, rounded buttons, accent pops) — UStack diverges from its orange-heavy crypto-exchange vibe by leading with coral/teal/mint and replacing charts with progress rings and vault visuals.

## Visual system

- **Theme**: dark by default. Charcoal `#0B0B0F` base, elevated card `#15151B`, hairline borders.
- **Accents**: vivid coral (primary CTA), electric teal, soft mint, aqua. Bitcoin orange reserved for confirm-deposit moments only.
- **Type**: Inter (already web-safe). Large display weights for balances, tight tracking, generous line-height.
- **Surfaces**: rounded-3xl cards, soft layered shadows, glass blur on nav, subtle gradient halos behind hero card.
- **Motion**: framer-motion throughout — spring physics, layered page transitions, animated balance counter, progress-ring fill, FAB morph.

All tokens go into `src/styles.css` (`oklch`), no hardcoded colors in components.

## Scope of screens (route map)

Mobile frame centered on desktop, full-bleed on mobile.

```
/                       Splash → auto-advance to /welcome
/welcome                Welcome
/onboarding             3-slide swipe flow
/auth                   Username + phone (+ optional email)
/auth/otp               OTP verify
/app                    Layout: top bar, page outlet, bottom nav, FAB, side drawer
  /app/home             Dashboard (balance, quick actions, vault carousel, tabs)
  /app/vaults           Vault list
  /app/vaults/$id       Vault detail
  /app/vaults/new       5-step create wizard
  /app/activity         Activity timeline
  /app/profile          Profile + settings (incl. Price Protection)
  /app/notifications    Notifications
  /app/deposit          Deposit (Mobile Money / Lightning tabs)
  /app/withdraw         Withdraw (with early-withdrawal modal)
```

## Key interactions

- **Layered side menu**: tapping hamburger scales `/app` content to ~0.88, slides right, reveals stacked cards behind + menu from left. Spring transition, blur on background.
- **FAB**: bottom-center "+". On tap, rotates to "×" and 4 action chips arc upward (Create Vault, Add Funds, Send, Withdraw) along an upside-down curve using framer-motion staggered springs.
- **Bottom nav**: floating glass pill, 4 tabs, active indicator slides.
- **Page transitions**: horizontal slide + slight scale between tabs via `AnimatePresence`.
- **Balance card**: animated count-up, gradient halo, glass blur.
- **Vault cards**: SVG progress rings with animated stroke-dashoffset.
- **Create-vault wizard**: stepper with smooth slide between steps; success screen has pulse glow.

## Content (mock data, frontend-only)

All data lives in a typed mock store (`src/lib/mock-data.ts`) — vaults, activity, notifications, balance. No backend this pass. Forms are visual/stateful but don't persist beyond the session.

Sample vaults: Tuition Vault, Laptop Fund, Emergency Savings, Future Business, Travel Goal.

## Components

Reusable in `src/components/ustack/`:
- `PhoneFrame` (centers mobile canvas on desktop)
- `BalanceCard`, `QuickActions`, `VaultCard`, `VaultRing`
- `Fab`, `BottomNav`, `TopBar`, `SideDrawer`
- `Stepper`, `ActivityItem`, `NotificationItem`
- `EmptyState`, `SuccessPulse`

Shadcn primitives (button, tabs, dialog, switch, slider, input, sheet) restyled via design tokens.

## Technical notes

- TanStack Start file-based routes under `src/routes/app.*.tsx` for the layout group.
- `framer-motion` for all motion (add via `bun add`).
- `lucide-react` icons already available.
- Each route gets its own `head()` with unique title/description.
- No Cloud / no auth backend this pass — visual prototype.

## Out of scope (this pass)

- Real auth, real payments (Mobile Money, Lightning), real BTC price feed.
- Persistence across reload.
- Light mode.

If you want any of those wired up after the UI lands, we can layer them in.
