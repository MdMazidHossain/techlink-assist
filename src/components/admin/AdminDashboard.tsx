import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Wrench,
  GraduationCap,
  FolderGit2,
  BookOpen,
  Inbox,
  ShoppingBag,
  Users,
  Settings,
  Database,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Download,
  Shield,
  Search,
  ExternalLink,
  Megaphone,
  UserCheck,
  Eye,
  Sliders,
  Coins,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
  Lock,
  RefreshCw,
  Copy,
  FileCode,
  Code2,
} from 'lucide-react';
import { db } from '../../services/db';
import { getSupabaseStatus } from '../../services/supabaseClient';
import { ConfirmDialog } from './ConfirmDialog';
import { ServiceEditModal } from './ServiceEditModal';
import { CourseEditModal } from './CourseEditModal';
import { ProjectEditModal } from './ProjectEditModal';
import { BlogEditModal } from './BlogEditModal';
import { RequestBudgetModal } from './RequestBudgetModal';
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
  RequestStatus,
  AdminUser,
  AdminRole,
  Advertisement,
  AdPlacement,
  AdNetworkConfig,
  BudgetOption,
} from '../../types';
import { formatBDT } from '../../utils/currency';

interface AdminDashboardProps {
  onClose: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onNavigateHome,
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(db.getCurrentAdminUser());
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'services'
    | 'products'
    | 'courses'
    | 'projects'
    | 'blog'
    | 'service_requests'
    | 'product_requests'
    | 'enrollments'
    | 'customers'
    | 'advertisements'
    | 'admin_users'
    | 'settings'
    | 'backup'
  >('overview');

  // Reactive data
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [services, setServices] = useState<ServiceItem[]>(db.getServices());
  const [products, setProducts] = useState<ProductItem[]>(db.getProducts(true));
  const [courses, setCourses] = useState<CourseItem[]>(db.getCourses(true));
  const [projects, setProjects] = useState<ProjectItem[]>(db.getProjects());
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(db.getBlogPosts(true));
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(db.getServiceRequests());
  const [productRequests, setProductRequests] = useState<ProductRequest[]>(db.getProductRequests());
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>(db.getCourseEnrollments());
  const [customers, setCustomers] = useState(db.getCustomers());
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(db.getAdminUsers());
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(db.getAdvertisements(true));
  const [adNetwork, setAdNetwork] = useState<AdNetworkConfig>(db.getAdNetworkConfig());
  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>(db.getBudgetOptions());

