# Deployment Guide

## Prerequisites

- Node.js 20+
- Neon PostgreSQL database
- Vercel account (recommended)

## Environment Setup

Create a `.env.local` file with:

```env
# Required
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=your-32-char-secret

# Public
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=251900000000

# Optional
RESEND_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
```

## Vercel Deployment

1. **Connect repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Database migrations** (run once):
   ```bash
   vercel --prod
   # Then run migrations:
   vercel env pull .env.local
   npm run migrate
   ```

5. **Seed production database**:
   ```bash
   npx tsx src/seed.ts
   npx tsx src/seed/create-user.ts
   ```

## Post-Deployment Checklist

- [ ] Admin panel accessible at `/admin`
- [ ] Default user created and password changed
- [ ] All pages loading CMS content
- [ ] Images displaying correctly
- [ ] WhatsApp links working
- [ ] Contact forms functioning
- [ ] SEO metadata present
- [ ] Sitemap generated
- [ ] robots.txt configured

## Troubleshooting

### "Cannot connect to database"
- Verify `DATABASE_URL` is correct
- Check Neon connection pooling settings
- Ensure IP allowlist includes Vercel IPs

### "Payload types not found"
- Run `npm run generate:types`
- Ensure `payload-types.ts` is not gitignored

### "Admin panel blank"
- Check browser console for JS errors
- Verify `importMap.ts` is generated
- Ensure `PAYLOAD_SECRET` is set
