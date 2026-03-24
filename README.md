# 🌐 Wisora — India's Expert Guidance Platform

<div align="center">

![Wisora](https://img.shields.io/badge/Wisora-Expert_Guidance-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-Private-f43f5e?style=for-the-badge)

*Talk to real experience. Not pre-recorded videos. Not generic advice.*

</div>

---

## 📖 Overview

**Wisora** is India's most intelligent expert guidance platform — where students, professionals, and institutions connect directly with verified domain experts for live, on-demand 1-on-1 sessions.

Most platforms sell you courses. **Wisora gives you people.**

Whether you're a student figuring out your career, a professional making a pivot, or an institution looking to upskill your team — Wisora connects you directly with verified experts for real, live conversations with people who've actually been there.

### 🎯 Who is it for?

- 🧑‍🎓 **Students** figuring out their career path
- 💼 **Professionals** making a pivot or seeking mentorship
- 🏛️ **Institutions** managing team-wide expert access at scale
- 🧠 **Experts** monetizing their knowledge and time

---

## 💡 The Problem We Solve

<div align="center">

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ❌  Generic YouTube videos don't answer YOUR specific problem  │
│   ❌  Courses take months — you need answers NOW                 │
│   ❌  LinkedIn cold messages go unanswered                       │
│   ❌  Consultants are expensive and hard to find                 │
│                                                                  │
│   ✅  Wisora connects you to the RIGHT expert in minutes         │
│   ✅  Live 1-on-1 sessions — 30 or 60 minutes                   │
│   ✅  Verified professionals across every domain                 │
│   ✅  Affordable credits-based system                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

</div>

---

## 🎭 Three Worlds. One Platform.

<div align="center">

| 🧑‍🎓 **PERSONAL** | 🏛️ **INSTITUTIONAL** | 🧠 **EXPERT** |
|:---:|:---:|:---:|
| Students & individuals | Colleges & enterprises | Verified professionals |
| Book 1-on-1 sessions | Manage team-wide access | Offer your time & knowledge |
| AI-guided discovery | Campus visit coordination | Track earnings & bookings |
| Wallet & subscriptions | Credits & reporting | Build your expert profile |
| Course access | Institutional events | Manage booking requests |

> **One login. All three modes. Zero friction.**

</div>

---

## 📈 Platform Flowchart

```mermaid
flowchart TD
    A[👤 User Signs In via Google OAuth] --> B{Select Mode}
    B --> C[🧑‍🎓 Personal]
    B --> D[🏛️ Institutional]
    B --> E[🧠 Expert]

    C --> F[Browse Expert Catalog]
    F --> G[Book 1-on-1 Session]
    G --> H[💳 Pay via Credits / Wallet]
    H --> I[✅ Session Confirmed]

    D --> J[Manage Team Members]
    J --> K[Allocate Credits]
    K --> L[Request Campus Visits]
    L --> M[📊 View Reports & Analytics]

    E --> N[Set Availability & Rates]
    N --> O[Receive Booking Requests]
    O --> P[Conduct Session]
    P --> Q[💰 Earnings Credited]

    R[(🗄️ Supabase DB\nAuth + Storage)] -.-> G
    R -.-> L
    R -.-> P

    style A fill:#e1f5ff
    style C fill:#bbdefb
    style D fill:#c8e6c9
    style E fill:#ffe0b2
    style I fill:#42a5f5
    style M fill:#66bb6a
    style Q fill:#ffa726
    style R fill:#fff9c4
```

---

## ⚡ Core Features

### 🎯 Feature Overview

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🎯 **Expert Discovery** | Browse verified experts by domain, rating & availability | ✅ Live |
| 📅 **Smart Booking** | Book 30 / 60 min live sessions with real-time slots | ✅ Live |
| 🤖 **AI Assistant** | Context-aware chatbot to guide users across the platform | ✅ Live |
| 🏛️ **Institutional Hub** | Events, campus visits & team management dashboard | ✅ Live |
| 💳 **Credits & Wallets** | Flexible credits-based plans for personal & institutional users | ✅ Live |
| 📊 **Expert Dashboard** | Earnings tracking, booking requests & analytics | ✅ Live |
| 🔐 **Google OAuth** | One-click secure sign-in via Firebase | ✅ Live |
| 🌐 **Bilingual** | Full Arabic + English support with RTL layout | ✅ Live |
| 📱 **Mobile Ready** | Capacitor-powered native iOS & Android app | 🔄 Beta |
| 💬 **Group Discussions** | Collaborative forums and shared resources | ✅ Live |

</div>

### 🔥 What Makes Wisora Different

- ✨ **Verified Experts Only** — Every expert is manually reviewed before going live
- 🖼️ **Three-Mode Architecture** — Personal, Institutional, Expert — all in one app
- 🎨 **AI-Powered Matching** — Smart chatbot helps users find the right expert fast
- 🚀 **Real-Time Booking** — No back-and-forth emails, instant slot confirmation
- 📊 **Institutional Analytics** — Full reporting suite for colleges and enterprises
- 🌐 **Built for India** — Designed ground-up for Indian students and institutions

---

## 🏗️ Architecture

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│                     ✦ WISORA ARCHITECTURE ✦                     │
└─────────────────────────────────────────────────────────────────┘

    📱 CLIENT (React + TypeScript + Vite)
              ↓
    ┌─────────────────────────────────────┐
    │   🔐 AUTH LAYER                     │
    │                                     │
    │  • Firebase Google OAuth            │
    │  • Session-based persistence        │
    │  • Protected route guards           │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │   🧠 APPLICATION LAYER              │
    │                                     │
    │  • Redux Toolkit (global state)     │
    │  • React Query (server state)       │
    │  • Context API (auth + language)    │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │   🗄️ DATA LAYER                     │
    │                                     │
    │  • Supabase PostgreSQL (database)   │
    │  • Supabase Storage (files/media)   │
    │  • Supabase Edge Functions (logic)  │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │   🤖 AI LAYER                       │
    │                                     │
    │  • OpenRouter API (chat AI)         │
    │  • Gemini API (content generation)  │
    │  • Vapi (voice AI sessions)         │
    └─────────────────────────────────────┘
```

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) | **React 18 + TypeScript** | Frontend framework |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | **Vite** | Build tool & dev server |
| ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | **Tailwind CSS + shadcn/ui** | Styling & components |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | **Supabase** | Auth, DB, Storage, Edge Functions |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | **Firebase** | Google OAuth |
| ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white) | **Redux Toolkit** | Global state management |
| ![OpenAI](https://img.shields.io/badge/OpenRouter_API-412991?style=flat-square&logo=openai&logoColor=white) | **OpenRouter + Gemini** | AI assistant & content |
| ![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=flat-square&logo=capacitor&logoColor=white) | **Capacitor** | iOS & Android native app |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | **Vercel** | Deployment & hosting |

</div>

---

## 🏗️ Project Structure

```
wisora/
├── src/
│   ├── components/
│   │   ├── auth/              # Auth screens & route guards
│   │   ├── courses/           # Course management UI
│   │   ├── chatbot/           # AI assistant sidebar
│   │   ├── experts/           # Expert booking modals
│   │   ├── groups/            # Group chat & sharing
│   │   ├── landing/           # Marketing & hero sections
│   │   └── layout/            # Navbar, sidebar, shell
│   ├── pages/
│   │   ├── personal/          # Student dashboard & flows
│   │   ├── institutional/     # Institution dashboard
│   │   ├── expert/            # Expert portal
│   │   └── admin/             # Admin panel
│   ├── contexts/              # Auth, Language, Tenant contexts
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/          # Firebase + Supabase clients
│   ├── store/                 # Redux slices & store
│   └── i18n/                  # Arabic + English translations
├── public/
│   └── assests/               # Logos, avatars, 3D shapes
├── vercel.json                # SPA rewrite rules
└── capacitor.config.ts        # Mobile app config
```

---

## 📥 Installation & Usage

### 🔧 Prerequisites

- Node.js 18+
- npm or bun
- Supabase project (free tier works)
- Firebase project with Google OAuth enabled

### 📦 Clone & Install

```bash
# Clone the repository
git clone https://github.com/VighneshBhati/Wisora.git

# Navigate to project directory
cd Wisora

# Install dependencies
npm install
```

### ⚙️ Environment Setup

```bash
# Create your env file
cp .env.example .env
```

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id

# AI Services
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_GEMINI_API_KEY=your_gemini_key
VITE_GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=

# Voice AI
VITE_VAPI_ACCOUNT_PUBLIC_KEY=your_vapi_key
VITE_VAPI_TUTOR_AGENT_ID=your_tutor_agent_id
VITE_VAPI_QUESTIONS_AGENT_ID=your_questions_agent_id
```

### 🚀 Run Locally

```bash
npm run dev
# App runs at http://localhost:5173
```

---

## 🌍 Deployment on Vercel

```bash
# vercel.json is already configured with SPA rewrites
# Connect your GitHub repo on vercel.com and deploy
```

**Before going live, make sure to:**

- ✅ Add your Vercel domain to **Firebase Console → Authentication → Authorized Domains**
- ✅ Add your domain to **Google Cloud Console → OAuth 2.0 → Authorized Origins**
- ✅ Set all `VITE_*` environment variables in **Vercel Dashboard → Settings → Environment Variables**
- ✅ Never push your `.env` file — add secrets directly in Vercel

---

## 📊 Results & Metrics

<div align="center">

| Metric | Value | Status |
|--------|-------|--------|
| 🎯 **Modes Supported** | 3 (Personal, Institutional, Expert) | ✅ Complete |
| 🌐 **Languages** | 2 (English + Arabic RTL) | ✅ Complete |
| 📱 **Platforms** | Web + iOS + Android | ✅ Complete |
| 🔐 **Auth Methods** | Google OAuth via Firebase | ✅ Live |
| 🤖 **AI Integrations** | OpenRouter + Gemini + Vapi | ✅ Live |
| 📦 **Components** | 100+ reusable UI components | ✅ Built |

</div>

---

## 🤝 Contributing

We welcome contributions. Please open an issue first to discuss major changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 The Team

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

---

## 📄 License

```
Private & Proprietary

Copyright (c) 2025 Wisora

All rights reserved. Unauthorized use, reproduction, or distribution
of this software or any portion of it is strictly prohibited without
the express written permission of the copyright holders.
```

---

## 🙏 Acknowledgments

- **Supabase** for the incredible open-source backend platform
- **Firebase** for seamless Google OAuth integration
- **shadcn/ui** for the beautiful component library
- **Vercel** for zero-config deployment
- **OpenRouter & Google Gemini** for powering the AI layer

---

<div align="center">

### 🌟 Star this repository if you find it helpful! 🌟

**Made with ❤️ for India's next generation of learners and professionals**

[⬆ Back to Top](#-wisora--indias-expert-guidance-platform)

</div>