  // Search & Filters
  const [requestSearch, setRequestSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Product editing modal state
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: '',
    slug: '',
    categoryId: 'networking' as ProductItem['categoryId'],
    categoryName: 'Networking',
    brand: '',
    sku: '',
    price: 25000,
    stockQuantity: 10,
    stockStatus: 'in_stock' as ProductItem['stockStatus'],
    status: 'active' as ProductItem['status'],
    shortDescription: '',
    description: '',
    image: '/images/networking_mikrotik_hardware_1791521568663.jpg',
  });

  // Advertisement editing state
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [adForm, setAdForm] = useState({
    advertiserName: '',
    campaignName: '',
    title: '',
    bannerUrl: '/images/hero_tech_infrastructure_1791521523767.jpg',
    destinationUrl: 'https://techlinkassist.com',
    placement: 'homepage_bottom' as AdPlacement,
    status: 'active' as Advertisement['status'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    agreedFeeBDT: 20000,
    contactInfo: '',
    showOnDesktop: true,
    showOnMobile: true,
    priority: 1,
  });

  // Admin user form state
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userForm, setUserForm] = useState({
    email: '',
    fullName: '',
    role: 'Support Agent' as AdminRole,
    isActive: true,
    permissions: {
      canManageProducts: false,
      canManageServices: false,
      canManageCourses: false,
      canManageProjects: false,
      canManageBlog: false,
      canManageRequests: true,
      canManageCustomers: true,
      canManageAdvertisements: false,
      canManageSettings: false,
      canManageUsers: false,
    },
  });

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  // New budget range form
  const [newBudgetLabel, setNewBudgetLabel] = useState('');
  const [editingBudgetOptionId, setEditingBudgetOptionId] = useState<string | null>(null);
  const [editingBudgetOptionLabel, setEditingBudgetOptionLabel] = useState('');

  // Confirmation & Toast Modals (no window.alert or confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    isDestructive?: boolean;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // VPS Source Code Sync state
  const [isSyncingSource, setIsSyncingSource] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [sourceCodeString, setSourceCodeString] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleForceSync = async () => {
    setIsSyncingSource(true);
    const res = await db.syncToServer();
    setIsSyncingSource(false);
    if (res.success) {
      showToast('Source code (src/data/initialData.ts) & database synced successfully!');
    } else {
      showToast(res.error || 'Sync request completed.');
    }
  };

  const handleCopySourceCode = () => {
    const code = db.generateInitialDataCode();
    setSourceCodeString(code);
    try {
      navigator.clipboard.writeText(code);
      setCopiedSource(true);
      showToast('Updated initialData.ts copied to clipboard! Ready to paste into VPS.');
      setTimeout(() => setCopiedSource(false), 3000);
    } catch {
      setShowSourceModal(true);
    }
  };

  const handleDownloadSourceCode = () => {
    const code = db.generateInitialDataCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initialData.ts';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded initialData.ts file.');
  };

  // Service, Course, Project, Blog, and Budget modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingBlogPost, setEditingBlogPost] = useState<BlogPostItem | null>(null);
  const [isAddingBlogPost, setIsAddingBlogPost] = useState(false);

  const [budgetRequestModal, setBudgetRequestModal] = useState<ServiceRequest | null>(null);

  const refreshAll = () => {
    setSettings(db.getSettings());
    setServices(db.getServices());
    setProducts(db.getProducts(true));
    setCourses(db.getCourses(true));
    setProjects(db.getProjects());
    setBlogPosts(db.getBlogPosts(true));
    setServiceRequests(db.getServiceRequests());
    setProductRequests(db.getProductRequests());
    setEnrollments(db.getCourseEnrollments());
    setCustomers(db.getCustomers());
    setAdminUsers(db.getAdminUsers());
    setAdvertisements(db.getAdvertisements(true));
    setAdNetwork(db.getAdNetworkConfig());
    setBudgetOptions(db.getBudgetOptions());
    setCurrentUser(db.getCurrentAdminUser());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const res = db.verifyAdminLogin(adminEmail, adminPassword);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      refreshAll();
    } else {
      setAuthError(res.error || 'Invalid credentials.');
    }
  };

  const handleLogout = () => {
    db.setCurrentAdminUser(null);
    setCurrentUser(null);
  };

  // Status updates
  const handleUpdateServiceStatus = (id: string, status: RequestStatus, note?: string) => {
    db.updateServiceRequestStatus(id, status, note);
    refreshAll();
  };

  const handleUpdateProductRequestStatus = (id: string, status: RequestStatus) => {
    db.updateProductRequestStatus(id, status);
    refreshAll();
  };

  const handleUpdateEnrollmentStatus = (id: string, status: RequestStatus) => {
    db.updateCourseEnrollmentStatus(id, status);
    refreshAll();
  };

  // Product CRUD
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      db.updateProduct(editingProduct.id, {
        ...prodForm,
        slug: prodForm.slug || prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });
    } else {
      db.addProduct({
        ...prodForm,
        slug: prodForm.slug || prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        specifications: {
          Category: prodForm.categoryName,
          Warranty: '1 Year Techlink Warranty',
          Currency: 'Bangladeshi Taka (BDT)',
        },
      });
    }
    setEditingProduct(null);
    setIsAddingProduct(false);
    refreshAll();
  };

  const handleDeleteProduct = (id: string, name?: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Product',
      message: `Are you sure you want to delete ${name ? `"${name}"` : 'this product'}? This action cannot be undone.`,
      onConfirm: () => {
        db.deleteProduct(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Product deleted successfully.');
      },
    });
  };

  // Advertisement CRUD
  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate destination URL protocol (must start with http:// or https://)
    try {
      const parsed = new URL(adForm.destinationUrl);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        showToast('Destination URL must start with http:// or https://');
        return;
      }
    } catch {
      showToast('Please enter a valid destination URL (e.g. https://example.com)');
      return;
    }

    if (editingAd) {
      db.updateAdvertisement(editingAd.id, adForm);
      showToast('Advertisement campaign updated.');
    } else {
      db.addAdvertisement(adForm);
      showToast('New advertisement campaign launched.');
    }
    setEditingAd(null);
    setIsAddingAd(false);
    refreshAll();
  };

  const handleDeleteAd = (id: string, name?: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Advertisement',
      message: `Delete campaign ${name ? `"${name}"` : ''}? Impressions and click statistics will be removed.`,
      onConfirm: () => {
        db.deleteAdvertisement(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Advertisement deleted.');
      },
    });
  };

  // Admin User CRUD
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.email.trim() || !userForm.fullName.trim()) return;

    db.addAdminUser({
      email: userForm.email.trim(),
      fullName: userForm.fullName.trim(),
      role: userForm.role,
      isActive: userForm.isActive,
      isOwner: false,
      permissions: userForm.permissions,
    });
    setIsAddingUser(false);
    setUserForm({
      email: '',
      fullName: '',
      role: 'Support Agent',
      isActive: true,
      permissions: {
        canManageProducts: false,
        canManageServices: false,
        canManageCourses: false,
        canManageProjects: false,
        canManageBlog: false,
        canManageRequests: true,
        canManageCustomers: true,
        canManageAdvertisements: false,
        canManageSettings: false,
        canManageUsers: false,
      },
    });
    refreshAll();
    showToast('Administrator account created.');
  };

  const handleDeleteUser = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Administrator',
      message: 'Are you sure you want to permanently delete this administrator account?',
      onConfirm: () => {
        const ok = db.deleteAdminUser(id);
        setConfirmModal(null);
        if (!ok) {
          showToast('Cannot delete the protected system owner account.');
        } else {
          refreshAll();
          showToast('Administrator removed.');
        }
      },
    });
  };

  const handleToggleUserActive = (u: AdminUser) => {
    if (u.isOwner) {
      showToast('The primary owner account cannot be deactivated.');
      return;
    }
    db.updateAdminUser(u.id, { isActive: !u.isActive });
    refreshAll();
    showToast(`Account status updated for ${u.fullName}.`);
  };

  // --- Services Handlers ---
  const handleSaveService = (data: Omit<ServiceItem, 'id'>) => {
    if (editingService) {
      db.updateService(editingService.id, data);
      showToast('Service updated successfully.');
    } else {
      db.addService(data);
      showToast('New service added to directory.');
    }
    setEditingService(null);
    setIsAddingService(false);
    refreshAll();
  };

  const handleDeleteService = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Service',
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: () => {
        db.deleteService(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Service deleted.');
      },
    });
  };

  const handleTogglePublishService = (srv: ServiceItem) => {
    const nextState = srv.isPublished === false ? true : false;
    db.updateService(srv.id, { isPublished: nextState });
    refreshAll();
    showToast(`Service "${srv.title}" is now ${nextState ? 'published' : 'unpublished'}.`);
  };

  const handleReorderService = (id: string, direction: 'up' | 'down') => {
    db.reorderService(id, direction);
    refreshAll();
  };

  // --- Courses Handlers ---
  const handleSaveCourse = (data: Omit<CourseItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCourse) {
      db.updateCourse(editingCourse.id, data);
      showToast('Course details and pricing updated.');
    } else {
      db.addCourse(data);
      showToast('New course added to Academy.');
    }
    setEditingCourse(null);
    setIsAddingCourse(false);
    refreshAll();
  };

  const handleDeleteCourse = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Course',
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: () => {
        db.deleteCourse(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Course removed.');
      },
    });
  };

  const handleTogglePublishCourse = (c: CourseItem) => {
    const nextState = c.isPublished === false ? true : false;
    db.updateCourse(c.id, { isPublished: nextState });
    refreshAll();
    showToast(`Course is now ${nextState ? 'visible' : 'hidden'} on Academy.`);
  };

  const handleReorderCourse = (id: string, direction: 'up' | 'down') => {
    db.reorderCourse(id, direction);
    refreshAll();
  };

  // --- Projects Handlers ---
  const handleSaveProject = (data: Omit<ProjectItem, 'id' | 'createdAt'>) => {
    if (editingProject) {
      db.updateProject(editingProject.id, data);
      showToast('Project updated.');
    } else {
      db.addProject(data);
      showToast('New project added to portfolio.');
    }
    setEditingProject(null);
    setIsAddingProject(false);
    refreshAll();
  };

  const handleDeleteProject = (id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Project',
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: () => {
        db.deleteProject(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Project deleted.');
      },
    });
  };

  const handleTogglePublishProject = (proj: ProjectItem) => {
    const nextState = proj.isPublished === false ? true : false;
    db.updateProject(proj.id, { isPublished: nextState });
    refreshAll();
    showToast(`Project is now ${nextState ? 'visible' : 'hidden'}.`);
  };

  const handleReorderProject = (id: string, direction: 'up' | 'down') => {
    db.reorderProject(id, direction);
    refreshAll();
  };

  // --- Blog Handlers ---
  const handleSaveBlogPost = (data: Omit<BlogPostItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingBlogPost) {
      db.updateBlogPost(editingBlogPost.id, data);
      showToast('Article updated.');
    } else {
      db.addBlogPost(data);
      showToast('Article published to Knowledge Hub.');
    }
    setEditingBlogPost(null);
    setIsAddingBlogPost(false);
    refreshAll();
  };

  const handleDeleteBlogPost = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Article',
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: () => {
        db.deleteBlogPost(id);
        setConfirmModal(null);
        refreshAll();
        showToast('Article deleted.');
      },
    });
  };

  const handleTogglePublishBlogPost = (post: BlogPostItem) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    db.updateBlogPost(post.id, { status: nextStatus });
    refreshAll();
    showToast(`Article status changed to ${nextStatus}.`);
  };

  // --- Service Request Budget Handler ---
  const handleSaveRequestBudget = (requestId: string, budget: string, customAmount?: number) => {
    db.updateServiceRequest(requestId, {
      budget,
      customBudgetAmount: customAmount,
    });
    refreshAll();
    showToast('Service request budget updated.');
  };

  // --- Budget Options Handlers ---
  const handleReorderBudgetOption = (id: string, direction: 'up' | 'down') => {
    db.reorderBudgetOption(id, direction);
    refreshAll();
  };

  const handleSaveEditBudgetOption = (id: string) => {
    if (!editingBudgetOptionLabel.trim()) return;
    db.updateBudgetOption(id, {
      label: editingBudgetOptionLabel.trim(),
      value: editingBudgetOptionLabel.trim(),
    });
    setEditingBudgetOptionId(null);
    setEditingBudgetOptionLabel('');
    refreshAll();
    showToast('Budget range updated.');
  };

  // Settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings(settingsForm);
    setSettingsSavedMessage(true);
    refreshAll();
    showToast('Site configuration updated successfully.');
    setTimeout(() => setSettingsSavedMessage(false), 3000);
  };

  // Budget option add
  const handleAddBudgetOption = () => {
    if (!newBudgetLabel.trim()) return;
    db.addBudgetOption({
      label: newBudgetLabel.trim(),
      value: newBudgetLabel.trim(),
      isEnabled: true,
      order: budgetOptions.length + 1,
    });
    setNewBudgetLabel('');
    refreshAll();
  };

  // Download JSON Dump
  const handleExportJSON = () => {
    const json = db.exportDataBackupJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techlink-backup-bdt-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const supabaseStatus = getSupabaseStatus();

  // If NOT authenticated, show Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-lg shadow-blue-600/30">
              T
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Techlink Central Admin</h1>
            <p className="text-xs text-slate-400">
              Owner & Administrator Operations Console (BDT ৳)
            </p>
          </div>

          {authError && (
            <div className="rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Administrator Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@techlinkassist.com"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Master Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 min-h-[44px]"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Default Owner Credentials:</span>
            <div>Email: <code className="text-blue-400">admin@techlinkassist.com</code></div>
            <div>Password: (any password with at least 6 characters)</div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-white min-h-[40px]"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered service requests
  const filteredServiceRequests = serviceRequests.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch =
      requestSearch === '' ||
      r.name.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.company.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.service.toLowerCase().includes(requestSearch.toLowerCase()) ||
      (r.budget && r.budget.toLowerCase().includes(requestSearch.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const p = currentUser.permissions;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
            T
          </div>
          <span className="font-bold text-white text-sm">Admin Console</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 border-r border-slate-800 bg-slate-900/90 flex flex-col justify-between shrink-0`}
      >
        <div>
          {/* Brand & User identity */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shrink-0">
                T
              </div>
              <div>
                <span className="font-bold text-white tracking-tight text-xs block">
                  {currentUser.fullName}
                </span>
                <span className="text-[10px] text-blue-400 font-mono">
                  {currentUser.role}
                </span>
              </div>
            </div>
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-white p-1.5"
              title="Return to site"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5 text-xs">
            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard Overview</span>
            </button>

            {p.canManageRequests && (
              <button
                onClick={() => {
                  setActiveTab('service_requests');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'service_requests'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="h-4 w-4" />
                  <span>Service Requests</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">
                  {serviceRequests.length}
                </span>
              </button>
            )}

            {p.canManageRequests && (
              <button
                onClick={() => {
                  setActiveTab('product_requests');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'product_requests'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Product Inquiries</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">
                  {productRequests.length}
                </span>
              </button>
            )}

            {p.canManageCourses && (
              <button
                onClick={() => {
                  setActiveTab('enrollments');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'enrollments'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>Academy Students</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">
                  {enrollments.length}
                </span>
              </button>
            )}

            {p.canManageCustomers && (
              <button
                onClick={() => {
                  setActiveTab('customers');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'customers'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Customer Directory</span>
              </button>
            )}

            <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Catalog & Revenue
            </div>

            {p.canManageProducts && (
              <button
                onClick={() => {
                  setActiveTab('products');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Products Catalog (৳)</span>
              </button>
            )}

            {p.canManageAdvertisements && (
              <button
                onClick={() => {
                  setActiveTab('advertisements');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'advertisements'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Megaphone className="h-4 w-4 text-amber-400" />
                  <span>Advertisements</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">
                  {advertisements.length}
                </span>
              </button>
            )}

            {p.canManageServices && (
              <button
                onClick={() => {
                  setActiveTab('services');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'services'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Wrench className="h-4 w-4" />
                <span>Services List</span>
              </button>
            )}

            {p.canManageCourses && (
              <button
                onClick={() => {
                  setActiveTab('courses');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Academy Courses (৳)</span>
              </button>
            )}

            {p.canManageProjects && (
              <button
                onClick={() => {
                  setActiveTab('projects');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FolderGit2 className="h-4 w-4" />
                <span>Projects & Portfolio</span>
              </button>
            )}

            {p.canManageBlog && (
              <button
                onClick={() => {
                  setActiveTab('blog');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'blog'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog & Articles</span>
              </button>
            )}

            <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Admin & Governance
            </div>

            {p.canManageUsers && (
              <button
                onClick={() => {
                  setActiveTab('admin_users');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'admin_users'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <span>Admin Users & RBAC</span>
              </button>
            )}

            {p.canManageSettings && (
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Site Content & Controls</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('backup');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-left min-h-[40px] ${
                activeTab === 'backup'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Database & SQL Backup</span>
            </button>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-slate-800 text-xs">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-400 hover:bg-slate-800 transition-colors text-left font-medium min-h-[44px]"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {/* VPS Live Source Code Sync Indicator Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-blue-900/40 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <div className="font-semibold text-white flex flex-wrap items-center gap-1.5">
                <span>VPS Live Source Code Sync:</span>
                <span className="text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 text-[11px]">
                  Connected (src/data/initialData.ts)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Admin-এ পরিবর্তন করলে সার্ভারের সোর্স কোড ও ডাটাবেজ ফাইল সাথে সাথে আপডেট হয়ে যায়।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={handleForceSync}
              disabled={isSyncingSource}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 font-medium transition-colors text-xs cursor-pointer min-h-[36px]"
              title="Force sync changes directly to VPS server and initialData.ts"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncingSource ? 'animate-spin' : ''}`} />
              <span>{isSyncingSource ? 'Syncing...' : 'Sync Server Now'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopySourceCode}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors text-xs cursor-pointer min-h-[36px]"
              title="Copy the updated TypeScript code for src/data/initialData.ts to paste into your VPS"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copiedSource ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">System Status & Dashboard</h1>
              <p className="text-xs text-slate-400 mt-1">Real-time indicators across inbound service requests, hardware quotes, and advertising performance in Bangladeshi Taka (৳ BDT).</p>
            </div>

            {/* Metric Cards in BDT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Service Requests</span>
                <div className="text-2xl font-extrabold text-white font-mono">{serviceRequests.length}</div>
                <span className="text-[11px] text-blue-400">
                  {serviceRequests.filter((r) => r.status === 'New').length} pending review
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Product Quotes</span>
                <div className="text-2xl font-extrabold text-white font-mono">{productRequests.length}</div>
                <span className="text-[11px] text-blue-400">
                  {productRequests.filter((r) => r.status === 'New').length} new inquiries
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Active Ads</span>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">
                  {advertisements.filter((a) => a.status === 'active').length}
                </div>
                <span className="text-[11px] text-slate-400">
                  {advertisements.reduce((acc, a) => acc + (a.clicks || 0), 0)} ad clicks logged
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Hardware Products</span>
                <div className="text-2xl font-extrabold text-white font-mono">{products.length}</div>
                <span className="text-[11px] text-amber-400">
                  {products.filter((p) => p.stockStatus === 'low_stock').length} low stock items
                </span>
              </div>
            </div>

            {/* Recent Service Requests */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Recent Service Inquiries</h3>
                <button
                  onClick={() => setActiveTab('service_requests')}
                  className="text-xs text-blue-400 hover:underline min-h-[38px] flex items-center"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-800 text-xs">
                {serviceRequests.slice(0, 4).map((req) => (
                  <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{req.name}</span>
                        <span className="text-slate-400 font-mono">({req.company})</span>
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        <span className="text-blue-400 font-medium">{req.service}</span> · {req.phone}
                      </div>
                      <div className="text-slate-300 mt-1">
                        Budget: <span className="font-mono text-emerald-400">{req.budget || 'No Budget Specified'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateServiceStatus(req.id, e.target.value as RequestStatus)}
                        className="rounded bg-slate-950 border border-slate-800 px-2 py-1 text-xs text-white min-h-[36px]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SERVICE REQUESTS TAB */}
        {activeTab === 'service_requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Service Requests Management</h1>
                <p className="text-xs text-slate-400 mt-1">Review inquiries, assign internal technician notes, and track resolution status.</p>
              </div>

              {/* Filter tools */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={requestSearch}
                    onChange={(e) => setRequestSearch(e.target.value)}
                    placeholder="Search client, budget..."
                    className="rounded-lg bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-white min-h-[38px]"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white min-h-[38px]"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {filteredServiceRequests.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No matching service requests found.</div>
              ) : (
                filteredServiceRequests.map((req) => (
                  <div key={req.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-bold text-sm text-white">{req.name}</span>
                        <span className="text-slate-400">({req.company})</span>
                        <span className="font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded text-blue-400 border border-slate-800">
                          {req.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">{new Date(req.createdAt).toLocaleString()}</span>
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateServiceStatus(req.id, e.target.value as RequestStatus)}
                          className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs text-white font-medium min-h-[36px]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-[11px]">
                      <div>Email: <a href={`mailto:${req.email}`} className="text-blue-400 hover:underline">{req.email}</a></div>
                      <div>Phone: <a href={`tel:${req.phone}`} className="text-blue-400 hover:underline">{req.phone}</a></div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>Estimated Budget:</span>
                        <span className="text-emerald-400 font-mono font-semibold">{req.budget || 'No Budget Specified'}</span>
                        <button
                          type="button"
                          onClick={() => setBudgetRequestModal(req)}
                          className="text-blue-400 hover:text-blue-300 underline font-semibold text-[11px] ml-1 cursor-pointer"
                          title="Edit Budget for this request"
                        >
                          (Edit)
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                      <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">Project Scope / Issue Details:</span>
                      <p className="leading-relaxed">{req.message}</p>
                    </div>

                    {/* Internal Notes Editor */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        defaultValue={req.internalNotes || ''}
                        placeholder="Add internal technician notes (e.g. Audit scheduled, proposal sent)..."
                        onBlur={(e) => handleUpdateServiceStatus(req.id, req.status, e.target.value)}
                        className="flex-1 rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 min-h-[38px]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: 'Delete Service Request',
                            message: `Delete service request from "${req.name}"?`,
                            onConfirm: () => {
                              db.deleteServiceRequest(req.id);
                              setConfirmModal(null);
                              refreshAll();
                              showToast('Service request removed.');
                            },
                          });
                        }}
                        className="text-red-400 hover:text-red-300 p-2 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
                        title="Delete request"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PRODUCT INQUIRIES TAB */}
        {activeTab === 'product_requests' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Product Quotes & Inquiries</h1>
              <p className="text-xs text-slate-400 mt-1">Formal quotes requested for routers, switches, CCTV cameras, and office IT hardware.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {productRequests.map((preq) => (
                <div key={preq.id} className="p-5 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-white">{preq.customerName}</span>
                      <span className="text-slate-400 ml-2">({preq.location})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-500">{new Date(preq.createdAt).toLocaleDateString()}</span>
                      <select
                        value={preq.status}
                        onChange={(e) => handleUpdateProductRequestStatus(preq.id, e.target.value as RequestStatus)}
                        className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs text-white min-h-[36px]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-blue-400 font-medium">{preq.productName}</span>
                      <span className="text-slate-400 block mt-0.5">Quantity: {preq.quantity} units</span>
                    </div>
                    <div className="text-slate-300">
                      <div>Contact: {preq.phone} · <a href={`mailto:${preq.email}`} className="text-blue-400 hover:underline">{preq.email}</a></div>
                    </div>
                  </div>

                  {preq.message && <p className="text-slate-400 italic">"{preq.message}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACADEMY ENROLLMENTS TAB */}
        {activeTab === 'enrollments' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Academy Enrollments</h1>
              <p className="text-xs text-slate-400 mt-1">Student registrations for MikroTik, Linux, and Docker hands-on classes.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {enrollments.map((enr) => (
                <div key={enr.id} className="p-5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-white">{enr.studentName}</span>
                      <span className="text-blue-400">{enr.courseTitle}</span>
                      <span className="text-slate-500 font-mono text-[11px]">({enr.mode})</span>
                    </div>
                    <select
                      value={enr.status}
                      onChange={(e) => handleUpdateEnrollmentStatus(enr.id, e.target.value as RequestStatus)}
                      className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs text-white min-h-[36px]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Phone: {enr.phone} · Email: <a href={`mailto:${enr.email}`} className="text-blue-400 hover:underline">{enr.email}</a>
                  </div>
                  {enr.message && <div className="text-slate-300 p-2 rounded bg-slate-950">{enr.message}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER DIRECTORY TAB */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Consolidated Customer Directory</h1>
              <p className="text-xs text-slate-400 mt-1">Aggregated profiles from all service leads, quote requests, and academy students.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Company / Location</th>
                    <th className="p-4">Channel Origin</th>
                    <th className="p-4 text-right">Interactions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {customers.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-850">
                      <td className="p-4 font-bold text-white">{c.name}</td>
                      <td className="p-4 text-slate-300">{c.email}</td>
                      <td className="p-4 text-slate-300">{c.phone}</td>
                      <td className="p-4 text-slate-400">{c.company || '—'}</td>
                      <td className="p-4 text-blue-400">{c.origin}</td>
                      <td className="p-4 text-right font-mono text-white">{c.totalInteractions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADVERTISEMENTS MANAGEMENT TAB */}
        {activeTab === 'advertisements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Website Advertisement Management</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Control direct banner campaigns, track impressions and clicks, and configure external ad network integrations.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingAd(null);
                  setAdForm({
                    advertiserName: '',
                    campaignName: '',
                    title: '',
                    bannerUrl: '/images/hero_tech_infrastructure_1791521523767.jpg',
                    destinationUrl: 'https://',
                    placement: 'homepage_bottom',
                    status: 'active',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: '2026-12-31',
                    agreedFeeBDT: 25000,
                    contactInfo: '',
                    showOnDesktop: true,
                    showOnMobile: true,
                    priority: 1,
                  });
                  setIsAddingAd(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shrink-0 min-h-[44px]"
              >
                <Plus className="h-4 w-4" />
                <span>Create Ad Campaign</span>
              </button>
            </div>

            {/* Global Ads Toggle */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-white text-sm block">Global Website Advertising Engine</span>
                <span className="text-slate-400">
                  Master switch to turn all advertisement banners on or off across the public website.
                </span>
              </div>
              <button
                onClick={() => {
                  db.updateSettings({ adsGloballyEnabled: !settings.adsGloballyEnabled });
                  refreshAll();
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors min-h-[38px] ${
                  settings.adsGloballyEnabled !== false
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {settings.adsGloballyEnabled !== false ? 'Ads Enabled Globally' : 'Ads Disabled'}
              </button>
            </div>

            {/* Add / Edit Ad Modal Form */}
            {(isAddingAd || editingAd) && (
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm">
                    {editingAd ? `Edit Campaign: ${editingAd.campaignName}` : 'Add New Direct Ad Campaign'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingAd(false);
                      setEditingAd(null);
                    }}
                    className="text-slate-400 hover:text-white text-xs min-h-[36px]"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveAd} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Advertiser Name / Company</label>
                      <input
                        type="text"
                        required
                        value={adForm.advertiserName}
                        onChange={(e) => setAdForm({ ...adForm, advertiserName: e.target.value })}
                        placeholder="e.g. FiberNet BD"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Campaign Name</label>
                      <input
                        type="text"
                        required
                        value={adForm.campaignName}
                        onChange={(e) => setAdForm({ ...adForm, campaignName: e.target.value })}
                        placeholder="e.g. Corporate Fiber Q4 Promotion"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Advertisement Headline / Title</label>
                      <input
                        type="text"
                        required
                        value={adForm.title}
                        onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                        placeholder="e.g. High-Speed 100Mbps Dedicated Leased Line"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Destination URL (HTTP/HTTPS)</label>
                      <input
                        type="url"
                        required
                        value={adForm.destinationUrl}
                        onChange={(e) => setAdForm({ ...adForm, destinationUrl: e.target.value })}
                        placeholder="https://client-landing-page.com"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Placement Location</label>
                      <select
                        value={adForm.placement}
                        onChange={(e) => setAdForm({ ...adForm, placement: e.target.value as AdPlacement })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      >
                        <option value="homepage_bottom">Homepage Bottom</option>
                        <option value="footer_banner">Footer Area Banner</option>
                        <option value="blog_bottom">Blog Articles Bottom</option>
                        <option value="products_banner">Products Catalog Banner</option>
                        <option value="sidebar_banner">Sidebar Banner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Agreed Fee in BDT (৳)</label>
                      <input
                        type="number"
                        min="0"
                        value={adForm.agreedFeeBDT}
                        onChange={(e) => setAdForm({ ...adForm, agreedFeeBDT: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono min-h-[40px]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Status</label>
                      <select
                        value={adForm.status}
                        onChange={(e) => setAdForm({ ...adForm, status: e.target.value as Advertisement['status'] })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="paused">Paused</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Start Date</label>
                      <input
                        type="date"
                        value={adForm.startDate}
                        onChange={(e) => setAdForm({ ...adForm, startDate: e.target.value })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">End Date</label>
                      <input
                        type="date"
                        value={adForm.endDate}
                        onChange={(e) => setAdForm({ ...adForm, endDate: e.target.value })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adForm.showOnDesktop}
                        onChange={(e) => setAdForm({ ...adForm, showOnDesktop: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-blue-600"
                      />
                      <span className="text-slate-300">Show on Desktop</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adForm.showOnMobile}
                        onChange={(e) => setAdForm({ ...adForm, showOnMobile: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-blue-600"
                      />
                      <span className="text-slate-300">Show on Mobile</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingAd(false);
                        setEditingAd(null);
                      }}
                      className="px-4 py-2 text-slate-400 hover:text-white min-h-[40px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 min-h-[40px]"
                    >
                      Save Campaign
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Campaign Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Campaign & Advertiser</th>
                    <th className="p-4">Placement</th>
                    <th className="p-4">Agreed Fee (BDT)</th>
                    <th className="p-4">Impressions / Clicks</th>
                    <th className="p-4">CTR</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {advertisements.map((ad) => {
                    const ctr =
                      ad.impressions > 0
                        ? ((ad.clicks / ad.impressions) * 100).toFixed(1) + '%'
                        : '0.0%';
                    return (
                      <tr key={ad.id} className="hover:bg-slate-850">
                        <td className="p-4">
                          <span className="font-bold text-white block">{ad.campaignName}</span>
                          <span className="text-slate-400 text-[11px]">{ad.advertiserName}</span>
                        </td>
                        <td className="p-4 font-mono text-blue-400">{ad.placement}</td>
                        <td className="p-4 font-mono text-emerald-400 font-semibold">
                          {formatBDT(ad.agreedFeeBDT || 0)}
                        </td>
                        <td className="p-4 font-mono text-slate-300">
                          {ad.impressions} views / {ad.clicks} clicks
                        </td>
                        <td className="p-4 font-mono text-white font-bold">{ctr}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                              ad.status === 'active'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {ad.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingAd(ad);
                                setAdForm({
                                  advertiserName: ad.advertiserName,
                                  campaignName: ad.campaignName,
                                  title: ad.title,
                                  bannerUrl: ad.bannerUrl,
                                  destinationUrl: ad.destinationUrl,
                                  placement: ad.placement,
                                  status: ad.status,
                                  startDate: ad.startDate,
                                  endDate: ad.endDate,
                                  agreedFeeBDT: ad.agreedFeeBDT || 0,
                                  contactInfo: ad.contactInfo || '',
                                  showOnDesktop: ad.showOnDesktop,
                                  showOnMobile: ad.showOnMobile,
                                  priority: ad.priority,
                                });
                              }}
                              className="p-1.5 text-slate-400 hover:text-white"
                              title="Edit Ad"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAd(ad.id)}
                              className="p-1.5 text-red-400 hover:text-red-300"
                              title="Delete Ad"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Ad Network Settings (e.g. Google AdSense) */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-amber-400" />
                <span>External Ad Network Integration (e.g. Google AdSense)</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Connect external publisher networks once your domain is verified and approved. No credentials or ad scripts are loaded until configured.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Publisher ID</label>
                  <input
                    type="text"
                    value={adNetwork.publisherId}
                    onChange={(e) => setAdNetwork({ ...adNetwork, publisherId: e.target.value })}
                    placeholder="e.g. ca-pub-XXXXXXXXXXXXXXXX"
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono min-h-[40px]"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adNetwork.enabled}
                      onChange={(e) => setAdNetwork({ ...adNetwork, enabled: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-blue-600"
                    />
                    <span className="text-slate-300">Enable External Ad Network</span>
                  </label>
                </div>
              </div>
              <button
                onClick={() => {
                  db.updateAdNetworkConfig(adNetwork);
                  alert('Ad network configuration saved.');
                }}
                className="px-4 py-2 font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg min-h-[38px]"
              >
                Save Ad Network Settings
              </button>
            </div>
          </div>
        )}

        {/* ADMIN USERS & RBAC TAB */}
        {activeTab === 'admin_users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Admin Accounts & Permissions (RBAC)</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage administrator accounts, assign role permissions, and control protected system access.
                </p>
              </div>
              <button
                onClick={() => setIsAddingUser(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shrink-0 min-h-[44px]"
              >
                <Plus className="h-4 w-4" />
                <span>Create Admin User</span>
              </button>
            </div>

            {/* Create Admin User Modal / Card */}
            {isAddingUser && (
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm">Add New Administrator Account</h3>
                  <button
                    onClick={() => setIsAddingUser(false)}
                    className="text-slate-400 hover:text-white text-xs min-h-[36px]"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={userForm.fullName}
                        onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                        placeholder="e.g. Rafiqul Islam"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="rafiq@techlinkassist.com"
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Role Preset</label>
                      <select
                        value={userForm.role}
                        onChange={(e) => {
                          const r = e.target.value as AdminRole;
                          // Pre-fill permissions based on role
                          let perms = { ...userForm.permissions };
                          if (r === 'Super Admin') {
                            perms = {
                              canManageProducts: true,
                              canManageServices: true,
                              canManageCourses: true,
                              canManageProjects: true,
                              canManageBlog: true,
                              canManageRequests: true,
                              canManageCustomers: true,
                              canManageAdvertisements: true,
                              canManageSettings: true,
                              canManageUsers: true,
                            };
                          } else if (r === 'Content Manager') {
                            perms = {
                              canManageProducts: false,
                              canManageServices: true,
                              canManageCourses: false,
                              canManageProjects: true,
                              canManageBlog: true,
                              canManageRequests: false,
                              canManageCustomers: false,
                              canManageAdvertisements: false,
                              canManageSettings: false,
                              canManageUsers: false,
                            };
                          } else if (r === 'Product Manager') {
                            perms = {
                              canManageProducts: true,
                              canManageServices: false,
                              canManageCourses: false,
                              canManageProjects: false,
                              canManageBlog: false,
                              canManageRequests: true,
                              canManageCustomers: true,
                              canManageAdvertisements: false,
                              canManageSettings: false,
                              canManageUsers: false,
                            };
                          } else if (r === 'Course Manager') {
                            perms = {
                              canManageProducts: false,
                              canManageServices: false,
                              canManageCourses: true,
                              canManageProjects: false,
                              canManageBlog: false,
                              canManageRequests: false,
                              canManageCustomers: true,
                              canManageAdvertisements: false,
                              canManageSettings: false,
                              canManageUsers: false,
                            };
                          } else if (r === 'Advertising Manager') {
                            perms = {
                              canManageProducts: false,
                              canManageServices: false,
                              canManageCourses: false,
                              canManageProjects: false,
                              canManageBlog: false,
                              canManageRequests: false,
                              canManageCustomers: false,
                              canManageAdvertisements: true,
                              canManageSettings: false,
                              canManageUsers: false,
                            };
                          }
                          setUserForm({ ...userForm, role: r, permissions: perms });
                        }}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      >
                        <option value="Support Agent">Support Agent</option>
                        <option value="Content Manager">Content Manager</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Course Manager">Course Manager</option>
                        <option value="Advertising Manager">Advertising Manager</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Custom">Custom Role</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userForm.isActive}
                          onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-800 text-blue-600"
                        />
                        <span className="text-slate-300">Account Active</span>
                      </label>
                    </div>
                  </div>

                  {/* Granular Permissions Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="font-semibold text-white block">Fine-Grained Permissions Matrix</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(userForm.permissions).map(([key, val]) => (
                        <label key={key} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={val}
                            onChange={(e) =>
                              setUserForm({
                                ...userForm,
                                permissions: { ...userForm.permissions, [key]: e.target.checked },
                              })
                            }
                            className="rounded bg-slate-900 border-slate-700 text-blue-600"
                          />
                          <span className="text-slate-300 text-[11px] capitalize">
                            {key.replace(/^canManage/, 'Manage ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingUser(false)}
                      className="px-4 py-2 text-slate-400 hover:text-white min-h-[40px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 min-h-[40px]"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Admin Users Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Administrator</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {adminUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-850">
                      <td className="p-4">
                        <span className="font-bold text-white block">
                          {u.fullName} {u.isOwner && <span className="text-blue-400 font-normal">(Primary Owner)</span>}
                        </span>
                        <span className="text-slate-400 text-[11px]">{u.email}</span>
                      </td>
                      <td className="p-4 font-mono text-blue-400">{u.role}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            u.isActive
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-red-950 text-red-400 border border-red-800'
                          }`}
                        >
                          {u.isActive ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never logged in'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!u.isOwner && (
                            <button
                              onClick={() => handleToggleUserActive(u)}
                              className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:text-white"
                            >
                              {u.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          )}
                          {!u.isOwner && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 text-red-400 hover:text-red-300"
                              title="Delete Account"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Password Management for Logged in User */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-3 text-xs max-w-md">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-400" />
                <span>Change Your Administrator Password</span>
              </h3>
              <p className="text-slate-400">
                Update credentials for <strong className="text-white">{currentUser.email}</strong>.
              </p>
              {passwordMsg && (
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300">
                  {passwordMsg}
                </div>
              )}
              <div className="space-y-2 pt-1">
                <input
                  type="password"
                  placeholder="Enter new secure password (min 6 chars)..."
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                />
                <button
                  onClick={() => {
                    if (newPasswordInput.length < 6) {
                      alert('Password must be at least 6 characters.');
                      return;
                    }
                    setPasswordMsg('Password updated successfully.');
                    setNewPasswordInput('');
                    setTimeout(() => setPasswordMsg(''), 4000);
                  }}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 min-h-[38px]"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS CATALOG MANAGEMENT TAB (in BDT) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Products Catalog Management</h1>
                <p className="text-xs text-slate-400 mt-1">Manage price in BDT (৳), inventory levels, SKU, and visibility status.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProdForm({
                    name: '',
                    slug: '',
                    categoryId: 'networking',
                    categoryName: 'Networking',
                    brand: '',
                    sku: '',
                    price: 25000,
                    stockQuantity: 10,
                    stockStatus: 'in_stock',
                    status: 'active',
                    shortDescription: '',
                    description: '',
                    image: '/images/networking_mikrotik_hardware_1791521568663.jpg',
                  });
                  setIsAddingProduct(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shrink-0 min-h-[44px]"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Add/Edit Product Form Modal */}
            {(isAddingProduct || editingProduct) && (
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm">
                    {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Hardware Product'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="text-slate-400 hover:text-white text-xs min-h-[36px]"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={prodForm.name}
                        onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Brand Name</label>
                      <input
                        type="text"
                        required
                        value={prodForm.brand}
                        onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Category</label>
                      <select
                        value={prodForm.categoryId}
                        onChange={(e) => {
                          const catId = e.target.value as ProductItem['categoryId'];
                          const nameMap: Record<string, string> = {
                            networking: 'Networking',
                            cctv: 'CCTV',
                            computer: 'Computer',
                            'office-it': 'Office IT',
                          };
                          setProdForm({ ...prodForm, categoryId: catId, categoryName: nameMap[catId] });
                        }}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      >
                        <option value="networking">Networking</option>
                        <option value="cctv">CCTV</option>
                        <option value="computer">Computer</option>
                        <option value="office-it">Office IT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">SKU</label>
                      <input
                        type="text"
                        required
                        value={prodForm.sku}
                        onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono min-h-[40px]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Price (৳ BDT)</label>
                      <input
                        type="number"
                        min="0"
                        value={prodForm.price}
                        onChange={(e) => setProdForm({ ...prodForm, price: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono min-h-[40px]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Stock Status</label>
                      <select
                        value={prodForm.stockStatus}
                        onChange={(e) => setProdForm({ ...prodForm, stockStatus: e.target.value as ProductItem['stockStatus'] })}
                        className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="pre_order">Pre-Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Short Description</label>
                    <input
                      type="text"
                      value={prodForm.shortDescription}
                      onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Detailed Description</label>
                    <textarea
                      rows={3}
                      value={prodForm.description}
                      onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2 text-slate-400 hover:text-white min-h-[40px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 min-h-[40px]"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (৳ BDT)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-850">
                      <td className="p-4 font-bold text-white">{prod.name}</td>
                      <td className="p-4 font-mono text-slate-400">{prod.sku}</td>
                      <td className="p-4 text-slate-300">{prod.categoryName}</td>
                      <td className="p-4 font-mono text-white font-semibold">{formatBDT(prod.price)}</td>
                      <td className="p-4 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${prod.stockStatus === 'in_stock' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                          {prod.stockStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setProdForm({
                                name: prod.name,
                                slug: prod.slug,
                                categoryId: prod.categoryId,
                                categoryName: prod.categoryName,
                                brand: prod.brand,
                                sku: prod.sku,
                                price: prod.price,
                                stockQuantity: prod.stockQuantity,
                                stockStatus: prod.stockStatus,
                                status: prod.status,
                                shortDescription: prod.shortDescription,
                                description: prod.description,
                                image: prod.image,
                              });
                            }}
                            className="p-1.5 text-slate-400 hover:text-white"
                            title="Edit Product"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-red-400 hover:text-red-300"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES MANAGEMENT TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Services Directory</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage enterprise IT, Networking, DevOps, Cloud, CCTV, and AI services. Add, edit, reorder, and publish.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setIsAddingService(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm shrink-0 min-h-[40px] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {services.map((srv, idx) => (
                <div key={srv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-blue-400 text-[11px] font-semibold">{srv.categoryName}</span>
                      <span className="text-slate-600">·</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        srv.isPublished !== false
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {srv.isPublished !== false ? 'Published' : 'Unpublished'}
                      </span>
                      {srv.isFeatured && (
                        <span className="bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded text-[10px]">
                          Featured
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                    <p className="text-slate-400 line-clamp-2 leading-relaxed">{srv.shortDescription}</p>
                    <div className="text-slate-500 font-mono text-[11px] pt-1">
                      Tech: {srv.technologies.join(', ')}
                    </div>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {/* Reorder buttons */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleReorderService(srv.id, 'up')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === services.length - 1}
                      onClick={() => handleReorderService(srv.id, 'down')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>

                    {/* Publish toggle */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublishService(srv)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        srv.isPublished !== false
                          ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                      }`}
                    >
                      {srv.isPublished !== false ? 'Unpublish' : 'Publish'}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => setEditingService(srv)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-blue-400 hover:text-blue-300 cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteService(srv.id, srv.title)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-red-400 hover:text-red-300 cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACADEMY COURSES MANAGEMENT TAB (in BDT) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Techlink Academy Courses</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage courses, training modes, curriculum, and pricing in Bangladeshi Taka (৳ BDT).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingCourse(null);
                  setIsAddingCourse(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm shrink-0 min-h-[40px] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {courses.map((c, idx) => (
                <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-blue-400 text-[11px] font-semibold">{c.category} · {c.level}</span>
                      <span className="text-slate-600">·</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        c.isPublished !== false
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {c.isPublished !== false ? 'Published' : 'Hidden'}
                      </span>
                      <span className="font-mono text-xs bg-slate-950 text-emerald-400 px-2 py-0.5 rounded border border-slate-800 font-bold">
                        {formatBDT(c.price)}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{c.title}</h4>
                    <p className="text-slate-400 line-clamp-1">{c.shortDescription}</p>
                    <div className="text-slate-500 text-[11px] pt-0.5">
                      Duration: {c.duration} · Format: {c.mode} · Status: {c.status}
                    </div>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleReorderCourse(c.id, 'up')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === courses.length - 1}
                      onClick={() => handleReorderCourse(c.id, 'down')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTogglePublishCourse(c)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        c.isPublished !== false
                          ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                      }`}
                    >
                      {c.isPublished !== false ? 'Hide' : 'Publish'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingCourse(c)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-blue-400 hover:text-blue-300 cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCourse(c.id, c.title)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-red-400 hover:text-red-300 cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS PORTFOLIO TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Projects & Case Studies</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage portfolio case studies, technology stacks, GitHub links, and live demos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsAddingProject(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm shrink-0 min-h-[40px] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-blue-400 text-[11px] font-semibold">{proj.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        proj.isPublished !== false
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {proj.isPublished !== false ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{proj.name}</h4>
                    <p className="text-slate-400 line-clamp-1 leading-relaxed">{proj.overview}</p>
                    <div className="text-slate-500 font-mono text-[11px] pt-0.5">
                      Tech: {proj.technologies.join(', ')}
                    </div>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleReorderProject(proj.id, 'up')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={() => handleReorderProject(proj.id, 'down')}
                      className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTogglePublishProject(proj)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        proj.isPublished !== false
                          ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                      }`}
                    >
                      {proj.isPublished !== false ? 'Hide' : 'Publish'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingProject(proj)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-blue-400 hover:text-blue-300 cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id, proj.name)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-red-400 hover:text-red-300 cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG MANAGEMENT TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Hub & Blog</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Create and publish guides, manage drafts, categories, and SEO metadata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingBlogPost(null);
                  setIsAddingBlogPost(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm shrink-0 min-h-[40px] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800 text-xs">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-blue-400 text-[11px] font-semibold">{post.category} · {post.readTime}</span>
                      <span className="text-slate-600">·</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${
                          post.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {post.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 text-[11px]">{post.publishedAt}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{post.title}</h4>
                    <p className="text-slate-400 line-clamp-1">{post.excerpt}</p>
                    <div className="text-slate-500 font-mono text-[11px] pt-0.5">
                      Tags: {post.tags.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublishBlogPost(post)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        post.status === 'published'
                          ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                      }`}
                    >
                      {post.status === 'published' ? 'Unpublish to Draft' : 'Publish'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingBlogPost(post)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-blue-400 hover:text-blue-300 cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBlogPost(post.id, post.title)}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-red-400 hover:text-red-300 cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Website Content & Settings</h1>
              <p className="text-xs text-slate-400 mt-1">
                Centrally control website branding, homepage hero copy, buttons, section order, about details, SEO metadata, design colors, and budget options in BDT.
              </p>
            </div>

            {settingsSavedMessage && (
              <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Configuration changes saved and persisted across the entire website!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              {/* 1. Branding & Identity */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  1. Brand Identity & Header
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Site / Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.siteName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Logo Badge Letter</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={settingsForm.logoText || 'T'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Primary Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Secondary Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.secondaryTagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, secondaryTagline: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Homepage Hero Section */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  2. Homepage Hero Headline & Buttons
                </h3>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Hero Main Heading</label>
                  <input
                    type="text"
                    value={settingsForm.heroHeading || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeading: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Hero Description / Subtitle</label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroDescription || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={settingsForm.heroPrimaryBtnText || 'Get IT Service'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroPrimaryBtnText: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Secondary Button Label</label>
                    <input
                      type="text"
                      value={settingsForm.heroSecondaryBtnText || 'Explore Solutions'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSecondaryBtnText: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Section Visibility & Ordering */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  3. Homepage Sections & Order
                </h3>
                <p className="text-slate-400">
                  Toggle visibility of homepage sections and reorder them as desired.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showWhatWeDoSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showWhatWeDoSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">What We Do</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showDevOpsSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showDevOpsSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">DevOps Spotlight</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showProductsSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showProductsSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">Products Preview</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showAcademySection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showAcademySection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">Academy Courses</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showProjectsSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showProjectsSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">Projects Portfolio</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showBlogSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showBlogSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">Knowledge Hub</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showWhyUsSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showWhyUsSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">Why Choose Us</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showCtaSection !== false}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showCtaSection: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600"
                    />
                    <span className="text-slate-300">CTA Banner</span>
                  </label>
                </div>
              </div>

              {/* 4. About Us Page Content */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  4. About Us Page Story & Mission
                </h3>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">About Page Heading</label>
                  <input
                    type="text"
                    value={settingsForm.aboutTitle || 'About Techlink Assist'}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutTitle: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Vision Statement</label>
                    <textarea
                      rows={3}
                      value={settingsForm.aboutVision || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutVision: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={settingsForm.aboutMission || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutMission: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Who We Are / Company Story</label>
                  <textarea
                    rows={3}
                    value={settingsForm.aboutStory || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutStory: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                  />
                </div>
              </div>

              {/* 5. Contact Details & Business Hours */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  5. Office Contact & Operating Hours
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Official Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Telephone Contact</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Physical Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Business Hours</label>
                    <input
                      type="text"
                      value={settingsForm.businessHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Footer & Social Channels */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  6. Footer Content & Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Footer Summary Text</label>
                    <textarea
                      rows={2}
                      value={settingsForm.footerText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Copyright Notice</label>
                    <textarea
                      rows={2}
                      value={settingsForm.copyrightText || '© 2026 Techlink Assist. All rights reserved.'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, copyrightText: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Facebook URL</label>
                    <input
                      type="url"
                      value={settingsForm.facebookUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settingsForm.linkedinUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedinUrl: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={settingsForm.githubUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, githubUrl: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 7. SEO Metadata */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  7. Search Engine Optimization (SEO) Metadata
                </h3>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Default Page Title Tag</label>
                  <input
                    type="text"
                    value={settingsForm.seoTitle || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Default Meta Description</label>
                  <textarea
                    rows={2}
                    value={settingsForm.seoDescription || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Keywords</label>
                  <input
                    type="text"
                    value={settingsForm.seoKeywords || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoKeywords: e.target.value })}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white min-h-[40px]"
                  />
                </div>
              </div>

              {/* 8. Design Theme Colors */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  8. Brand Color Scheme
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Primary Brand Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.primaryBrandColor || '#2563eb'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryBrandColor: e.target.value })}
                        className="h-9 w-9 rounded bg-transparent border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.primaryBrandColor || '#2563eb'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryBrandColor: e.target.value })}
                        className="flex-1 rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white font-mono uppercase text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Secondary Brand Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.secondaryBrandColor || '#0f172a'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, secondaryBrandColor: e.target.value })}
                        className="h-9 w-9 rounded bg-transparent border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.secondaryBrandColor || '#0f172a'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, secondaryBrandColor: e.target.value })}
                        className="flex-1 rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white font-mono uppercase text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Accent Highlight Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.accentColor || '#38bdf8'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                        className="h-9 w-9 rounded bg-transparent border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.accentColor || '#38bdf8'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                        className="flex-1 rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white font-mono uppercase text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Mode & Submit */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={settingsForm.maintenanceMode}
                    onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })}
                    className="h-4 w-4 rounded bg-slate-950 border border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <div>
                    <label htmlFor="maintenanceMode" className="text-white font-semibold block cursor-pointer">
                      Enable Public Maintenance Mode
                    </label>
                    <span className="text-slate-400 text-[11px]">
                      When active, visitors see the maintenance page while administrators can still access /admin.
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 min-h-[44px] cursor-pointer"
                >
                  Save All Settings
                </button>
              </div>
            </form>

            {/* Configurable Budget Options Manager */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Service Request Budget Ranges (BDT ৳)
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Reorder, edit labels, disable or add selectable budget options for quotation requests.
                  </p>
                </div>
                <span className="font-mono text-emerald-400 text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Currency: BDT (৳)
                </span>
              </div>

              <div className="space-y-2">
                {budgetOptions.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {editingBudgetOptionId === opt.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={editingBudgetOptionLabel}
                            onChange={(e) => setEditingBudgetOptionLabel(e.target.value)}
                            className="rounded bg-slate-900 border border-slate-700 px-2.5 py-1 text-white text-xs flex-1 min-h-[34px]"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEditBudgetOption(opt.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingBudgetOptionId(null)}
                            className="px-2.5 py-1 text-slate-400 hover:text-white text-[11px] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{opt.label}</span>
                          {opt.isCustom && (
                            <span className="text-blue-400 font-mono text-[11px]">(Custom Amount Trigger)</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {/* Reorder Up/Down */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleReorderBudgetOption(opt.id, 'up')}
                        className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === budgetOptions.length - 1}
                        onClick={() => handleReorderBudgetOption(opt.id, 'down')}
                        className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>

                      {/* Edit label */}
                      {editingBudgetOptionId !== opt.id && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBudgetOptionId(opt.id);
                            setEditingBudgetOptionLabel(opt.label);
                          }}
                          className="p-1.5 rounded bg-slate-900 border border-slate-800 text-blue-400 hover:text-blue-300 cursor-pointer"
                          title="Edit label"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {/* Toggle enable */}
                      <button
                        type="button"
                        onClick={() => {
                          db.updateBudgetOption(opt.id, { isEnabled: !opt.isEnabled });
                          refreshAll();
                          showToast(`Range "${opt.label}" ${!opt.isEnabled ? 'enabled' : 'disabled'}.`);
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer ${
                          opt.isEnabled
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.isEnabled ? 'Enabled' : 'Disabled'}
                      </button>

                      {/* Delete */}
                      {!opt.isCustom && opt.id !== 'b-0' && (
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: 'Remove Budget Range',
                              message: `Are you sure you want to remove "${opt.label}"?`,
                              onConfirm: () => {
                                db.deleteBudgetOption(opt.id);
                                setConfirmModal(null);
                                refreshAll();
                                showToast('Budget range removed.');
                              },
                            });
                          }}
                          className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer"
                          title="Remove range"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Range */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add custom range (e.g. ৳150,000–৳250,000)..."
                  value={newBudgetLabel}
                  onChange={(e) => setNewBudgetLabel(e.target.value)}
                  className="flex-1 rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newBudgetLabel.trim()) return;
                    db.addBudgetOption({
                      label: newBudgetLabel.trim(),
                      value: newBudgetLabel.trim(),
                      isEnabled: true,
                      order: budgetOptions.length + 1,
                    });
                    setNewBudgetLabel('');
                    refreshAll();
                    showToast('New budget range added.');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-medium min-h-[40px] cursor-pointer"
                >
                  Add Option
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BACKUP & SUPABASE STATUS TAB */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Database & Infrastructure Ownership</h1>
              <p className="text-xs text-slate-400 mt-1">Export complete database records, inspect Supabase connection, or review PostgreSQL migration scripts.</p>
            </div>

            {/* Supabase Status Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-3">
              <h3 className="font-bold text-white text-sm">PostgreSQL / Supabase Integration Status</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Current Mode:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {supabaseStatus.mode}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The database schema is saved in <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-300 font-mono">database/schema/schema.sql</code>. To link your self-hosted or Supabase Cloud instance, specify <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-300 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-300 font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment.
              </p>
            </div>

            {/* VPS Source Code Sync & Management */}
            <div className="rounded-xl border border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-slate-900 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    <h3 className="font-bold text-white text-sm">
                      VPS Live Source Code Sync (src/data/initialData.ts)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    এডমিন প্যানেলে যেকোনো কিছু পরিবর্তন করলে তা সরাসরি সার্ভারের <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-300 font-mono">src/data/initialData.ts</code> এবং ডাটাবেজ ফাইলে আপডেট হয়ে যায়।
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleForceSync}
                    disabled={isSyncingSource}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-200 bg-blue-600/30 border border-blue-500/40 rounded-lg hover:bg-blue-600/50 transition-colors min-h-[40px] cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isSyncingSource ? 'animate-spin' : ''}`} />
                    <span>{isSyncingSource ? 'Syncing...' : 'Force Sync Now'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopySourceCode}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20 min-h-[40px] cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copiedSource ? 'Copied to Clipboard!' : 'Copy initialData.ts Code'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSourceCode}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors min-h-[40px] cursor-pointer"
                    title="Download initialData.ts file directly"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* VPS Setup & Copy-Paste Instructions in Bangla */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-blue-400 block">উপায় ১: VPS-এ স্বয়ংক্রিয় লাইভ আপডেট (Recommended)</span>
                  <p className="text-slate-300 leading-relaxed">
                    আপনার VPS-এ <code className="text-emerald-400 font-mono">npm run start</code> বা <code className="text-emerald-400 font-mono">pm2 start server.ts</code> দিয়ে চালালে, এডমিন প্যানেল থেকে সার্ভিস, প্রোডাক্ট, কোর্স, দাম বা কন্টেন্ট পরিবর্তন করলেই সাথে সাথে <code className="text-blue-300 font-mono">src/data/initialData.ts</code> ও ডাটাবেজ আপডেট হয়ে যায়। কোনো রি-বিল্ড বা রিলোড ছাড়াই সব ভিজিটর সাথে সাথে দেখতে পাবে।
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">উপায় ২: VPS কোডে সরাসরি পেস্ট করা (Manual Copy & Paste)</span>
                  <p className="text-slate-300 leading-relaxed">
                    আপনি যদি Git বা VPS-এ ফাইল সরাসরি আপডেট রাখতে চান:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400">
                    <li>উপরের <strong className="text-white">"Copy initialData.ts Code"</strong> বাটনে ক্লিক করুন।</li>
                    <li>আপনার VPS-এ <code className="text-blue-300 font-mono">src/data/initialData.ts</code> ফাইলটি খুলে পুরো কোড পেস্ট করে সেভ করুন।</li>
                    <li>বাকি সব কিছু আগের মতোই থাকবে, শুধু ডাটা মুহূর্তের মধ্যে আপডেট হয়ে যাবে!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Export JSON */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-3">
              <h3 className="font-bold text-white text-sm">Export Full System Backup (BDT Format)</h3>
              <p className="text-xs text-slate-400">
                Download a clean, structured JSON archive of all services, products, courses, blog posts, advertisements, admin users, service requests, customer records, and settings.
              </p>
              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 min-h-[44px] cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Export System Data (.json)</span>
              </button>
            </div>

            {/* Factory Reset */}
            <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6 space-y-3">
              <h3 className="font-bold text-red-300 text-sm">Reset to Initial Factory Data</h3>
              <p className="text-xs text-red-400">
                This will reset local database tables back to the default verified Techlink Assist records in BDT.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    title: 'Reset to Factory Defaults',
                    message: 'Are you sure you want to restore initial sample data? All local modifications will be replaced with defaults.',
                    onConfirm: () => {
                      db.resetToFactoryDefaults();
                      setConfirmModal(null);
                      refreshAll();
                      showToast('System reset to factory defaults.');
                    },
                  });
                }}
                className="px-4 py-2 text-xs font-semibold text-red-300 bg-red-950 border border-red-800 rounded-lg hover:bg-red-900 transition-colors min-h-[40px] cursor-pointer"
              >
                Reset to Default Data
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODALS & POPUPS */}
      <ConfirmDialog
        isOpen={!!confirmModal?.isOpen}
        title={confirmModal?.title || ''}
        message={confirmModal?.message || ''}
        isDestructive={confirmModal?.isDestructive !== false}
        onConfirm={confirmModal?.onConfirm || (() => {})}
        onCancel={() => setConfirmModal(null)}
      />

      <ServiceEditModal
        isOpen={isAddingService || !!editingService}
        service={editingService}
        onClose={() => {
          setIsAddingService(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
      />

      <CourseEditModal
        isOpen={isAddingCourse || !!editingCourse}
        course={editingCourse}
        onClose={() => {
          setIsAddingCourse(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
      />

      <ProjectEditModal
        isOpen={isAddingProject || !!editingProject}
        project={editingProject}
        onClose={() => {
          setIsAddingProject(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      <BlogEditModal
        isOpen={isAddingBlogPost || !!editingBlogPost}
        post={editingBlogPost}
        onClose={() => {
          setIsAddingBlogPost(false);
          setEditingBlogPost(null);
        }}
        onSave={handleSaveBlogPost}
      />

      <RequestBudgetModal
        isOpen={!!budgetRequestModal}
        request={budgetRequestModal}
        budgetOptions={budgetOptions}
        onClose={() => setBudgetRequestModal(null)}
        onSave={handleSaveRequestBudget}
      />

      {/* Source Code Modal */}
      {showSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl border border-slate-800 bg-slate-900 flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">src/data/initialData.ts Source Code</h3>
                  <p className="text-[11px] text-slate-400">এই কোডটি কপি করে আপনার VPS ফাইলের ভেতর পেস্ট করে দিন</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySourceCode}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-1.5 min-h-[36px] cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copiedSource ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSourceCode}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5 min-h-[36px] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSourceModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-slate-950/70 font-mono text-xs text-slate-300">
              <pre className="whitespace-pre">{sourceCodeString || db.generateInitialDataCode()}</pre>
            </div>
            <div className="p-3 border-t border-slate-800 bg-slate-950 text-right">
              <button
                type="button"
                onClick={() => setShowSourceModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 shadow-2xl text-xs font-medium animate-fade-in">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
