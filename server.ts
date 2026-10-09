import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = path.resolve(__dirname, 'database', 'content.json');
const INITIAL_DATA_FILE = path.resolve(__dirname, 'src', 'data', 'initialData.ts');

const DEFAULT_SETTINGS = {
  siteName: 'Techlink Assist',
  tagline: 'Smart Technology Solutions for Businesses & Professionals',
  secondaryTagline: 'IT • Networking • DevOps • Cloud • Security • AI Automation',
  logoText: 'T',
  logoUrl: '',
  faviconUrl: '',
  heroHeading: 'Smart Technology Solutions for Businesses & Professionals',
  heroDescription:
    'Reliable IT infrastructure, networking, DevOps, cloud, security, AI automation and digital solutions designed to help businesses work smarter and grow faster.',
  heroPrimaryBtnText: 'Get IT Service',
  heroSecondaryBtnText: 'Explore Solutions',
  phone: '+880 1712-345678',
  email: 'contact@techlinkassist.com',
  address: 'Level 8, Techlink Tower, Panthapath, Dhaka 1205, Bangladesh',
  businessHours: 'Saturday – Thursday: 9:00 AM – 7:00 PM BST (24/7 On-call Support for SLA Clients)',
  footerText:
    'Techlink Assist delivers dependable enterprise IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, and security systems.',
  copyrightText: '© 2026 Techlink Assist. All rights reserved. Registered Technology Enterprise in Bangladesh.',
  facebookUrl: 'https://facebook.com/techlinkassist',
  linkedinUrl: 'https://linkedin.com/company/techlinkassist',
  youtubeUrl: 'https://youtube.com/@techlinkassist',
  githubUrl: 'https://github.com/techlinkassist',
  twitterUrl: 'https://twitter.com/techlinkassist',
  maintenanceMode: false,
  currency: 'BDT',
  currencySymbol: '৳',
  aboutTitle: 'About Techlink Assist',
  aboutStory:
    'Techlink Assist is an integrated technology solutions provider. Unlike typical computer repair shops, Techlink Assist functions as a full-spectrum systems engineering partner. Our operational coverage spans corporate IT infrastructure, multi-gigabit routing with MikroTik RouterOS, automated CI/CD cloud pipelines, high-definition IP camera surveillance, and practical training through Techlink Assist Academy.',
  aboutVision:
    'To provide practical, reliable and innovative technology solutions for businesses and professionals—enabling organizations to operate without unexpected downtime and empowering engineers with hands-on technical skills.',
  aboutMission:
    'To bridge the gap between high-level IT architecture and daily business operations. We prioritize measurable reliability, clear documentation, client ownership of all digital assets, and zero dependency on opaque black-box vendor lock-in.',
  seoTitle: 'Techlink Assist | Smart Technology Solutions for Businesses & Professionals',
  seoDescription:
    'Reliable IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, CCTV surveillance, and technology training academy in Bangladesh.',
  seoKeywords: 'IT Support, MikroTik RouterOS, DevOps, Cloud, CCTV, Techlink Assist, Dhaka Bangladesh, Networking, BDT',
  showWhatWeDoSection: true,
  showDevOpsSection: true,
  showProductsSection: true,
  showAcademySection: true,
  showProjectsSection: true,
  showBlogSection: true,
  heroTagline: 'ENTERPRISE SYSTEMS & DIGITAL ENGINEERING',
  heroTrustBadges: [
    '24/7 Monitored SLAs',
    'MikroTik Certified Engineers',
    '100% Hardware Ownership',
    'Zero Vendor Lock-in',
  ],
  primaryColor: '#2563eb',
  accentColor: '#38bdf8',
  enableAIChat: true,
  currencyCode: 'BDT',
};

// Helper to serialize app data to valid TypeScript code for src/data/initialData.ts
function serializeToTypeScript(data: any): string {
  return `import {
  ServiceItem,
  ProductItem,
  CourseItem,
  ProjectItem,
  BlogPostItem,
  SiteSettings,
  ServiceRequest,
  ProductRequest,
  CourseEnrollment,
  AdminUser,
  Advertisement,
  AdNetworkConfig,
  BudgetOption,
} from '../types';

export const initialSettings: SiteSettings = ${JSON.stringify(data.settings, null, 2)};

export const initialBudgetOptions: BudgetOption[] = ${JSON.stringify(data.budgetOptions, null, 2)};

export const initialAdminUsers: AdminUser[] = ${JSON.stringify(data.adminUsers, null, 2)};

export const initialAdvertisements: Advertisement[] = ${JSON.stringify(data.advertisements, null, 2)};

export const initialAdNetworkConfig: AdNetworkConfig = ${JSON.stringify(data.adNetwork, null, 2)};

export const initialServices: ServiceItem[] = ${JSON.stringify(data.services, null, 2)};

export const initialProducts: ProductItem[] = ${JSON.stringify(data.products, null, 2)};

export const initialCourses: CourseItem[] = ${JSON.stringify(data.courses, null, 2)};

export const initialProjects: ProjectItem[] = ${JSON.stringify(data.projects, null, 2)};

export const initialBlogPosts: BlogPostItem[] = ${JSON.stringify(data.blog, null, 2)};

export const initialServiceRequests: ServiceRequest[] = ${JSON.stringify(data.serviceRequests, null, 2)};

export const initialProductRequests: ProductRequest[] = ${JSON.stringify(data.productRequests, null, 2)};

export const initialCourseEnrollments: CourseEnrollment[] = ${JSON.stringify(data.enrollments, null, 2)};
`;
}

