# TECHLINK ASSIST

**Smart Technology Solutions for Businesses & Professionals**  
*IT • Networking • DevOps • Cloud • Security • AI Automation*

---

## 1. Project Overview & Architecture

Techlink Assist is an enterprise-grade technology platform built with React, TypeScript, Tailwind CSS, and PostgreSQL / Supabase architecture. It delivers a full-spectrum digital presence and management engine for IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, CCTV surveillance, certified hardware sales, and Techlink Assist Academy.

### Key Capabilities

* **Public Web Platform**: High-conversion responsive interface featuring Services, Products, Courses, Projects, Blog, About Us, and Contact.
* **Unified Admin Console (`/admin`)**: Single command center managing service requests, product quotes, academy enrollments, product catalogs, courses, articles, customer directory, and system settings.
* **Reactive Database Layer (`src/services/db.ts`)**: Built-in reactive store with localStorage persistence out-of-the-box, plus full migration schemas for PostgreSQL / Supabase.
* **Zero-Lockin Guarantee**: 100% owner control. The source code, domain, database, storage, credentials, and deployment are exportable and maintainable independently in VS Code.

---

## 2. Technology Stack

* **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide Icons
* **Database**: PostgreSQL / Supabase (Schema provided in `database/schema/schema.sql`)
* **State & Persistence**: Event-driven reactive store with immediate sync and JSON export
* **AI & Automation Integration**: Pre-wired smart triage assistant with modular hooks for Gemini / OpenAI

---

## 3. Directory Structure

```text
techlink-assist/
├── database/
│   ├── schema/
│   │   └── schema.sql        # Master PostgreSQL / Supabase schema with RLS & indexes
│   └── seed/
│       └── seed.sql          # Initial production seed data
├── src/
│   ├── assets/
│   │   └── images/           # High-resolution generated visual assets
│   ├── components/
│   │   ├── admin/            # Central Admin Panel, CRUD, and metrics
│   │   ├── ai/               # Techlink Smart Assistant drawer
│   │   ├── common/           # Navbar, Footer, Maintenance, 404
│   │   ├── home/             # Hero, What We Do, DevOps & Cloud spotlight
│   │   ├── services/         # Services catalog & detailed blueprint views
│   │   ├── products/         # Mini e-commerce catalog & quote triggers
│   │   ├── courses/          # Techlink Academy courses & curricula
│   │   ├── projects/         # Portfolio case studies with verified outcomes
│   │   ├── blog/             # Technical knowledge hub & articles
│   │   ├── about/            # Company profile & verified tech stack
│   │   ├── contact/          # Inbound inquiry form & office details
│   │   └── modals/           # Service, Product Quote, and Course Enroll modals
│   ├── data/
│   │   └── initialData.ts    # Authentic domain seed data
│   ├── services/
│   │   ├── db.ts             # Reactive local store with export & event bus
│   │   └── supabaseClient.ts # Supabase integration bridge
│   ├── types/
│   │   └── index.ts          # Complete TypeScript domain contracts
│   ├── App.tsx               # Main routing & application state coordinator
│   ├── index.css             # Tailwind CSS theme & fonts
│   └── main.tsx              # React DOM entry point
├── .env.example              # Environment variables template
├── package.json              # Dependencies and build scripts
└── README.md                 # Owner documentation
```

---

## 4. Local Development Quickstart

### Prerequisites
* Node.js 18+ or 20+
* npm or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/techlink-assist.git
cd techlink-assist

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start local development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 5. Connecting Supabase / PostgreSQL

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `database/schema/schema.sql` and run it.
4. (Optional) Run `database/seed/seed.sql` to populate initial services.
5. In your `.env` file, configure:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-public-key"
   ```
6. The app will automatically connect and sync with your live database.

---

## 6. Accessing the Central Admin Panel

1. Navigate to `/admin` in your browser (or click **Admin Portal** in the website footer).
2. Enter your administrator credentials.
3. Manage all service leads, quote inquiries, courses, products, and site settings in one dashboard.
4. To enable Maintenance Mode, toggle the setting under **Settings**.

---

## 7. Production Build & Deployment

```bash
# Build optimized static distribution
npm run build

# Preview build locally
npm run preview
```

Deployable to Vercel, Netlify, Cloudflare Pages, AWS Amplify, or any Docker/Node server.
