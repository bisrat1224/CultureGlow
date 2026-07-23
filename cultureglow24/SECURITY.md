# CultureGlow24 Security Guide

## Authentication
- Payload CMS built-in authentication with bcrypt password hashing
- Session tokens expire after 2 hours
- Account locks after 5 failed login attempts for 10 minutes
- Two roles: `admin` (full access) and `owner` (content management)

## Environment Variables (Server-only)
| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection | Yes |
| `PAYLOAD_SECRET` | JWT signing secret | Yes |
| `RESEND_API_KEY` | Email service API key | No |
| `SMTP_*` | SMTP configuration for password reset | No |

## Environment Variables (Public)
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SERVER_URL` | Site base URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number |

## Content Security Policy
Configured in `next.config.ts`:
- Default-src: 'self'
- Script-src: 'self', 'unsafe-inline', Google Tag Manager
- Style-src: 'self', 'unsafe-inline', Google Fonts
- Img-src: 'self', data, Pexels, Cloudinary (when configured)

## API Rate Limiting
- Contact form: 5 requests per 15 minutes per IP
- Catering form: 3 requests per 15 minutes per IP

## TODO: Production Checklist
- [ ] Set strong `PAYLOAD_SECRET` (min 32 chars, random)
- [ ] Configure `REVALIDATE_SECRET` for webhook security
- [ ] Enable IP restriction for admin panel
- [ ] Set up Cloudinary for media storage
- [ ] Configure SMTP for password reset emails
- [ ] Enable HTTPS-only cookies
- [ ] Set up log monitoring
