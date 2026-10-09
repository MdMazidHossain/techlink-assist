import {
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
  AdPlacement,
} from '../types';

import {
  initialSettings,
  initialServices,
  initialProducts,
  initialCourses,
  initialProjects,
  initialBlogPosts,
  initialServiceRequests,
  initialProductRequests,
  initialCourseEnrollments,
  initialBudgetOptions,
  initialAdminUsers,
  initialAdvertisements,
  initialAdNetworkConfig,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'techlink_settings_v2',
  SERVICES: 'techlink_services_v2',
  PRODUCTS: 'techlink_products_v2',
  COURSES: 'techlink_courses_v2',
  PROJECTS: 'techlink_projects_v2',
  BLOG: 'techlink_blog_v2',
  SERVICE_REQUESTS: 'techlink_service_requests_v2',
  PRODUCT_REQUESTS: 'techlink_product_requests_v2',
  ENROLLMENTS: 'techlink_enrollments_v2',
  ADMIN_USERS: 'techlink_admin_users_v2',
  ADMIN_ACTIVE_SESSION: 'techlink_admin_session_v2',
  ADVERTISEMENTS: 'techlink_ads_v2',
  AD_NETWORK: 'techlink_ad_network_v2',
  BUDGET_OPTIONS: 'techlink_budget_options_v2',
  // Legacy keys for migration
  LEGACY_SETTINGS: 'techlink_settings_v1',
  LEGACY_SERVICE_REQUESTS: 'techlink_service_requests_v1',
  LEGACY_PRODUCT_REQUESTS: 'techlink_product_requests_v1',
  LEGACY_ENROLLMENTS: 'techlink_enrollments_v1',
};

type Listener = () => void;

class DatabaseStore {
  private listeners: Set<Listener> = new Set();
  private isSyncingToServer: boolean = false;
  private lastServerSync: Date | null = null;
  private serverSyncError: string | null = null;
  private syncDebounceTimer: any = null;

  constructor() {
    this.ensureInitialized();
    this.loadInitialDataFromServer();
  }