// Ensure database directory exists
function ensureDbDir() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function startServer() {
  const app = express();

  // Middleware for parsing large JSON payloads (images, text)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // CORS headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Techlink Assist API',
      timestamp: new Date().toISOString(),
      sourceSyncEnabled: true,
    });
  });

  // GET /api/data - Retrieve current persisted data
  app.get('/api/data', async (req: Request, res: Response) => {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return res.json({
          success: true,
          source: 'database_file',
          data: JSON.parse(fileContent),
        });
      }

      // If database/content.json doesn't exist yet, import default from initialData.ts
      const initialModule = await import('./src/data/initialData.ts');
      const defaultData = {
        settings: initialModule.initialSettings,
        budgetOptions: initialModule.initialBudgetOptions,
        adminUsers: initialModule.initialAdminUsers,
        advertisements: initialModule.initialAdvertisements,
        adNetwork: initialModule.initialAdNetworkConfig,
        services: initialModule.initialServices,
        products: initialModule.initialProducts,
        courses: initialModule.initialCourses,
        projects: initialModule.initialProjects,
        blog: initialModule.initialBlogPosts,
        serviceRequests: initialModule.initialServiceRequests,
        productRequests: initialModule.initialProductRequests,
        enrollments: initialModule.initialCourseEnrollments,
      };

      ensureDbDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');

      return res.json({
        success: true,
        source: 'initial_data',
        data: defaultData,
      });
    } catch (err: any) {
      console.error('Error fetching /api/data:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST /api/data - Update data and immediately rewrite src/data/initialData.ts
  app.post('/api/data', (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid payload' });
      }

      // Read existing data if available to merge
      let currentData: any = {};
      if (fs.existsSync(DB_FILE)) {
        try {
          currentData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        } catch {
          currentData = {};
        }
      }

      const mergedData = {
        settings: { ...DEFAULT_SETTINGS, ...(currentData.settings || {}), ...(payload.settings || {}) },
        budgetOptions: payload.budgetOptions ?? currentData.budgetOptions ?? [],
        adminUsers: payload.adminUsers ?? currentData.adminUsers ?? [],
        advertisements: payload.advertisements ?? currentData.advertisements ?? [],
        adNetwork: { ...(currentData.adNetwork || {}), ...(payload.adNetwork || {}) },
        services: payload.services ?? currentData.services ?? [],
        products: payload.products ?? currentData.products ?? [],
        courses: payload.courses ?? currentData.courses ?? [],
        projects: payload.projects ?? currentData.projects ?? [],
        blog: payload.blog ?? currentData.blog ?? [],
        serviceRequests: payload.serviceRequests ?? currentData.serviceRequests ?? [],
        productRequests: payload.productRequests ?? currentData.productRequests ?? [],
        enrollments: payload.enrollments ?? currentData.enrollments ?? [],
      };

      // 1. Save to persistent JSON store
      ensureDbDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(mergedData, null, 2), 'utf-8');

      // 2. Immediately rewrite src/data/initialData.ts on disk so source code updates live!
      let sourceUpdated = false;
      try {
        const tsCode = serializeToTypeScript(mergedData);
        fs.writeFileSync(INITIAL_DATA_FILE, tsCode, 'utf-8');
        sourceUpdated = true;
      } catch (sourceErr) {
        console.warn('Could not rewrite src/data/initialData.ts directly:', sourceErr);
      }

      return res.json({
        success: true,
        message: 'Admin changes successfully saved to database & source code updated!',
        sourceUpdated,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Error saving /api/data:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET /api/data/source-code - Download or view the generated initialData.ts
  app.get('/api/data/source-code', (req: Request, res: Response) => {
    try {
      if (fs.existsSync(INITIAL_DATA_FILE)) {
        const code = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
        res.setHeader('Content-Type', 'text/plain');
        return res.send(code);
      }
      res.status(404).send('initialData.ts not found');
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  });

  // Serve static assets from public
  app.use(express.static(path.resolve(__dirname, 'public')));

  // In development, hook Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder if built
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      // Fallback to Vite dev mode if dist does not exist
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Techlink Assist Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
