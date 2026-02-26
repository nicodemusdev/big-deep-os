# Big Deep OS — Quick Start

## What You Have

A fully functional marketing planning dashboard with:
- Interactive 12-month timeline
- Task tracker with priorities and phases
- Partner coordination center
- Content inventory management
- Posting cadence guide
- Research hub with contacts and resources
- 40s/50s matchbook aesthetic (warm colors + retro design)

## Run It Locally

```bash
cd /home/ubuntu/big-deep-os

# Install dependencies (one time)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You'll see a warm, retro-designed dashboard with all the marketing plan information organized by section.

## Test Each Section

Click through the navigation:

1. **Dashboard** — Overview of phases, critical tasks, key metrics
2. **Timeline** — 12-month sequence with dependencies
3. **Tasks** — Filterable by priority and phase
4. **Partners** — L4LM, JamBase, Relix coordination + handle tracking
5. **Content** — What you have, what's ready, what's missing
6. **Cadence** — Weekly posting schedule for each platform
7. **Research** — Contacts, resources, open questions

## Next Step: Deploy

See `DEPLOYMENT.md` for:
- How to push to GitHub (your own org/account)
- How to deploy to Vercel
- How to share with your wife

## Features (Current)

✅ All views populated with data from your markdown plan
✅ Retro 40s/50s design (warm primaries: rust, mustard, cream)
✅ Responsive (mobile-friendly)
✅ Fast and lightweight
✅ Ready to deploy

## Features (Coming Soon)

💭 Real-time comments for you + wife
💭 Data sync from markdown files
💭 Task status updates (drag-drop)
💭 Calendar integration
💭 Metrics dashboard (streaming, followers, engagement)
💭 Content upload/management

---

## How It's Built

- **Next.js 15** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Lucide React** — Icons
- **Zero database** — Static data (for now)

Everything is self-contained. No external services needed (except Vercel for hosting).

---

## Customization

All design tokens are in `tailwind.config.ts`:

```typescript
colors: {
  primary: { /* rust/burnt orange */ },
  accent: { /* mustard yellow */ },
  neutral: { /* warm grays */ },
}
```

Change these and the whole app updates.

---

## Want to Update the Plan?

The dashboard currently uses static data in each component. To sync with your markdown files:

1. Parse `.md` files from `~/contxta-vault/big-deep/marketing/`
2. Create a data layer (API route or static generation)
3. Feed it to the components

We can add this later if you need real-time sync.

---

## Ready?

1. Run `npm run dev` locally
2. Test it out
3. When ready, follow `DEPLOYMENT.md` to go live
4. Share the link with your wife

You're all set.
