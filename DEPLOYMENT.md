# Deployment Guide

## Option 1: Deploy to Vercel (Recommended)

### Quick Deploy (with Vercel CLI)

If you have Vercel CLI installed:

```bash
npx vercel
```

This will:
1. Create a new Vercel project
2. Link your local code
3. Deploy to Vercel
4. Give you a live URL

### Deploy via GitHub (Recommended for Long-term)

1. **Create a GitHub repository** (use a different org/account as you mentioned):
   - Create repo at github.com (or your org)
   - Let's say: `https://github.com/big-deep/big-deep-os`

2. **Push this code to GitHub:**
   ```bash
   git remote add origin https://github.com/big-deep/big-deep-os.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Paste your GitHub repo URL
   - Vercel auto-detects it's a Next.js project
   - Click "Deploy"

4. **Auto-deployments:**
   - Every push to `main` → Vercel auto-builds and deploys
   - No more manual steps needed

### Environment Variables (if needed later)

In Vercel dashboard: Settings → Environment Variables

Currently not needed, but when you add features (comments, database, etc.) you'll add them here.

---

## Option 2: Deploy to a Different Hosting

If you don't want Vercel:

```bash
npm run build
npm start
```

Then deploy the `.next` folder using:
- **Docker** + any cloud provider
- **AWS Amplify**
- **Netlify** (might need config changes)
- **Your own server**

But Vercel is the easiest for Next.js.

---

## Testing Before Deployment

```bash
npm run dev
```

Open http://localhost:3000 and test all tabs:
- ✓ Dashboard
- ✓ Timeline
- ✓ Tasks
- ✓ Partners
- ✓ Content
- ✓ Cadence
- ✓ Research

---

## After Deployment

Once live, you'll have a URL like:
```
https://big-deep-os.vercel.app
```

Share this link with your wife. She can:
- View all the plans
- Leave comments (coming soon)
- Track progress

---

## Next Steps

1. Create GitHub repo (big-deep-os or wherever you prefer)
2. Push this code to GitHub
3. Connect to Vercel
4. Get a live URL
5. Share with wife

That's it! You're live.

---

## Updating the Site

Every time you want to make changes:

```bash
# Make your changes locally
npm run dev  # test locally

# Commit
git add -A
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Vercel auto-deploys (no extra step needed)
```

---

## Questions?

This is a Next.js app on Vercel. The deployment process is standard and straightforward. You own the code and the deployment—it's all yours.