  public async loadInitialDataFromServer(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      const res = await fetch('/api/data');
      if (!res.ok) return false;
      const json = await res.json();
      if (json && json.success && json.data) {
        const d = json.data;
        if (d.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(d.settings));
        if (d.budgetOptions) localStorage.setItem(STORAGE_KEYS.BUDGET_OPTIONS, JSON.stringify(d.budgetOptions));
        if (d.adminUsers) localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(d.adminUsers));
        if (d.advertisements) localStorage.setItem(STORAGE_KEYS.ADVERTISEMENTS, JSON.stringify(d.advertisements));
        if (d.adNetwork) localStorage.setItem(STORAGE_KEYS.AD_NETWORK, JSON.stringify(d.adNetwork));
        if (d.services) localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(d.services));
        if (d.products) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(d.products));
        if (d.courses) localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(d.courses));
        if (d.projects) localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(d.projects));
        if (d.blog) localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(d.blog));
        if (d.serviceRequests) localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, JSON.stringify(d.serviceRequests));
        if (d.productRequests) localStorage.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, JSON.stringify(d.productRequests));
        if (d.enrollments) localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(d.enrollments));

        this.lastServerSync = new Date();
        this.serverSyncError = null;
        this.notify();
        return true;
      }
    } catch {
      // In static deployment or offline, keep local state
    }
    return false;
  }

  private scheduleServerSync() {
    if (typeof window === 'undefined') return;
    if (this.syncDebounceTimer) {
      clearTimeout(this.syncDebounceTimer);
    }
    this.syncDebounceTimer = setTimeout(() => {
      this.syncToServer();
    }, 400);
  }

  public async syncToServer(): Promise<{ success: boolean; error?: string }> {
    if (typeof window === 'undefined') return { success: false };
    this.isSyncingToServer = true;
    this.serverSyncError = null;
    this.notify();

    try {
      const payload = {
        settings: this.getSettings(),
        budgetOptions: this.getBudgetOptions(),
        adminUsers: this.getAdminUsers(),
        advertisements: this.getAdvertisements(true),
        adNetwork: this.getAdNetworkConfig(),
        services: this.getServices(true),
        products: this.getProducts(true),
        courses: this.getCourses(true),
        projects: this.getProjects(true),
        blog: this.getBlogPosts(true),
        serviceRequests: this.getServiceRequests(),
        productRequests: this.getProductRequests(),
        enrollments: this.getCourseEnrollments(),
      };

      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || 'Server sync failed');
      }

      this.lastServerSync = new Date();
      this.isSyncingToServer = false;
      this.serverSyncError = null;
      this.notify();
      return { success: true };
    } catch (e: any) {
      this.isSyncingToServer = false;
      this.serverSyncError = e.message;
      this.notify();
      return { success: false, error: e.message };
    }
  }

  public getServerSyncInfo() {
    return {
      isSyncing: this.isSyncingToServer,
      lastSync: this.lastServerSync,
      error: this.serverSyncError,
    };
  }

  public generateInitialDataCode(): string {
    const data = {
      settings: this.getSettings(),
      budgetOptions: this.getBudgetOptions(),
      adminUsers: this.getAdminUsers(),
      advertisements: this.getAdvertisements(true),
      adNetwork: this.getAdNetworkConfig(),
      services: this.getServices(true),
      products: this.getProducts(true),
      courses: this.getCourses(true),
      projects: this.getProjects(true),
      blog: this.getBlogPosts(true),
      serviceRequests: this.getServiceRequests(),
      productRequests: this.getProductRequests(),
      enrollments: this.getCourseEnrollments(),
    };

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

  private ensureInitialized() {
    if (typeof window === 'undefined') return;

    // Safe Data Migration from v1 if present
    const legacyRequests = localStorage.getItem(STORAGE_KEYS.LEGACY_SERVICE_REQUESTS);
    if (legacyRequests && !localStorage.getItem(STORAGE_KEYS.SERVICE_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, legacyRequests);
    }
    const legacyProductReqs = localStorage.getItem(STORAGE_KEYS.LEGACY_PRODUCT_REQUESTS);
    if (legacyProductReqs && !localStorage.getItem(STORAGE_KEYS.PRODUCT_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, legacyProductReqs);
    }
    const legacyEnrollments = localStorage.getItem(STORAGE_KEYS.LEGACY_ENROLLMENTS);
    if (legacyEnrollments && !localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, legacyEnrollments);
    }

    // Migrate any cached localStorage paths from /src/assets/images/ to /images/
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        const raw = localStorage.getItem(key);
        if (raw && raw.includes('/src/assets/images/')) {
          localStorage.setItem(key, raw.split('/src/assets/images/').join('/images/'));
        }
      });
    } catch {
      // ignore
    }

    // Initialize v2 tables
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
    } else {
      // Ensure BDT currency is enforced on existing settings
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
        if (existing.currency !== 'BDT' || !existing.currencySymbol) {
          existing.currency = 'BDT';
          existing.currencySymbol = '৳';
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(existing));
        }
      } catch {
        // fallback
      }
    }

    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(initialCourses));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BLOG)) {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(initialBlogPosts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICE_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, JSON.stringify(initialServiceRequests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCT_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, JSON.stringify(initialProductRequests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(initialCourseEnrollments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BUDGET_OPTIONS)) {
      localStorage.setItem(STORAGE_KEYS.BUDGET_OPTIONS, JSON.stringify(initialBudgetOptions));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(initialAdminUsers));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADVERTISEMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ADVERTISEMENTS, JSON.stringify(initialAdvertisements));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AD_NETWORK)) {
      localStorage.setItem(STORAGE_KEYS.AD_NETWORK, JSON.stringify(initialAdNetworkConfig));
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
      // Sync persistent content to server & source code (ignore session token)
      if (key !== STORAGE_KEYS.ADMIN_ACTIVE_SESSION) {
        this.scheduleServerSync();
      }
    } catch (e) {
      console.error('Failed to write to localStorage', e);
    }
  }

  // --- Settings ---
  public getSettings(): SiteSettings {
    const s = this.getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
    // Ensure BDT
    if (!s.currencySymbol || s.currency !== 'BDT') {
      s.currency = 'BDT';
      s.currencySymbol = '৳';
    }
    return s;
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates, currency: 'BDT', currencySymbol: '৳' };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // --- Budget Options ---
  public getBudgetOptions(): BudgetOption[] {
    return this.getItem<BudgetOption[]>(STORAGE_KEYS.BUDGET_OPTIONS, initialBudgetOptions);
  }

  public updateBudgetOption(id: string, updates: Partial<BudgetOption>): void {
    const list = this.getBudgetOptions().map((b) => (b.id === id ? { ...b, ...updates } : b));
    this.setItem(STORAGE_KEYS.BUDGET_OPTIONS, list);
  }

  public addBudgetOption(opt: Omit<BudgetOption, 'id'>): BudgetOption {
    const newOpt: BudgetOption = {
      ...opt,
      id: `b-${Date.now()}`,
    };
    const list = [...this.getBudgetOptions(), newOpt];
    this.setItem(STORAGE_KEYS.BUDGET_OPTIONS, list);
    return newOpt;
  }

  public deleteBudgetOption(id: string): void {
    const list = this.getBudgetOptions().filter((b) => b.id !== id);
    this.setItem(STORAGE_KEYS.BUDGET_OPTIONS, list);
  }

  public reorderBudgetOption(id: string, direction: 'up' | 'down'): void {
    const list = [...this.getBudgetOptions()];
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    list.forEach((item, idx) => {
      item.order = idx + 1;
    });
    this.setItem(STORAGE_KEYS.BUDGET_OPTIONS, list);
  }

  // --- Services ---
  public getServices(includeUnpublished = false): ServiceItem[] {
    const list = this.getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    if (includeUnpublished) return list;
    return list.filter((s) => s.isPublished !== false);
  }

  public getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.getServices(true).find((s) => s.slug === slug || s.id === slug);
  }

  public updateService(id: string, updates: Partial<ServiceItem>): void {
    const list = this.getServices(true).map((s) => (s.id === id ? { ...s, ...updates } : s));
    this.setItem(STORAGE_KEYS.SERVICES, list);
  }

  public addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
      isPublished: service.isPublished !== undefined ? service.isPublished : true,
    };
    const list = [newService, ...this.getServices(true)];
    this.setItem(STORAGE_KEYS.SERVICES, list);
    return newService;
  }

  public deleteService(id: string): void {
    const list = this.getServices(true).filter((s) => s.id !== id);
    this.setItem(STORAGE_KEYS.SERVICES, list);
  }

  public reorderService(id: string, direction: 'up' | 'down'): void {
    const list = [...this.getServices(true)];
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    this.setItem(STORAGE_KEYS.SERVICES, list);
  }

  // --- Products ---
  public getProducts(includeHidden = false): ProductItem[] {
    const list = this.getItem<ProductItem[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    if (includeHidden) return list;
    return list.filter((p) => p.status === 'active');
  }

  public getProductBySlug(slug: string): ProductItem | undefined {
    return this.getItem<ProductItem[]>(STORAGE_KEYS.PRODUCTS, initialProducts).find(
      (p) => p.slug === slug || p.id === slug
    );
  }

  public addProduct(product: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>): ProductItem {
    const now = new Date().toISOString();
    const newProduct: ProductItem = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    const list = [newProduct, ...this.getProducts(true)];
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<ProductItem>): void {
    const list = this.getProducts(true).map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
  }

  public deleteProduct(id: string): void {
    const list = this.getProducts(true).filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
  }

  // --- Courses ---
  public getCourses(includeUnpublished = false): CourseItem[] {
    const list = this.getItem<CourseItem[]>(STORAGE_KEYS.COURSES, initialCourses);
    if (includeUnpublished) return list;
    return list.filter((c) => c.isPublished !== false);
  }

  public getCourseBySlug(slug: string): CourseItem | undefined {
    return this.getCourses(true).find((c) => c.slug === slug || c.id === slug);
  }

  public addCourse(course: Omit<CourseItem, 'id' | 'createdAt' | 'updatedAt'>): CourseItem {
    const now = new Date().toISOString();
    const newCourse: CourseItem = {
      ...course,
      id: `crs-${Date.now()}`,
      isPublished: course.isPublished !== undefined ? course.isPublished : true,
      createdAt: now,
      updatedAt: now,
    };
    const list = [newCourse, ...this.getCourses(true)];
    this.setItem(STORAGE_KEYS.COURSES, list);
    return newCourse;
  }

  public updateCourse(id: string, updates: Partial<CourseItem>): void {
    const list = this.getCourses(true).map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    );
    this.setItem(STORAGE_KEYS.COURSES, list);
  }

  public deleteCourse(id: string): void {
    const list = this.getCourses(true).filter((c) => c.id !== id);
    this.setItem(STORAGE_KEYS.COURSES, list);
  }

  public reorderCourse(id: string, direction: 'up' | 'down'): void {
    const list = [...this.getCourses(true)];
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    this.setItem(STORAGE_KEYS.COURSES, list);
  }

  // --- Projects ---
  public getProjects(includeUnpublished = false): ProjectItem[] {
    const list = this.getItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    if (includeUnpublished) return list;
    return list.filter((p) => p.isPublished !== false);
  }

  public getProjectBySlug(slug: string): ProjectItem | undefined {
    return this.getProjects(true).find((p) => p.slug === slug || p.id === slug);
  }

  public addProject(project: Omit<ProjectItem, 'id' | 'createdAt'>): ProjectItem {
    const newProject: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
      isPublished: project.isPublished !== undefined ? project.isPublished : true,
      createdAt: new Date().toISOString(),
    };
    const list = [newProject, ...this.getProjects(true)];
    this.setItem(STORAGE_KEYS.PROJECTS, list);
    return newProject;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): void {
    const list = this.getProjects(true).map((p) => (p.id === id ? { ...p, ...updates } : p));
    this.setItem(STORAGE_KEYS.PROJECTS, list);
  }

  public deleteProject(id: string): void {
    const list = this.getProjects(true).filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PROJECTS, list);
  }

  public reorderProject(id: string, direction: 'up' | 'down'): void {
    const list = [...this.getProjects(true)];
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    this.setItem(STORAGE_KEYS.PROJECTS, list);
  }

  // --- Blog ---
  public getBlogPosts(includeDrafts = false): BlogPostItem[] {
    const list = this.getItem<BlogPostItem[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
    if (includeDrafts) return list;
    return list.filter((p) => p.status === 'published');
  }

  public getBlogPostBySlug(slug: string): BlogPostItem | undefined {
    return this.getBlogPosts(true).find((p) => p.slug === slug || p.id === slug);
  }

  public addBlogPost(post: Omit<BlogPostItem, 'id' | 'createdAt' | 'updatedAt'>): BlogPostItem {
    const now = new Date().toISOString();
    const newPost: BlogPostItem = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    const list = [newPost, ...this.getBlogPosts(true)];
    this.setItem(STORAGE_KEYS.BLOG, list);
    return newPost;
  }

  public updateBlogPost(id: string, updates: Partial<BlogPostItem>): void {
    const list = this.getBlogPosts(true).map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    this.setItem(STORAGE_KEYS.BLOG, list);
  }

  public deleteBlogPost(id: string): void {
    const list = this.getBlogPosts(true).filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.BLOG, list);
  }

  // --- Service Requests ---
  public getServiceRequests(): ServiceRequest[] {
    return this.getItem<ServiceRequest[]>(STORAGE_KEYS.SERVICE_REQUESTS, initialServiceRequests);
  }

  public createServiceRequest(
    data: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>
  ): ServiceRequest {
    const newReq: ServiceRequest = {
      ...data,
      budget: data.budget?.trim() || 'No Budget Specified',
      id: `req-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const list = [newReq, ...this.getServiceRequests()];
    this.setItem(STORAGE_KEYS.SERVICE_REQUESTS, list);
    return newReq;
  }

  public updateServiceRequest(
    id: string,
    updates: Partial<ServiceRequest>
  ): void {
    const list = this.getServiceRequests().map((r) =>
      r.id === id ? { ...r, ...updates } : r
    );
    this.setItem(STORAGE_KEYS.SERVICE_REQUESTS, list);
  }

  public updateServiceRequestStatus(
    id: string,
    status: ServiceRequest['status'],
    internalNotes?: string
  ): void {
    this.updateServiceRequest(id, {
      status,
      ...(internalNotes !== undefined ? { internalNotes } : {}),
    });
  }

  public deleteServiceRequest(id: string): void {
    const list = this.getServiceRequests().filter((r) => r.id !== id);
    this.setItem(STORAGE_KEYS.SERVICE_REQUESTS, list);
  }

  // --- Product Requests ---
  public getProductRequests(): ProductRequest[] {
    return this.getItem<ProductRequest[]>(STORAGE_KEYS.PRODUCT_REQUESTS, initialProductRequests);
  }

  public createProductRequest(
    data: Omit<ProductRequest, 'id' | 'createdAt' | 'status'>
  ): ProductRequest {
    const newReq: ProductRequest = {
      ...data,
      id: `preq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const list = [newReq, ...this.getProductRequests()];
    this.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, list);
    return newReq;
  }

  public updateProductRequestStatus(id: string, status: ProductRequest['status']): void {
    const list = this.getProductRequests().map((r) => (r.id === id ? { ...r, status } : r));
    this.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, list);
  }

  public deleteProductRequest(id: string): void {
    const list = this.getProductRequests().filter((r) => r.id !== id);
    this.setItem(STORAGE_KEYS.PRODUCT_REQUESTS, list);
  }

  // --- Course Enrollments ---
  public getCourseEnrollments(): CourseEnrollment[] {
    return this.getItem<CourseEnrollment[]>(STORAGE_KEYS.ENROLLMENTS, initialCourseEnrollments);
  }

  public createCourseEnrollment(
    data: Omit<CourseEnrollment, 'id' | 'createdAt' | 'status'>
  ): CourseEnrollment {
    const newEnr: CourseEnrollment = {
      ...data,
      id: `enr-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const list = [newEnr, ...this.getCourseEnrollments()];
    this.setItem(STORAGE_KEYS.ENROLLMENTS, list);
    return newEnr;
  }

  public updateCourseEnrollmentStatus(id: string, status: CourseEnrollment['status']): void {
    const list = this.getCourseEnrollments().map((e) => (e.id === id ? { ...e, status } : e));
    this.setItem(STORAGE_KEYS.ENROLLMENTS, list);
  }

  public deleteCourseEnrollment(id: string): void {
    const list = this.getCourseEnrollments().filter((e) => e.id !== id);
    this.setItem(STORAGE_KEYS.ENROLLMENTS, list);
  }

  // --- Advertisements ---
  public getAdvertisements(includeArchived = false): Advertisement[] {
    const list = this.getItem<Advertisement[]>(STORAGE_KEYS.ADVERTISEMENTS, initialAdvertisements);
    if (includeArchived) return list;
    return list.filter((ad) => ad.status !== 'archived');
  }

  public getActiveAdsByPlacement(placement: AdPlacement, isMobile = false): Advertisement[] {
    const settings = this.getSettings();
    if (settings.adsGloballyEnabled === false) return [];

    const now = new Date().toISOString().split('T')[0];
    return this.getAdvertisements()
      .filter((ad) => {
        if (ad.status !== 'active') return false;
        if (ad.placement !== placement) return false;
        if (isMobile && !ad.showOnMobile) return false;
        if (!isMobile && !ad.showOnDesktop) return false;
        if (ad.startDate && ad.startDate > now) return false;
        if (ad.endDate && ad.endDate < now) return false;
        return true;
      })
      .sort((a, b) => b.priority - a.priority);
  }

  public addAdvertisement(
    ad: Omit<Advertisement, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'clicks'>
  ): Advertisement {
    const now = new Date().toISOString();
    const newAd: Advertisement = {
      ...ad,
      id: `ad-${Date.now()}`,
      impressions: 0,
      clicks: 0,
      createdAt: now,
      updatedAt: now,
    };
    const list = [newAd, ...this.getAdvertisements(true)];
    this.setItem(STORAGE_KEYS.ADVERTISEMENTS, list);
    return newAd;
  }

  public updateAdvertisement(id: string, updates: Partial<Advertisement>): void {
    const list = this.getAdvertisements(true).map((ad) =>
      ad.id === id ? { ...ad, ...updates, updatedAt: new Date().toISOString() } : ad
    );
    this.setItem(STORAGE_KEYS.ADVERTISEMENTS, list);
  }

  public deleteAdvertisement(id: string): void {
    const list = this.getAdvertisements(true).filter((ad) => ad.id !== id);
    this.setItem(STORAGE_KEYS.ADVERTISEMENTS, list);
  }

  public recordAdImpression(id: string): void {
    const list = this.getAdvertisements(true).map((ad) =>
      ad.id === id ? { ...ad, impressions: (ad.impressions || 0) + 1 } : ad
    );
    this.setItem(STORAGE_KEYS.ADVERTISEMENTS, list);
  }

  public recordAdClick(id: string): void {
    const list = this.getAdvertisements(true).map((ad) =>
      ad.id === id ? { ...ad, clicks: (ad.clicks || 0) + 1 } : ad
    );
    this.setItem(STORAGE_KEYS.ADVERTISEMENTS, list);
  }

  public getAdNetworkConfig(): AdNetworkConfig {
    return this.getItem<AdNetworkConfig>(STORAGE_KEYS.AD_NETWORK, initialAdNetworkConfig);
  }

  public updateAdNetworkConfig(updates: Partial<AdNetworkConfig>): void {
    const current = this.getAdNetworkConfig();
    this.setItem(STORAGE_KEYS.AD_NETWORK, { ...current, ...updates });
  }

  // --- Admin Users & RBAC ---
  public getAdminUsers(): AdminUser[] {
    return this.getItem<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, initialAdminUsers);
  }

  public getAdminUserById(id: string): AdminUser | undefined {
    return this.getAdminUsers().find((u) => u.id === id);
  }

  public addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
    const newUser: AdminUser = {
      ...user,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const list = [...this.getAdminUsers(), newUser];
    this.setItem(STORAGE_KEYS.ADMIN_USERS, list);
    return newUser;
  }

  public updateAdminUser(id: string, updates: Partial<AdminUser>): void {
    const list = this.getAdminUsers().map((u) => {
      if (u.id === id) {
        // Prevent removal of owner flag from owner
        if (u.isOwner && updates.isOwner === false) {
          updates.isOwner = true;
          updates.isActive = true;
        }
        return { ...u, ...updates };
      }
      return u;
    });
    this.setItem(STORAGE_KEYS.ADMIN_USERS, list);
  }

  public deleteAdminUser(id: string): boolean {
    const user = this.getAdminUserById(id);
    if (!user || user.isOwner) {
      return false; // Cannot delete protected owner account
    }
    const list = this.getAdminUsers().filter((u) => u.id !== id);
    this.setItem(STORAGE_KEYS.ADMIN_USERS, list);
    return true;
  }

  public getCurrentAdminUser(): AdminUser | null {
    return this.getItem<AdminUser | null>(STORAGE_KEYS.ADMIN_ACTIVE_SESSION, null);
  }

  public setCurrentAdminUser(user: AdminUser | null): void {
    this.setItem(STORAGE_KEYS.ADMIN_ACTIVE_SESSION, user);
  }

  public verifyAdminLogin(
    email: string,
    pass: string
  ): { success: boolean; user?: AdminUser; error?: string } {
    const users = this.getAdminUsers();
    const cleanEmail = email.trim().toLowerCase();
    const matched = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matched) {
      return { success: false, error: 'Administrator account not found.' };
    }
    if (!matched.isActive) {
      return { success: false, error: 'Account has been deactivated. Contact the system owner.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Update last login
    const updated = { ...matched, lastLogin: new Date().toISOString() };
    this.updateAdminUser(matched.id, { lastLogin: updated.lastLogin });
    this.setCurrentAdminUser(updated);

    return { success: true, user: updated };
  }

  public isAdminAuthenticated(): boolean {
    return Boolean(this.getCurrentAdminUser());
  }

  // --- Consolidated Customers ---
  public getCustomers() {
    const map = new Map<
      string,
      {
        email: string;
        name: string;
        phone: string;
        company?: string;
        totalInteractions: number;
        latestDate: string;
        origin: string;
      }
    >();

    this.getServiceRequests().forEach((r) => {
      const key = r.email.toLowerCase().trim();
      const existing = map.get(key);
      if (existing) {
        existing.totalInteractions++;
        if (new Date(r.createdAt) > new Date(existing.latestDate)) {
          existing.latestDate = r.createdAt;
        }
      } else {
        map.set(key, {
          email: r.email,
          name: r.name,
          phone: r.phone,
          company: r.company,
          totalInteractions: 1,
          latestDate: r.createdAt,
          origin: 'Service Request',
        });
      }
    });

    this.getProductRequests().forEach((p) => {
      const key = p.email.toLowerCase().trim();
      const existing = map.get(key);
      if (existing) {
        existing.totalInteractions++;
        if (new Date(p.createdAt) > new Date(existing.latestDate)) {
          existing.latestDate = p.createdAt;
        }
      } else {
        map.set(key, {
          email: p.email,
          name: p.customerName,
          phone: p.phone,
          company: p.location,
          totalInteractions: 1,
          latestDate: p.createdAt,
          origin: 'Product Quote',
        });
      }
    });

    this.getCourseEnrollments().forEach((c) => {
      const key = c.email.toLowerCase().trim();
      const existing = map.get(key);
      if (existing) {
        existing.totalInteractions++;
        if (new Date(c.createdAt) > new Date(existing.latestDate)) {
          existing.latestDate = c.createdAt;
        }
      } else {
        map.set(key, {
          email: c.email,
          name: c.studentName,
          phone: c.phone,
          totalInteractions: 1,
          latestDate: c.createdAt,
          origin: 'Academy Enrollment',
        });
      }
    });

    return Array.from(map.values());
  }

  // --- Backup & SQL Export ---
  public exportDataBackupJSON(): string {
    const dump = {
      exportedAt: new Date().toISOString(),
      currency: 'BDT',
      settings: this.getSettings(),
      budgetOptions: this.getBudgetOptions(),
      advertisements: this.getAdvertisements(true),
      adminUsers: this.getAdminUsers(),
      services: this.getServices(),
      products: this.getProducts(true),
      courses: this.getCourses(true),
      projects: this.getProjects(),
      blog: this.getBlogPosts(true),
      serviceRequests: this.getServiceRequests(),
      productRequests: this.getProductRequests(),
      courseEnrollments: this.getCourseEnrollments(),
    };
    return JSON.stringify(dump, null, 2);
  }

  public resetToFactoryDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BLOG);
    localStorage.removeItem(STORAGE_KEYS.SERVICE_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCT_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);
    localStorage.removeItem(STORAGE_KEYS.BUDGET_OPTIONS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USERS);
    localStorage.removeItem(STORAGE_KEYS.ADVERTISEMENTS);
    localStorage.removeItem(STORAGE_KEYS.AD_NETWORK);
    this.ensureInitialized();
    this.notify();
  }
}

export const db = new DatabaseStore();
