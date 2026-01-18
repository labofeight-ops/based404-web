# BASED404 Web Dashboard

Complete web application with Telegram authentication and user dashboard for the BASED404 AI bot.

## Features

- 🔐 **Telegram OAuth** - Secure login with Telegram
- 📊 **User Dashboard** - View plan, doses, and stats
- 💳 **Payment Integration** - Stripe subscription management  
- 🎨 **Cyberpunk Design** - Matching landing page aesthetic
- 🔒 **Protected Routes** - JWT authentication

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update with your values:

```env
# Get from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=based404official

# Generate with: openssl rand -base64 32
JWT_SECRET=your_secure_random_string

# Use same database as Telegram bot
POSTGRES_URL=postgresql://...
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Deploy to Railway

#### Option 1: Connect GitHub

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select `labofeight-ops/based404-web`
4. Add environment variables in Railway dashboard
5. Railway auto-deploys on every push to `main`

#### Option 2: CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### 5. Connect Custom Domain

In Railway project:
1. Settings → Domains
2. Add `based404.com`
3. Update DNS:
   - Type: CNAME
   - Name: @
   - Value: `your-project.railway.app`

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── telegram/route.ts   # Telegram OAuth handler
│   │   └── logout/route.ts     # Logout endpoint
│   └── user/
│       └── profile/route.ts    # Get user data
├── dashboard/
│   └── page.tsx                # Protected dashboard
├── login/
│   └── page.tsx                # Telegram login page
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
└── globals.css                 # Styles
```

## API Routes

### `POST /api/auth/telegram`
Verify Telegram login and create session.

**Request:**
```json
{
  "id": 123456789,
  "first_name": "John",
  "username": "john",
  "photo_url": "https://...",
  "auth_date": 1234567890,
  "hash": "abc123..."
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 123456789,
    "username": "john",
    "name": "John",
    "tier": "FREE",
    "credits": 10
  }
}
```

### `GET /api/user/profile`
Get current user data (requires Bearer token).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": 123456789,
  "username": "john",
  "name": "John",
  "photoUrl": "https://...",
  "tier": "FREE",
  "credits": 10,
  "dailyLimit": 10,
  "canBlend": false
}
```

## Database Schema

Uses same PostgreSQL database as Telegram bot:

```sql
-- Existing users table from bot
-- Just adds web-specific fields if needed
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS photo_url TEXT;
```

## Next Steps

### Implement Stripe Payments

1. Create Stripe account
2. Add products/prices in Stripe Dashboard
3. Implement `/api/stripe/checkout` endpoint
4. Add webhook handler for subscription events
5. Update dashboard with payment buttons

### Admin Dashboard

Create `/app/admin/page.tsx` with:
- User management
- Revenue analytics
- Manual tier changes
- Ban/unban users

## Support

For issues or questions:
- Email: support@based404.com
- Telegram: @based404official

---

Built with Next.js 16, Tailwind CSS, and Vercel Postgres.
