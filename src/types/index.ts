export type ServiceCategory =
  | 'it-infrastructure'
  | 'network-solutions'
  | 'devops-cloud'
  | 'cctv-security'
  | 'ai-automation'
  | 'web-solutions'
  | 'digital-content';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  categoryName: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  process: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
  isFeatured?: boolean;
  isPublished?: boolean;
  order?: number;
  image?: string;
}

export type ProductCategory = 'networking' | 'cctv' | 'computer' | 'office-it';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
export type ProductStatus = 'active' | 'hidden' | 'archived';

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  categoryId: ProductCategory;
  categoryName: string;
  brand: string;
  sku: string;
  price: number; // Stored as numeric value in BDT
  stockQuantity: number;
  stockStatus: StockStatus;
  status: ProductStatus;
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type CourseLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Beginner to Intermediate'
  | 'Intermediate to Advanced'
  | 'All Levels';
export type CourseMode = 'Online Live' | 'Hands-on Lab' | 'Self-Paced' | 'Hybrid';
export type CourseStatus = 'Free' | 'Paid' | 'Coming Soon';

export interface CourseCurriculumModule {
  moduleTitle: string;
  lessons: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  level: CourseLevel;
  duration: string;
  mode: CourseMode;
  price: number; // Stored as numeric value in BDT
  status: CourseStatus;
  thumbnail: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  curriculum: CourseCurriculumModule[];
  faq: { question: string; answer: string }[];
  instructorRole?: string;
  isPublished?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  implementation: string[];
  features: string[];
  result: string;
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  isPublished?: boolean;
  createdAt: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  featuredImage: string;
  readTime: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type RequestStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ServiceRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget?: string; // Optional budget formatted or custom
  customBudgetAmount?: number; // Optional numeric custom amount in BDT
  message: string;
  status: RequestStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface ProductRequest {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  phone: string;
  email: string;
  location: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

export interface CourseEnrollment {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseTitle: string;
  mode: string;
  message?: string;
  status: RequestStatus;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  secondaryTagline: string;
  logoText?: string;
  logoUrl?: string;
  faviconUrl?: string;
  heroHeading?: string;
  heroDescription?: string;
  heroPrimaryBtnText?: string;
  heroSecondaryBtnText?: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  footerText: string;
  copyrightText?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  maintenanceMode: boolean;
  currency: string; // 'BDT'
  currencySymbol: string; // '৳'
  // About Page Content
  aboutTitle?: string;
  aboutStory?: string;
  aboutVision?: string;
  aboutMission?: string;
  // SEO Metadata
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Homepage section visibility
  showWhatWeDoSection?: boolean;
  showDevOpsSection?: boolean;
  showProductsSection?: boolean;
  showAcademySection?: boolean;
  showProjectsSection?: boolean;
  showBlogSection?: boolean;
  showWhyUsSection?: boolean;
  showCtaSection?: boolean;
  // Homepage section order
  homepageSectionOrder?: string[];
  // Design Theme Settings
  primaryBrandColor?: string;
  secondaryBrandColor?: string;
  accentColor?: string;
  // Global ads toggle
  adsGloballyEnabled?: boolean;
  heroTagline?: string;
  heroTrustBadges?: string[];
  primaryColor?: string;
  enableAIChat?: boolean;
  currencyCode?: string;
  [key: string]: any;
}

// --- Admin RBAC & Permissions ---
export type AdminRole =
  | 'Super Admin'
  | 'Content Manager'
  | 'Product Manager'
  | 'Support Agent'
  | 'Course Manager'
  | 'Advertising Manager'
  | 'Custom';

export interface AdminPermissionSet {
  canManageProducts: boolean;
  canManageServices: boolean;
  canManageCourses: boolean;
  canManageProjects: boolean;
  canManageBlog: boolean;
  canManageRequests: boolean;
  canManageCustomers: boolean;
  canManageAdvertisements: boolean;
  canManageSettings: boolean;
  canManageUsers: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  isOwner?: boolean;
  permissions: AdminPermissionSet;
  lastLogin?: string;
  createdAt: string;
}

// --- Advertisements ---
export type AdPlacement =
  | 'homepage_bottom'
  | 'footer_banner'
  | 'blog_bottom'
  | 'products_banner'
  | 'sidebar_banner';

export interface Advertisement {
  id: string;
  advertiserName: string;
  campaignName: string;
  title: string;
  bannerUrl: string;
  destinationUrl: string;
  placement: AdPlacement;
  status: 'active' | 'paused' | 'archived';
  startDate: string;
  endDate: string;
  agreedFeeBDT?: number;
  contactInfo?: string;
  impressions: number;
  clicks: number;
  showOnDesktop: boolean;
  showOnMobile: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdNetworkConfig {
  enabled: boolean;
  publisherId: string;
  autoAdsEnabled: boolean;
  privacyConsentRequired: boolean;
}

// --- Configurable Budget Options ---
export interface BudgetOption {
  id: string;
  label: string;
  value: string;
  isCustom?: boolean;
  isEnabled: boolean;
  order: number;
}
