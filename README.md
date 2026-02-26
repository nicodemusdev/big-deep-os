# Big Deep OS

Interactive marketing planning dashboard for Big Deep.

A 12-month launch sequence visualized and tracked in real-time. Built for Jordan and his wife to collaborate on the Big Deep marketing plan.

## Features

- **Dashboard** — Overview of phases, critical tasks, and key metrics
- **Timeline** — 12-month narrative arc with dependencies
- **Tasks** — All tasks organized by phase and priority
- **Partners** — Media partner coordination (L4LM, JamBase, Relix) and social handle tracking
- **Content** — Content inventory status, music videos, what's missing
- **Cadence** — Weekly posting schedule and platform-specific strategies
- **Research** — Partner contacts, DSP resources, brand guidelines, open questions

## Design

Warm primaries + 40s/50s matchbook aesthetic
- Rust/burnt orange (#e85d2a)
- Mustard yellow accent (#ffb300)
- Cream backgrounds (#f5f1ed)
- Retro typography (Georgia serif + modern sans)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel

This project is configured for deployment on Vercel.

1. **First time:**
   ```bash
   npx vercel
   ```

2. **Connect your GitHub repo:**
   - Create a new repo on GitHub (or use existing)
   - Push this code to GitHub
   - Import the repo in Vercel dashboard
   - Vercel will automatically build and deploy

3. **Subsequent deployments:**
   - Push to main branch → Vercel auto-deploys

### Environment Variables

None required for basic functionality.

## Structure

```
big-deep-os/
├── app/
│   ├── components/
│   │   ├── Dashboard.tsx      # Overview of phases and critical tasks
│   │   ├── Timeline.tsx       # 12-month sequence visualization
│   │   ├── Tasks.tsx          # Filterable task tracker
│   │   ├── Partners.tsx       # Partner coordination + handle tracking
│   │   ├── ContentInventory.tsx # What you have, what's ready, what's needed
│   │   ├── Cadence.tsx        # Weekly posting schedule
│   │   ├── Research.tsx       # Contacts, resources, open questions
│   │   └── Navigation.tsx     # Top navigation
│   ├── globals.css            # Global styles + retro design system
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page with tab routing
├── tailwind.config.ts         # Tailwind theme with retro colors
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

## Data Updates

Currently, dashboard content is static. To add real-time sync to your markdown files:

1. Parse markdown from `/home/ubuntu/contxta-vault/big-deep/marketing/`
2. Implement data layer (could use Vercel KV, Supabase, or GitHub API)
3. Add real-time refresh

## Future Enhancements

- [ ] Real-time comment system for Jordan + wife
- [ ] Data sync from markdown files
- [ ] Task status updates (drag-drop kanban)
- [ ] Calendar integration with Google Calendar
- [ ] Email notifications for critical deadlines
- [ ] Metrics dashboard (streaming, follower growth, engagement)
- [ ] Content upload and organization
- [ ] Collaborative editing

## Technology Stack

- **Next.js** 15+ — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Lucide React** — Icons
- **Vercel** — Hosting

## Notes for Jordan

- This is version 0.1 — a foundation for the Big Deep OS
- Use this for 1–2 weeks to see what actually matters
- Once you know what you're using most, we can add real-time collaboration, data syncing, and more features
- You own the code — fork it, modify it, extend it

## License

Private (Big Deep only)

---

**Co-built by:** Claude + Jordan
**Status:** Active Development
**Last Updated:** February 26, 2026
