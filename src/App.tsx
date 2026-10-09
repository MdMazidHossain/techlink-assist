import React, { useState, useEffect } from 'react';
import { db } from './services/db';
import {
  ServiceItem,
  ProductItem,
  CourseItem,
  ProjectItem,
  BlogPostItem,
  SiteSettings,
} from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MaintenancePage } from './components/common/MaintenancePage';
import { NotFoundPage } from './components/common/NotFoundPage';
import { HomePage } from './components/home/HomePage';
import { ServicesPage } from './components/services/ServicesPage';
import { ProductsPage } from './components/products/ProductsPage';
import { CoursesPage } from './components/courses/CoursesPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { BlogPage } from './components/blog/BlogPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServiceRequestModal } from './components/modals/ServiceRequestModal';
import { ProductQuoteModal } from './components/modals/ProductQuoteModal';
import { CourseEnrollModal } from './components/modals/CourseEnrollModal';
import { TechlinkAssistantDrawer } from './components/ai/TechlinkAssistantDrawer';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );

  // Reactive DB entities
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [services, setServices] = useState<ServiceItem[]>(db.getServices());
  const [products, setProducts] = useState<ProductItem[]>(db.getProducts());
  const [courses, setCourses] = useState<CourseItem[]>(db.getCourses());
  const [projects, setProjects] = useState<ProjectItem[]>(db.getProjects());
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(db.getBlogPosts());

  // Modals & Drawers state
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<ProductItem | null>(null);

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<CourseItem | null>(null);

  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Sync DB changes
  useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      setSettings(db.getSettings());
      setServices(db.getServices());
      setProducts(db.getProducts());
      setCourses(db.getCourses());
      setProjects(db.getProjects());
      setBlogPosts(db.getBlogPosts());
    });
    return unsubscribe;
  }, []);

  // Listen to popstate for back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.split('?')[0];
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceRequest = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setServiceModalOpen(true);
  };

  const handleOpenProductQuote = (product: ProductItem) => {
    setSelectedProductForQuote(product);
    setQuoteModalOpen(true);
  };

  const handleOpenCourseEnroll = (course: CourseItem) => {
    setSelectedCourseForEnroll(course);
    setEnrollModalOpen(true);
  };

  // If in maintenance mode and NOT in /admin, show Maintenance Page
  if (settings.maintenanceMode && currentPath !== '/admin') {
    return (
      <MaintenancePage
        settings={settings}
        onAdminLogin={() => navigate('/admin')}
      />
    );
  }

  // If admin route
  if (currentPath === '/admin') {
    return (
      <AdminDashboard
        onClose={() => navigate('/')}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Determine Main View
  const renderView = () => {
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const catQuery = searchParams.get('cat') || undefined;

    switch (currentPath) {
      case '/':
      case '/home':
        return (
          <HomePage
            onNavigate={navigate}
            onRequestService={handleOpenServiceRequest}
            onRequestProductQuote={handleOpenProductQuote}
            onEnrollCourse={handleOpenCourseEnroll}
            featuredServices={services.filter((s) => s.isFeatured)}
            featuredProducts={products}
            featuredCourses={courses}
            featuredProjects={projects}
            featuredBlogPosts={blogPosts}
            settings={settings}
          />
        );
      case '/services':
        return (
          <ServicesPage
            services={services}
            selectedCategoryQuery={catQuery}
            onRequestService={handleOpenServiceRequest}
          />
        );
      case '/products':
        return (
          <ProductsPage
            products={products}
            onRequestQuote={handleOpenProductQuote}
          />
        );
      case '/courses':
        return (
          <CoursesPage
            courses={courses}
            onEnrollCourse={handleOpenCourseEnroll}
          />
        );
      case '/projects':
        return (
          <ProjectsPage
            projects={projects}
            onRequestService={handleOpenServiceRequest}
          />
        );
      case '/blog':
        return <BlogPage posts={blogPosts} />;
      case '/about':
        return (
          <AboutPage
            onNavigate={navigate}
            onRequestService={() => handleOpenServiceRequest()}
            settings={settings}
          />
        );
      case '/contact':
        return <ContactPage settings={settings} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Contract Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onRequestService={handleOpenServiceRequest}
        onOpenAssistant={() => setAiAssistantOpen(true)}
        settings={settings}
      />

      {/* Main Content */}
      <main className="flex-1">{renderView()}</main>

      {/* Unified Footer */}
      <Footer onNavigate={navigate} settings={settings} />

      {/* Floating "Ask Techlink AI" Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-xl shadow-blue-600/40 transition-all hover:scale-105"
          aria-label="Ask Techlink AI"
        >
          <Sparkles className="h-4 w-4" />
          <span className="whitespace-nowrap">Ask Techlink AI</span>
        </button>
      </div>

      {/* Modals & Slide-out Drawers */}
      <ServiceRequestModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        preselectedService={preselectedService}
      />

      <ProductQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        product={selectedProductForQuote}
      />

      <CourseEnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        course={selectedCourseForEnroll}
      />

      <TechlinkAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onRequestService={handleOpenServiceRequest}
        onNavigate={navigate}
      />
    </div>
  );
}
