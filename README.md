<div align="center">

<br/>

<img src="public/assests/logo.png" alt="Wisora Logo" width="120" height="120" style="border-radius: 24px;" />

<br/><br/>

# ✦ WISORA

### *Talk to real experience.*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Wisora.app-10b981?style=for-the-badge&labelColor=0f172a)](https://wisora.vercel.app)
[![Version](https://img.shields.io/badge/Version-1.0.0-6366f1?style=for-the-badge&labelColor=0f172a)](https://github.com/VighneshBhati/Wisora)
[![License](https://img.shields.io/badge/License-Private-f43f5e?style=for-the-badge&labelColor=0f172a)](https://github.com/VighneshBhati/Wisora)
[![Built With](https://img.shields.io/badge/Built_With-React_+_TypeScript-3b82f6?style=for-the-badge&labelColor=0f172a)](https://github.com/VighneshBhati/Wisora)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║    Most platforms sell you courses.  Wisora gives you people.    ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

<br/>

</div>

---

<div align="center">

## ⚡ What is Wisora?

</div>

> India's most intelligent expert guidance platform — where students, professionals, and institutions connect directly with verified domain experts for live, on-demand 1-on-1 sessions.
>
> No pre-recorded videos. No generic advice. Just **real conversations** with people who've actually been there.

<br/>

---

<div align="center">

## 🎭 Three Worlds. One Platform.

</div>

<br/>

<div align="center">

| 🧑‍🎓 &nbsp; **PERSONAL** | 🏛️ &nbsp; **INSTITUTIONAL** | 🧠 &nbsp; **EXPERT** |
|:---:|:---:|:---:|
| Students & individuals | Colleges & enterprises | Verified professionals |
| Book 1-on-1 sessions | Manage team-wide access | Offer your time & knowledge |
| AI-guided discovery | Campus visit coordination | Track earnings & bookings |
| Wallet & subscriptions | Credits & reporting | Build your expert profile |

</div>

<br/>

> **One login. All three modes. Zero friction.**

---

<div align="center">

## 🚀 Core Features

</div>

<br/>

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🎯  Expert Discovery      Browse by domain, rating & slot     │
│   📅  Smart Booking         30 / 60 min live sessions           │
│   🤖  AI Assistant          Context-aware guidance chatbot      │
│   🏛️  Institutional Hub     Events, visits & team management    │
│   💳  Credits & Wallets     Flexible plans for every user       │
│   📊  Expert Dashboard      Earnings, requests & analytics      │
│   🔐  Google OAuth          One-click secure sign-in            │
│   🌐  Bilingual             Full Arabic + English support       │
│   📱  Mobile Ready          Capacitor-powered native app        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🛠️ Tech Stack

</div>

<br/>

<div align="center">

| Layer | Technology |
|:------|:-----------|
| ⚛️ &nbsp; **Frontend** | React 18 + TypeScript + Vite |
| 🎨 &nbsp; **Styling** | Tailwind CSS + shadcn/ui + Framer Motion |
| 🗄️ &nbsp; **Backend** | Supabase — Auth, DB, Storage, Edge Functions |
| 🔥 &nbsp; **Auth** | Firebase + Google OAuth (signInWithPopup) |
| 🧠 &nbsp; **AI** | OpenRouter API |
| 📦 &nbsp; **State** | Redux Toolkit |
| 📱 &nbsp; **Mobile** | Capacitor (iOS + Android) |
| 🚀 &nbsp; **Deploy** | Vercel + Netlify ready |

</div>

---

<div align="center">

## ⚙️ Getting Started

</div>

<br/>

**1. Clone the repo**

```bash
git clone https://github.com/VighneshBhati/Wisora.git
cd Wisora
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env
```

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI
VITE_OPENROUTER_API_KEY=your_openrouter_key

# Optional
VITE_APP_URL=http://localhost:5173
```

**4. Run locally**

```bash
npm run dev
```

> App runs at `http://localhost:5173`

---

<div align="center">

## 🌍 Deployment

</div>

<br/>

**Vercel (recommended)**

```bash
# vercel.json is already configured with SPA rewrites
# Just connect your GitHub repo on vercel.com and deploy
```

**Before going live, make sure to:**

- ✅ Add your Vercel domain to **Firebase Console → Authentication → Authorized Domains**
- ✅ Add your domain to **Google Cloud Console → OAuth 2.0 → Authorized Origins**
- ✅ Set all `VITE_*` environment variables in Vercel dashboard

---

<div align="center">

## 🏗️ Project Structure

</div>

<br/>

```
wisora/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Auth screens & guards
│   │   ├── courses/         # Course management
│   │   ├── chatbot/         # AI assistant
│   │   ├── landing/         # Marketing pages
│   │   └── layout/          # Navbar, sidebar, shell
│   ├── pages/
│   │   ├── personal/        # Student dashboard & flows
│   │   ├── institutional/   # Institution dashboard
│   │   ├── expert/          # Expert portal
│   │   └── admin/           # Admin panel
│   ├── contexts/            # Auth, Language, Tenant
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Firebase + Supabase clients
│   └── i18n/                # AR + EN translations
├── public/
│   └── assests/             # Logos, avatars, 3D shapes
├── vercel.json              # SPA rewrite rules
└── capacitor.config.ts      # Mobile app config
```

---

<div align="center">

## 👥 The Team

</div>

<br/>

<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✦  Arsh Maheshwari        Founder & CEO                        ║
║                                                                  ║
║   ✦  Vighnesh Bhati         Co-Founder & Technology Partner      ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

</div>

<br/>

---

<div align="center">

## 📜 License

**Private & Proprietary**

All rights reserved © Wisora 2025.
Unauthorized use, reproduction, or distribution is strictly prohibited.

<br/>

---

<br/>

*Built with obsession. Shipped with precision.*

<br/>

**✦ WISORA — Talk to real experience. ✦**

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-VighneshBhati%2FWisora-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VighneshBhati/Wisora)

<br/>

</div>
