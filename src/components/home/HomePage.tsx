import React from 'react';
import {
  Server,
  Network,
  Cloud,
  ShieldCheck,
  Cpu,
  Globe,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Layers,
  GraduationCap,
  HardDrive,
  FileCode,
  Lock,
} from 'lucide-react';
import { ServiceItem, ProductItem, CourseItem, ProjectItem, BlogPostItem, SiteSettings } from '../../types';
import { formatBDT } from '../../utils/currency';
import { handleImageError } from '../../utils/imageFallback';
import { AdBanner } from '../common/AdBanner';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onRequestService: (serviceName?: string) => void;
  onRequestProductQuote: (product: ProductItem) => void;
  onEnrollCourse: (course: CourseItem) => void;
  featuredServices: ServiceItem[];
  featuredProducts: ProductItem[];
  featuredCourses: CourseItem[];
  featuredProjects: ProjectItem[];
  featuredBlogPosts: BlogPostItem[];
  settings: SiteSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestService,
  onRequestProductQuote,
  onEnrollCourse,
  featuredServices,
  featuredProducts,
  featuredCourses,
  featuredProjects,
  featuredBlogPosts,
  settings,
}) => {
  const whatWeDoCategories = [
    {
      title: 'IT & Infrastructure',
      slug: 'it-infrastructure',
      icon: Server,
      description: 'IT support, system administration, Windows Server, Active Directory, and office infrastructure.',
    },
    {
      title: 'Network Solutions',
      slug: 'network-solutions',
      icon: Network,
      description: 'LAN/WAN, MikroTik, VLAN segmentation, VPN tunnels, routing, monitoring, and bandwidth optimization.',
    },
    {
      title: 'DevOps & Cloud',
      slug: 'devops-cloud',
      icon: Cloud,
      description: 'Linux, Git, CI/CD, Docker, Kubernetes, AWS, infrastructure automation, and cloud deployments.',
    },
    {
      title: 'CCTV & Security',
      slug: 'cctv-security',
      icon: ShieldCheck,
      description: 'CCTV, IP cameras, DVR/NVR, remote surveillance monitoring, and biometric access control systems.',
    },
    {
      title: 'AI & Automation',
      slug: 'ai-automation',
      icon: Cpu,
      description: 'AI assistants, workflow automation, Google Workspace scripts, and custom business tools.',
    },
    {
      title: 'Web & Digital Solutions',
      slug: 'web-solutions',
      icon: Globe,
      description: 'High-performance business websites, web applications, landing pages, and ongoing maintenance.',
    },
  ];

  const devopsTools = [
    'Linux',
    'Git',
    'GitHub',
    'CI/CD Pipelines',
    'GitHub Actions',
    'Docker',
    'Kubernetes',
    'AWS Cloud',
    'Infrastructure Automation',
    'Prometheus & Grafana',
    'Centralized Logging',
  ];

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-10 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Enterprise Technology Engineering
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {settings.heroHeading || 'Smart Technology Solutions for Businesses & Professionals'}
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {settings.heroDescription ||
                  'Reliable IT infrastructure, networking, DevOps, cloud, security, AI automation and digital solutions designed to help businesses work smarter and grow faster.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onRequestService()}
                  className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 whitespace-nowrap min-h-[44px]"
                >
                  <span>{settings.heroPrimaryBtnText || 'Get IT Service'}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <span>{settings.heroSecondaryBtnText || 'Explore Solutions'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Verified Capability Markers */}
              <div className="pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>MikroTik & Cisco Routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>DevOps & Docker CI/CD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>4K IP CCTV & Security</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800/80 bg-slate-900 overflow-hidden shadow-2xl">
                <img
                  src="/images/hero_tech_infrastructure_1791521523767.jpg"
                  alt="Techlink Assist Enterprise Infrastructure & Datacenter Operations"
                  className="w-full h-[280px] sm:h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs">
                  <div className="font-semibold text-white">Centralized Infrastructure Operations</div>
                  <div className="text-slate-400 mt-0.5">High-availability networking, active monitoring, and zero-downtime architecture.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO SECTION */}
      {settings.showWhatWeDoSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Core Competencies
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              What We Do
            </h2>
            <p className="text-xs sm:text-base text-slate-400">
              Comprehensive technology solutions spanning physical enterprise infrastructure, automated cloud pipelines, and customized business automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whatWeDoCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.slug}
                  className="group relative rounded-xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 hover:border-blue-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(`/services?cat=${cat.slug}`)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onRequestService(cat.title)}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Request
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. DEVOPS & CLOUD PROMINENT SECTION */}
      {settings.showDevOpsSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-12 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <Terminal className="h-4 w-4" />
                  <span>Modern Infrastructure Engineering</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    DevOps & Cloud
                  </h2>
                  <div className="text-lg sm:text-2xl font-bold text-blue-400 mt-1">
                    Build. Automate. Deploy. Scale.
                  </div>
                </div>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                  Modern software demands reproducible environments and automated delivery. We architect Linux server foundations, containerized Docker applications, auto-scaling Kubernetes clusters, and zero-downtime GitHub Actions pipelines.
                </p>

                {/* Clean tool list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-xs text-slate-300">
                  {devopsTools.map((tool) => (
                    <div key={tool} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onNavigate('/services?cat=devops-cloud')}
                    className="flex items-center gap-2 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 whitespace-nowrap min-h-[44px]"
                  >
                    <span>Explore DevOps Solutions</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onRequestService('DevOps & Cloud Architecture')}
                    className="px-4 sm:px-5 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors min-h-[44px]"
                  >
                    Consult an Engineer
                  </button>
                </div>
              </div>

              {/* Right Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                  <img
                    src="/images/devops_cloud_datacenter_1791521536150.jpg"
                    alt="DevOps Automation and Cloud Server Workstation"
                    className="w-full h-[260px] sm:h-[320px] object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PRODUCTS PREVIEW (Mini E-Commerce in BDT) */}
      {settings.showProductsSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Hardware & Accessories
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Technology Products
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/products')}
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuredProducts.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="h-44 bg-slate-950 overflow-hidden relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="absolute top-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-200 border border-slate-800">
                      {prod.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span>{prod.categoryName}</span>
                      <span>·</span>
                      <span>Brand: {prod.brand}</span>
                    </div>

                    <h3 className="text-base font-bold text-white line-clamp-1">{prod.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Estimate</span>
                    <span className="text-base sm:text-lg font-bold text-white font-mono">
                      {formatBDT(prod.price)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRequestProductQuote(prod)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[40px]"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. ACADEMY PREVIEW (Courses in BDT) */}
      {settings.showAcademySection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <GraduationCap className="h-4 w-4" />
                  <span>Techlink Assist Academy</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  Learn Practical Technology. Build Real Skills.
                </h2>
              </div>
              <button
                onClick={() => onNavigate('/courses')}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featuredCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between hover:border-blue-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>{course.category}</span>
                      <span>{course.level}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {course.shortDescription}
                    </p>
                    <div className="text-xs text-slate-300 space-y-1 mb-4">
                      <div>Duration: {course.duration}</div>
                      <div>Format: {course.mode}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-white">
                      {formatBDT(course.price)}
                    </span>
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[38px]"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. PROJECTS PREVIEW */}
      {settings.showProjectsSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Verified Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Featured Projects & Portfolio
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {featuredProjects.slice(0, 2).map((proj) => (
              <div
                key={proj.id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="text-xs text-blue-400 font-medium mb-1">{proj.category}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{proj.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {proj.overview}
                  </p>
                  <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-4">
                    <span className="text-slate-400 font-medium block mb-0.5">Verified Outcome:</span>
                    <span>{proj.result}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400">{proj.technologies.slice(0, 3).join(' · ')}</div>
                  <button
                    onClick={() => onNavigate('/projects')}
                    className="font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View Blueprint →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. BLOG & KNOWLEDGE HUB PREVIEW */}
      {settings.showBlogSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Technical Guides & Articles
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Techlink Knowledge Hub
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/blog')}
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Read All Articles</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {featuredBlogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{post.publishedAt}</span>
                  <button
                    onClick={() => onNavigate('/blog')}
                    className="font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Read Article →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. ADVERTISEMENT PLACEMENT: Homepage Bottom */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdBanner placement="homepage_bottom" />
      </div>

      {/* 9. WHY TECHLINK ASSIST */}
      {settings.showWhyUsSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Our Commitments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Techlink Assist</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Engineered for organizations that require dependable infrastructure, accountable service, and clear technical communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-sm">
            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">Practical Technology Solutions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We recommend hardware and software architectures that genuinely solve business problems, avoiding over-engineered buzzwords and unnecessary license costs.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">Business-Focused Approach</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every server configured and every cable laid has a direct purpose: eliminating employee downtime, protecting confidential assets, and accelerating growth.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">Modern Technology Stacks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                From MikroTik RouterOS v7 and WireGuard cryptographic tunnels to Docker and GitHub Actions, we deploy industry-standard, battle-tested tools.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">Scalable Architectures</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Systems designed so your company can expand from 10 workstations to 200 without dismantling your existing network or starting over.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">Reliable SLA Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct access to certified engineers with defined response windows, preventative routine health checks, and transparent documentation.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="font-bold text-white text-base">100% Client Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You own all domains, source code, server credentials, and configuration files. We never trap your business in proprietary lock-in.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 10. CALL TO ACTION */}
      {settings.showCtaSection !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-900/60 bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-950 p-6 sm:p-12 text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Technology Infrastructure?
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you require an enterprise network overhaul, Windows Server domain migration, cloud deployment, or commercial CCTV security, our team is ready.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <button
                onClick={() => onRequestService()}
                className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 min-h-[44px]"
              >
                Request a Service Consultation
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white min-h-[44px]"
              >
                Contact Operations Desk
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
