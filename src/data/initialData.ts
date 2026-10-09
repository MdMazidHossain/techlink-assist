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
} from '../types';

export const initialSettings: SiteSettings = {
  "siteName": "Techlink Assist",
  "tagline": "Smart Technology Solutions for Businesses & Professionals - Verified VPS Live Sync",
  "secondaryTagline": "IT • Networking • DevOps • Cloud • Security • AI Automation",
  "logoText": "T",
  "logoUrl": "",
  "faviconUrl": "",
  "heroHeading": "Smart Technology Solutions for Businesses & Professionals",
  "heroDescription": "Reliable IT infrastructure, networking, DevOps, cloud, security, AI automation and digital solutions designed to help businesses work smarter and grow faster.",
  "heroPrimaryBtnText": "Get IT Service",
  "heroSecondaryBtnText": "Explore Solutions",
  "phone": "+880 1712-345678",
  "email": "contact@techlinkassist.com",
  "address": "Level 8, Techlink Tower, Panthapath, Dhaka 1205, Bangladesh",
  "businessHours": "Saturday – Thursday: 9:00 AM – 7:00 PM BST (24/7 On-call Support for SLA Clients)",
  "footerText": "Techlink Assist delivers dependable enterprise IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, and security systems.",
  "copyrightText": "© 2026 Techlink Assist. All rights reserved. Registered Technology Enterprise in Bangladesh.",
  "facebookUrl": "https://facebook.com/techlinkassist",
  "linkedinUrl": "https://linkedin.com/company/techlinkassist",
  "youtubeUrl": "https://youtube.com/@techlinkassist",
  "githubUrl": "https://github.com/techlinkassist",
  "twitterUrl": "https://twitter.com/techlinkassist",
  "maintenanceMode": false,
  "currency": "BDT",
  "currencySymbol": "৳",
  "aboutTitle": "About Techlink Assist",
  "aboutStory": "Techlink Assist is an integrated technology solutions provider. Unlike typical computer repair shops, Techlink Assist functions as a full-spectrum systems engineering partner. Our operational coverage spans corporate IT infrastructure, multi-gigabit routing with MikroTik RouterOS, automated CI/CD cloud pipelines, high-definition IP camera surveillance, and practical training through Techlink Assist Academy.",
  "aboutVision": "To provide practical, reliable and innovative technology solutions for businesses and professionals—enabling organizations to operate without unexpected downtime and empowering engineers with hands-on technical skills.",
  "aboutMission": "To bridge the gap between high-level IT architecture and daily business operations. We prioritize measurable reliability, clear documentation, client ownership of all digital assets, and zero dependency on opaque black-box vendor lock-in.",
  "seoTitle": "Techlink Assist | Smart Technology Solutions for Businesses & Professionals",
  "seoDescription": "Reliable IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, CCTV surveillance, and technology training academy in Bangladesh.",
  "seoKeywords": "IT Support, MikroTik RouterOS, DevOps, Cloud, CCTV, Techlink Assist, Dhaka Bangladesh, Networking, BDT",
  "showWhatWeDoSection": true,
  "showDevOpsSection": true,
  "showProductsSection": true,
  "showAcademySection": true,
  "showProjectsSection": true,
  "showBlogSection": true,
  "heroTagline": "ENTERPRISE SYSTEMS & DIGITAL ENGINEERING",
  "heroTrustBadges": [
    "24/7 Monitored SLAs",
    "MikroTik Certified Engineers",
    "100% Hardware Ownership",
    "Zero Vendor Lock-in"
  ],
  "primaryColor": "#2563eb",
  "accentColor": "#38bdf8",
  "enableAIChat": true,
  "currencyCode": "BDT"
};

export const initialBudgetOptions: BudgetOption[] = [
  {
    "id": "b-0",
    "label": "No Budget Specified",
    "value": "No Budget Specified",
    "isEnabled": true,
    "order": 1
  },
  {
    "id": "b-1",
    "label": "Under ৳5,000",
    "value": "Under ৳5,000",
    "isEnabled": true,
    "order": 2
  },
  {
    "id": "b-2",
    "label": "৳5,000–৳10,000",
    "value": "৳5,000–৳10,000",
    "isEnabled": true,
    "order": 3
  },
  {
    "id": "b-3",
    "label": "৳10,000–৳25,000",
    "value": "৳10,000–৳25,000",
    "isEnabled": true,
    "order": 4
  },
  {
    "id": "b-4",
    "label": "৳25,000–৳50,000",
    "value": "৳25,000–৳50,000",
    "isEnabled": true,
    "order": 5
  },
  {
    "id": "b-5",
    "label": "৳50,000–৳100,000",
    "value": "৳50,000–৳100,000",
    "isEnabled": true,
    "order": 6
  },
  {
    "id": "b-6",
    "label": "৳100,000+",
    "value": "৳100,000+",
    "isEnabled": true,
    "order": 7
  },
  {
    "id": "b-7",
    "label": "Custom Budget",
    "value": "Custom Budget",
    "isCustom": true,
    "isEnabled": true,
    "order": 8
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    "id": "admin-owner",
    "email": "admin@techlinkassist.com",
    "fullName": "Mazid (Primary Owner)",
    "role": "Super Admin",
    "isActive": true,
    "isOwner": true,
    "permissions": {
      "canManageProducts": true,
      "canManageServices": true,
      "canManageCourses": true,
      "canManageProjects": true,
      "canManageBlog": true,
      "canManageRequests": true,
      "canManageCustomers": true,
      "canManageAdvertisements": true,
      "canManageSettings": true,
      "canManageUsers": true
    },
    "createdAt": "2026-09-01T00:00:00Z"
  },
  {
    "id": "admin-support",
    "email": "support@techlinkassist.com",
    "fullName": "Operations Desk Officer",
    "role": "Support Agent",
    "isActive": true,
    "isOwner": false,
    "permissions": {
      "canManageProducts": false,
      "canManageServices": false,
      "canManageCourses": false,
      "canManageProjects": false,
      "canManageBlog": false,
      "canManageRequests": true,
      "canManageCustomers": true,
      "canManageAdvertisements": false,
      "canManageSettings": false,
      "canManageUsers": false
    },
    "createdAt": "2026-09-15T00:00:00Z"
  }
];

export const initialAdvertisements: Advertisement[] = [
  {
    "id": "ad-1",
    "advertiserName": "FiberNet Business Connect",
    "campaignName": "Dedicated Corporate Fiber 100Mbps",
    "title": "High-Speed Enterprise Dedicated Leased Line Internet",
    "bannerUrl": "/images/hero_tech_infrastructure_1791521523767.jpg",
    "destinationUrl": "https://techlinkassist.com/contact",
    "placement": "homepage_bottom",
    "status": "active",
    "startDate": "2026-09-01",
    "endDate": "2026-12-31",
    "agreedFeeBDT": 25000,
    "contactInfo": "corporate@fibernet.com.bd",
    "impressions": 1420,
    "clicks": 86,
    "showOnDesktop": true,
    "showOnMobile": true,
    "priority": 1,
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "ad-2",
    "advertiserName": "CloudSafe BD Backup",
    "campaignName": "Ransomware Defense for Linux & Windows",
    "title": "Secure Cloud Backup & Disaster Recovery for Bangladeshi Businesses",
    "bannerUrl": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "destinationUrl": "https://techlinkassist.com/services",
    "placement": "blog_bottom",
    "status": "active",
    "startDate": "2026-09-15",
    "endDate": "2026-11-30",
    "agreedFeeBDT": 18000,
    "contactInfo": "sales@cloudsafe.bd",
    "impressions": 980,
    "clicks": 52,
    "showOnDesktop": true,
    "showOnMobile": true,
    "priority": 1,
    "createdAt": "2026-09-15T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  }
];

export const initialAdNetworkConfig: AdNetworkConfig = {
  "enabled": false,
  "publisherId": "",
  "autoAdsEnabled": false,
  "privacyConsentRequired": true
};

export const initialServices: ServiceItem[] = [
  {
    "id": "srv-1",
    "slug": "it-support-infrastructure",
    "title": "IT Support & Infrastructure",
    "category": "it-infrastructure",
    "categoryName": "IT & Infrastructure",
    "shortDescription": "Enterprise workstation management, Windows Server, Active Directory, DNS/DHCP, and dependable office IT systems.",
    "overview": "Techlink Assist architects, installs, and manages solid IT infrastructure that keeps your business running smoothly without unexpected downtime.",
    "problem": "Slow computers, unmanaged user credentials, frequent system crashes, unpatched vulnerabilities, and disjointed office hardware that stall team productivity.",
    "solution": "End-to-end administration including centralized Active Directory domain controllers, automated patch deployments, fast tier-1/tier-2 desk support, and standardized hardware deployment.",
    "features": [
      "Active Directory Domain Services (AD DS) design and implementation",
      "Group Policy Objects (GPO) for enterprise security enforcement",
      "Automated OS installation and software deployment pipelines",
      "Hardware diagnostics, repair, and vendor asset lifecycle tracking",
      "Fast remote desktop support and on-premise technician dispatch",
      "Disaster recovery planning and endpoint backup automation"
    ],
    "technologies": [
      "Windows Server 2022",
      "Active Directory",
      "Group Policy",
      "PowerShell",
      "Veeam Backup",
      "Microsoft 365 Admin"
    ],
    "process": [
      "Site & Network Audit: Comprehensive evaluation of existing machines, servers, and cabling.",
      "Architecture & Policy Plan: Formulate domain structure, naming standards, and permission matrices.",
      "Staging & Deployment: Server deployment, client onboarding, and automated software rollouts.",
      "Ongoing SLA Maintenance: Real-time health monitoring, patch cycles, and rapid issue resolution."
    ],
    "benefits": [
      "Predictable operational continuity with minimal employee downtime",
      "Robust access control preventing unauthorized data exposure",
      "Standardized computer setup across departments and branches"
    ],
    "faq": [
      {
        "question": "Do you offer monthly IT maintenance contracts?",
        "answer": "Yes, we provide flexible SLA contracts with defined response times, routine health inspections, and preventative maintenance."
      },
      {
        "question": "Can you migrate our legacy Windows Server to newer versions?",
        "answer": "Yes, we handle complete domain controller migrations, file server permissions transfers, and DHCP/DNS role reassignments without data loss."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-2",
    "slug": "enterprise-networking",
    "title": "Network Solutions & MikroTik",
    "category": "network-solutions",
    "categoryName": "Network Solutions",
    "shortDescription": "LAN/WAN engineering, MikroTik RouterOS routing, VLAN segregation, secure VPN tunnels, and bandwidth optimization.",
    "overview": "High-availability computer networks engineered for throughput, fault tolerance, and security across single offices and multi-branch operations.",
    "problem": "Uncontrolled network congestion, intermittent Wi-Fi drops, flat networks exposing sensitive servers to visitor devices, and lack of line failover.",
    "solution": "Segmented network topologies with MikroTik RouterOS, dual-WAN multi-path failover, QoS queues prioritizing business VoIP/video, and IPSec site-to-site tunnels.",
    "features": [
      "MikroTik RouterOS multi-WAN load balancing and automated failover (PCC & ECMP)",
      "VLAN segmentation separating guest Wi-Fi, staff, IP cameras, and server racks",
      "Site-to-site WireGuard, OpenVPN, and IPSec VPN tunnels between branch offices",
      "Queue Trees & PCQ bandwidth management to prevent video stream buffering",
      "Managed Gigabit/10G switch trunking and link aggregation (LACP)",
      "Enterprise Wi-Fi controller roaming setups with seamless coverage maps"
    ],
    "technologies": [
      "MikroTik RouterOS",
      "WireGuard",
      "Cisco IOS",
      "Ubiquiti UniFi",
      "VLAN 802.1Q",
      "Wireshark"
    ],
    "process": [
      "Spectrum & Traffic Analysis: Inspect packet drops, link bandwidth, and layout bottlenecks.",
      "Topology Drafting: Design subnet architecture, VLAN tables, and routing tables.",
      "Hardware Configuration: RouterOS scripting, firewall rules, port security, and testing.",
      "Cutover & Documentation: Night cutover to avoid downtime, followed by complete topology documentation."
    ],
    "benefits": [
      "Zero downtime during primary ISP outages through automated failover",
      "Isolated CCTV and IoT camera traffic preventing lateral intrusion",
      "Smooth conference calls and VoIP quality even during large downloads"
    ],
    "faq": [
      {
        "question": "Why do you recommend MikroTik for business networks?",
        "answer": "MikroTik delivers enterprise-grade routing, robust firewall filtering, and packet control at an unmatched cost-to-performance ratio."
      },
      {
        "question": "Can remote employees securely access our internal office servers?",
        "answer": "Yes, we configure secure WireGuard or SSTP/OpenVPN user tunnels with cryptographic keys and multifactor authentication."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-3",
    "slug": "devops-and-cloud",
    "title": "DevOps & Cloud Architecture",
    "category": "devops-cloud",
    "categoryName": "DevOps & Cloud",
    "shortDescription": "Linux server administration, GitHub Actions CI/CD pipelines, Docker containers, Kubernetes, and reliable AWS cloud infrastructure.",
    "overview": "Streamline software releases and achieve scalable server infrastructure using modern infrastructure as code, automated pipelines, and cloud engineering.",
    "problem": "Manual error-prone server deployments, unrepeatable server configurations, software crashes during traffic spikes, and lack of container isolation.",
    "solution": "Automated CI/CD pipelines with GitHub Actions, containerized Docker applications, auto-scaling Kubernetes clusters, and cloud-native AWS architectures.",
    "features": [
      "Production-hardened Linux server setup (Ubuntu, Debian, Rocky Linux, RHEL)",
      "Automated Git-based CI/CD workflows using GitHub Actions and GitLab CI",
      "Docker containerization with multi-stage builds and security linting",
      "Kubernetes cluster setup and ingress controller configuration",
      "AWS cloud infrastructure: EC2, S3, RDS, VPC, CloudFront, Route53, and IAM roles",
      "Infrastructure monitoring, Prometheus alerting, and Grafana performance dashboards"
    ],
    "technologies": [
      "Linux (Ubuntu/RHEL)",
      "Git & GitHub",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Prometheus & Grafana"
    ],
    "process": [
      "Workload Review: Map application dependencies, database needs, and deployment friction.",
      "Pipeline & Container Blueprint: Dockerize services, write declarative GitHub Action workflows.",
      "Cloud Provisioning: Configure isolated VPCs, subnets, security groups, and automated backups.",
      "Observability Rollout: Deploy metrics scrapers, log aggregation, and alert notification hooks."
    ],
    "benefits": [
      "Deploy code in minutes with zero manual SSH errors",
      "Consistent environments across local development, staging, and production",
      "Elastic cloud scalability with controlled operational expenses"
    ],
    "faq": [
      {
        "question": "Can you help migrate our on-premise application to AWS?",
        "answer": "Yes, we handle complete lift-and-shift or containerized migrations including database replication, SSL provisioning, and DNS cutover."
      },
      {
        "question": "How do you ensure Linux server security?",
        "answer": "We configure SSH key-only access, UFW/iptables firewalls, Fail2ban intrusion prevention, unattended security updates, and automated audit logs."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-4",
    "slug": "cctv-and-security",
    "title": "CCTV & Physical Security Systems",
    "category": "cctv-security",
    "categoryName": "CCTV & Security",
    "shortDescription": "High-resolution IP surveillance cameras, NVR/DVR storage, remote smartphone monitoring, and biometric access control.",
    "overview": "Protect your physical facilities, equipment, and personnel with crystal-clear commercial surveillance and secure biometric door access.",
    "problem": "Blind spots around premises, blurry recordings during night incidents, full hard drives that fail to record, and unmonitored physical entry.",
    "solution": "High-definition 4K PoE IP cameras, dedicated surveillance NVRs with RAID storage, night-vision infrared sensors, and encrypted mobile remote monitoring.",
    "features": [
      "Commercial IP camera installation with Power over Ethernet (PoE) clean cabling",
      "High-capacity NVR/DVR systems with Western Digital Purple surveillance drives",
      "Smart motion detection, perimeter intrusion alerts, and AI line-crossing triggers",
      "Secure encrypted mobile viewing on iOS and Android with no public port exposure",
      "Biometric fingerprint and RFID card access control systems for server rooms",
      "Routine maintenance, lens cleaning, firmware security patching, and health checks"
    ],
    "technologies": [
      "Hikvision",
      "Dahua",
      "PoE 802.3at",
      "H.265+ Compression",
      "ZKTeco Biometrics",
      "NVR Storage Arrays"
    ],
    "process": [
      "Site Walkthrough: Assess camera angles, focal lengths, illumination, and cabling pathways.",
      "Cabling & Mounting: Structured Cat6 cabling, weatherproof outdoor mounts, and conduit protection.",
      "NVR & Storage Setup: Configure continuous and motion-triggered recording schedules.",
      "Handover & Mobile Setup: Install secure apps on manager phones, provide training and documentation."
    ],
    "benefits": [
      "24/7 visibility over corporate premises from anywhere in the world",
      "Deterrence of theft and rapid incident verification with high-frame-rate playback",
      "Strict audit trails of who accessed sensitive rooms and facilities"
    ],
    "faq": [
      {
        "question": "How many days of video footage will be retained?",
        "answer": "We calculate hard drive capacities based on your desired retention (typically 30 to 90 days) utilizing efficient H.265+ video encoding."
      },
      {
        "question": "Can we view cameras remotely when outside the office Wi-Fi?",
        "answer": "Yes, we set up secure P2P or dedicated VPN-authenticated mobile apps so you can check live streams and playback from anywhere."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-5",
    "slug": "ai-and-automation",
    "title": "AI & Business Process Automation",
    "category": "ai-automation",
    "categoryName": "AI & Automation",
    "shortDescription": "Custom workflow automation, Google Workspace & Office 365 scripts, smart AI assistants, and recruitment automation tools.",
    "overview": "Eliminate repetitive manual tasks, accelerate lead processing, and connect your business apps using modern API integrations and practical automation.",
    "problem": "Staff wasting dozens of hours copying data between spreadsheets, delayed customer responses, messy email inboxes, and manual hiring pipelines.",
    "solution": "Reliable webhook workflows, automated notification triggers, document generation bots, and smart assistant triage configured for your business.",
    "features": [
      "Automated email dispatch, lead intake parsing, and CRM data synchronization",
      "Google Workspace (Sheets, Gmail, Drive) and Office 365 process automation",
      "Automated recruitment pipelines that parse incoming resumes and schedule interviews",
      "Custom customer support triage bots integrated with Telegram, WhatsApp, or Slack",
      "Scheduled data backup scripts and automated weekly executive report generation",
      "Custom internal automation tools built with Python and modern Node.js services"
    ],
    "technologies": [
      "Python",
      "Node.js",
      "Google Apps Script",
      "REST APIs & Webhooks",
      "Docker",
      "PostgreSQL"
    ],
    "process": [
      "Workflow Diagnostic: Identify bottlenecks, manual data entry points, and repetitive steps.",
      "Integration Architecture: Map APIs, authentication tokens, and event triggers.",
      "Script Development: Build robust automation with error logging and retry mechanisms.",
      "Testing & Deployment: Run in staging with test data, then deploy to reliable server runtime."
    ],
    "benefits": [
      "Save 15+ hours per employee every week on mundane data copying",
      "Zero human entry errors in invoicing, leads, and customer registers",
      "Instant response to incoming customer requests around the clock"
    ],
    "faq": [
      {
        "question": "Do we need expensive proprietary SaaS tools for automation?",
        "answer": "Not necessarily. We build clean, lightweight automations using standard Python/Node.js scripts or Google Workspace integrations that you fully own."
      },
      {
        "question": "How do you handle failures when an external API goes down?",
        "answer": "We build exponential backoff retries, dead-letter alert notifications, and safe state recording so no data is lost."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-6",
    "slug": "web-and-digital-solutions",
    "title": "Web & Digital Solutions",
    "category": "web-solutions",
    "categoryName": "Web Solutions",
    "shortDescription": "Fast, secure, responsive corporate websites, high-converting landing pages, and scalable custom web applications.",
    "overview": "Professional web platforms built on modern frontend frameworks that load instantly, rank well on search engines, and represent your brand with authority.",
    "problem": "Slow, bloated templates that crash on mobile devices, insecure legacy CMS systems prone to malware, and websites that fail to convert visitors into clients.",
    "solution": "Custom responsive web applications engineered with React, Next.js, and Tailwind CSS with pristine typography, fast API backends, and rock-solid security.",
    "features": [
      "Custom corporate website design tailored to your specific market positioning",
      "High-conversion service landing pages with integrated quote request forms",
      "Full mobile responsiveness and accessible keyboard-navigable UI components",
      "Technical SEO optimization: JSON-LD schemas, OpenGraph cards, and fast Lighthouse scores",
      "Admin control panels for instant content, product, and blog management",
      "HTTPS security hardening, automated SSL cert renewal, and CDN edge caching"
    ],
    "technologies": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL"
    ],
    "process": [
      "Brand & Content Discovery: Clarify brand message, value props, and target audience.",
      "Interface Engineering: Build modular components with strict typography and design discipline.",
      "Backend & Form Wiring: Hook up database endpoints, email notifications, and admin portals.",
      "Deployment & Edge CDN: Deploy on high-speed global infrastructure with custom domain SSL."
    ],
    "benefits": [
      "Sub-second page loads creating positive first impressions for prospective clients",
      "Streamlined lead capture delivering verified inquiries directly to your team",
      "100% source code ownership with zero proprietary lock-in"
    ],
    "faq": [
      {
        "question": "Will we be able to edit text, products, and blog posts ourselves?",
        "answer": "Yes! We provide an intuitive, responsive admin panel where you can manage services, products, articles, and customer inquiries with ease."
      },
      {
        "question": "Do you help with domain connection and business emails?",
        "answer": "Yes, we configure your DNS records, DKIM/SPF email authentication, and custom domain routing from start to finish."
      }
    ],
    "isFeatured": true
  },
  {
    "id": "srv-7",
    "slug": "it-documentation-and-content",
    "title": "Technical Documentation & IT Knowledge",
    "category": "digital-content",
    "categoryName": "Digital & Content",
    "shortDescription": "Network topology schematics, standard operating procedures (SOPs), IT disaster recovery runbooks, and technical documentation.",
    "overview": "Ensure your business operations never rely on memory alone. We produce clear, actionable IT runbooks and infrastructure schematics.",
    "problem": "Only one person knows the server passwords and cabling layout; when they are unavailable, the entire company is paralyzed during an outage.",
    "solution": "Comprehensive infrastructure audits, network rack labeling diagrams, disaster recovery SOPs, and employee onboarding manuals.",
    "features": [
      "Visual network topology diagrams and IP address allocation spreadsheets",
      "Server credentials and recovery access procedures stored in encrypted vaults",
      "Step-by-step IT incident escalation protocols for staff and management",
      "Hardware asset inventory spreadsheets with serials, warranty dates, and MAC addresses",
      "Employee cybersecurity guidelines and safe email handling practices"
    ],
    "technologies": [
      "Markdown",
      "Draw.io / Visio",
      "GitBook",
      "Notion",
      "Bitwarden",
      "Excel / Sheets"
    ],
    "process": [
      "Discovery Interview: Walk through existing systems, roles, and historical failure modes.",
      "Mapping & Labeling: Audit physical ports, patch panels, subnets, and credentials.",
      "Document Authoring: Write clear, numbered procedures that any engineer can follow.",
      "Review & Secure Storage: Deliver source files directly into your company’s private storage."
    ],
    "benefits": [
      "Zero dependency on a single technician or external vendor",
      "Accelerated onboarding for incoming IT personnel and contractors",
      "Audit compliance for cyber insurance and corporate governance"
    ],
    "faq": [
      {
        "question": "Can you document a network that was set up by a previous vendor?",
        "answer": "Yes, reverse-engineering existing setups, discovering active subnets, and documenting unlabelled patch panels is one of our core specialties."
      }
    ]
  }
];

export const initialProducts: ProductItem[] = [
  {
    "id": "prod-1",
    "name": "MikroTik Cloud Router Switch CRS328-24P-4S+RM",
    "slug": "mikrotik-crs328-24p-4s-rm",
    "categoryId": "networking",
    "categoryName": "Networking",
    "brand": "MikroTik",
    "sku": "MT-CRS328-24P",
    "price": 58500,
    "stockQuantity": 8,
    "stockStatus": "in_stock",
    "status": "active",
    "shortDescription": "24 Gigabit PoE+ RJ45 ports and 4 SFP+ 10Gbps cage ports in a 1U rackmount chassis with Dual Boot RouterOS/SwOS.",
    "description": "The CRS328-24P-4S+RM is a 28 independent port switch with 24 Gigabit Ethernet ports offering 802.3af/at PoE+ and 4 SFP+ ports for 10Gbps fiber uplinks. Features dual power supplies for uninterrupted operation.",
    "specifications": {
      "Port Configuration": "24x 1Gbps RJ45 PoE+, 4x 10Gbps SFP+",
      "PoE Output": "802.3af/at & Passive 24V (Total 500W budget)",
      "Operating System": "RouterOS / SwOS (Dual Boot)",
      "CPU": "800 MHz ARM 32bit",
      "Form Factor": "1U Rackmount Chassis",
      "Power Supply": "Dual Redundant 100-240V AC"
    },
    "image": "/images/networking_mikrotik_hardware_1791521568663.jpg",
    "createdAt": "2026-09-15T10:00:00Z",
    "updatedAt": "2026-10-01T12:00:00Z"
  },
  {
    "id": "prod-2",
    "name": "MikroTik RB5009UG+S+IN Enterprise Router",
    "slug": "mikrotik-rb5009ug-s-in",
    "categoryId": "networking",
    "categoryName": "Networking",
    "brand": "MikroTik",
    "sku": "MT-RB5009-S",
    "price": 26500,
    "stockQuantity": 14,
    "stockStatus": "in_stock",
    "status": "active",
    "shortDescription": "Ultra-compact heavy-duty router with 7 Gigabit ports, 1x 2.5G Ethernet port, and 1x 10G SFP+ port.",
    "description": "The ultimate home-lab and small/medium enterprise router. Features a quad-core 1.4 GHz ARM CPU and 1GB DDR4 RAM, capable of handling full gigabit firewalling, WireGuard tunnels, and containerized Docker apps on RouterOS v7.",
    "specifications": {
      "CPU": "Quad-Core Marvell Armada 1.4 GHz",
      "RAM": "1 GB DDR4",
      "Ethernet Ports": "7x 1G RJ45, 1x 2.5G RJ45",
      "Fiber Uplink": "1x 10G SFP+ Cage",
      "PoE-in": "802.3af/at PoE-In on Port 1",
      "OS": "RouterOS v7 Level 5"
    },
    "image": "/images/networking_mikrotik_hardware_1791521568663.jpg",
    "createdAt": "2026-09-18T10:00:00Z",
    "updatedAt": "2026-10-02T14:00:00Z"
  },
  {
    "id": "prod-3",
    "name": "4K Ultra HD Commercial IP Dome Camera (PoE)",
    "slug": "4k-commercial-ip-dome-camera-poe",
    "categoryId": "cctv",
    "categoryName": "CCTV",
    "brand": "Hikvision / Techlink Certified",
    "sku": "CCTV-IPC-4K-DOME",
    "price": 22000,
    "stockQuantity": 22,
    "stockStatus": "in_stock",
    "status": "active",
    "shortDescription": "8MP 4K vandal-proof dome IP camera with 30m IR night vision, built-in mic, and AcuSense human/vehicle detection.",
    "description": "Designed for corporate offices, retail stores, and warehouses. IK10 vandal-proof rating, IP67 weather resistance, and smart AcuSense deep-learning algorithms that filter out false motion alarms like leaves and rain.",
    "specifications": {
      "Resolution": "8 Megapixel (3840 x 2160) @ 20fps",
      "Lens": "2.8mm fixed wide angle (107° FOV)",
      "Night Vision": "Infrared up to 30 meters (Smart IR)",
      "Audio": "Built-in microphone with noise cancellation",
      "Protection": "IP67 Weatherproof, IK10 Vandal-proof",
      "Power": "PoE 802.3af (Max 7.5W)"
    },
    "image": "/images/cctv_security_operations_1791521547732.jpg",
    "createdAt": "2026-09-20T10:00:00Z",
    "updatedAt": "2026-10-05T09:00:00Z"
  },
  {
    "id": "prod-4",
    "name": "16-Channel 4K PoE Network Video Recorder (NVR)",
    "slug": "16-channel-4k-poe-nvr-storage",
    "categoryId": "cctv",
    "categoryName": "CCTV",
    "brand": "Dahua / Techlink Certified",
    "sku": "CCTV-NVR-16P-4K",
    "price": 42500,
    "stockQuantity": 5,
    "stockStatus": "low_stock",
    "status": "active",
    "shortDescription": "16-channel NVR with 16 independent PoE interfaces, dual SATA HDD bays up to 20TB, and 4K HDMI local output.",
    "description": "Standalone surveillance recorder with plug-and-play PoE ports. Supports incoming bandwidth up to 160 Mbps, H.265+ stream compression, and instant smartphone remote viewing without complex port forwarding.",
    "specifications": {
      "Channels": "16 IP camera channels",
      "PoE Ports": "16 built-in PoE ports (130W total budget)",
      "Storage Bays": "2x SATA interfaces, up to 10TB per disk",
      "Display Out": "1x HDMI (4K), 1x VGA (1080p)",
      "Recording Bandwidth": "160 Mbps incoming",
      "Mobile App": "iOS and Android encrypted remote playback"
    },
    "image": "/images/cctv_security_operations_1791521547732.jpg",
    "createdAt": "2026-09-22T10:00:00Z",
    "updatedAt": "2026-10-06T11:00:00Z"
  },
  {
    "id": "prod-5",
    "name": "Enterprise NVMe M.2 SSD 2TB PCIe 4.0",
    "slug": "enterprise-nvme-ssd-2tb",
    "categoryId": "computer",
    "categoryName": "Computer",
    "brand": "Samsung PRO / Techlink Verified",
    "sku": "COMP-SSD-2TB-NVME",
    "price": 21000,
    "stockQuantity": 19,
    "stockStatus": "in_stock",
    "status": "active",
    "shortDescription": "Up to 7,450 MB/s read speeds, thermal heatsink, and high write endurance for workstations and servers.",
    "description": "High-reliability solid-state storage ideal for engineer workstations, local virtualization hypervisors, and data-intensive business systems. Features advanced thermal control and 1200 TBW endurance.",
    "specifications": {
      "Capacity": "2,000 GB (2TB)",
      "Sequential Read": "Up to 7,450 MB/s",
      "Sequential Write": "Up to 6,900 MB/s",
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Endurance": "1,200 TBW (Terabytes Written)",
      "Form Factor": "M.2 2280"
    },
    "image": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "createdAt": "2026-09-25T10:00:00Z",
    "updatedAt": "2026-10-04T15:00:00Z"
  },
  {
    "id": "prod-6",
    "name": "Commercial Laser Multi-Function Network Printer",
    "slug": "commercial-laser-network-printer",
    "categoryId": "office-it",
    "categoryName": "Office IT",
    "brand": "Brother / Techlink Fleet",
    "sku": "OFF-PRT-L6200-NET",
    "price": 48000,
    "stockQuantity": 6,
    "stockStatus": "in_stock",
    "status": "active",
    "shortDescription": "High-speed business monochrome duplex laser printer with Gigabit LAN, Wi-Fi, and 520-sheet paper tray.",
    "description": "Engineered for busy corporate teams requiring rapid, cost-effective document printing. Low total cost of ownership, high-yield toner options, and advanced network security features.",
    "specifications": {
      "Print Speed": "Up to 48 ppm",
      "Connectivity": "Gigabit Ethernet, Wi-Fi 802.11b/g/n, USB 2.0",
      "Duplexing": "Automatic 2-sided printing",
      "Capacity": "520-sheet standard tray (expandable to 1,610)",
      "Monthly Duty Cycle": "Up to 100,000 pages",
      "Security": "802.1x Authentication, Secure Print via PIN"
    },
    "image": "/images/hero_tech_infrastructure_1791521523767.jpg",
    "createdAt": "2026-09-28T10:00:00Z",
    "updatedAt": "2026-10-07T08:00:00Z"
  }
];

export const initialCourses: CourseItem[] = [
  {
    "id": "crs-1",
    "title": "Enterprise Networking & MikroTik RouterOS Mastery",
    "slug": "networking-mikrotik-mastery",
    "category": "Networking",
    "shortDescription": "Master routing, VLANs, multi-WAN load balancing, failover, WireGuard VPNs, and RouterOS v7 firewalling with real lab exercises.",
    "description": "This practical course takes you from fundamental packet switching to advanced enterprise routing on MikroTik RouterOS v7. You will configure real hardware and virtual CHR labs with zero fluff.",
    "level": "Intermediate",
    "duration": "6 Weeks (36 Hours Hands-on)",
    "mode": "Hands-on Lab",
    "price": 15000,
    "status": "Paid",
    "thumbnail": "/images/networking_mikrotik_hardware_1791521568663.jpg",
    "whatYouWillLearn": [
      "Subnetting, TCP/IP fundamentals, and packet flow inside RouterOS v7",
      "MikroTik bridge VLAN filtering (802.1Q) and inter-VLAN routing",
      "Dual-ISP failover and Policy-Based Routing (PBR / PCC Load Balancing)",
      "Hardened firewall filter rules, Raw tables, and DDoS connection limits",
      "Site-to-site WireGuard tunnels and secure remote access setup",
      "Bandwidth management with Queue Trees, PCQ, and Simple Queues"
    ],
    "prerequisites": [
      "Basic computer literacy and understanding of IP addresses"
    ],
    "curriculum": [
      {
        "moduleTitle": "Module 1: Foundations of IP Routing & RouterOS v7",
        "lessons": [
          "IP Addressing & Subnet Math Demystified",
          "Winbox & CLI Workflow",
          "RouterOS v7 Architecture & Default Config Cleanup"
        ]
      },
      {
        "moduleTitle": "Module 2: Bridge VLAN Filtering & Port Security",
        "lessons": [
          "VLAN 802.1Q Mechanics",
          "Configuring Bridge VLANs on CRS & RB Series",
          "Trunking to Managed Switches"
        ]
      },
      {
        "moduleTitle": "Module 3: Multi-WAN Routing & Failover Engineering",
        "lessons": [
          "Distance-based ISP Failover with Netwatch",
          "PCC (Per Connection Classifier) Load Balancing",
          "Preventing Routing Loops"
        ]
      },
      {
        "moduleTitle": "Module 4: Enterprise VPNs & Bandwidth QoS",
        "lessons": [
          "WireGuard Cryptographic Key Exchange",
          "Site-to-Site Encrypted Tunnels",
          "PCQ Bandwidth Equalizer for Offices"
        ]
      }
    ],
    "faq": [
      {
        "question": "Do I need physical MikroTik hardware to practice?",
        "answer": "No, we provide a complete virtual environment setup guide using MikroTik CHR on VMware/VirtualBox or GNS3/EVE-NG, plus lab access."
      },
      {
        "question": "Will I receive a completion certificate from Techlink Assist?",
        "answer": "Yes, students who submit and pass all hands-on configuration labs receive an authenticated Techlink Assist Academy certificate."
      }
    ],
    "instructorRole": "Certified Network Engineer & MikroTik Consultant",
    "createdAt": "2026-09-01T10:00:00Z",
    "updatedAt": "2026-10-01T10:00:00Z"
  },
  {
    "id": "crs-2",
    "title": "Linux Server Administration for Modern DevOps",
    "slug": "linux-server-administration-devops",
    "category": "DevOps & Linux",
    "shortDescription": "From bash scripting and systemd services to SSH hardening, UFW firewalling, cron automation, and performance tuning.",
    "description": "Learn the exact Linux operating system skills required to manage cloud servers, host web applications, troubleshoot crashes, and support DevOps pipelines in real production environments.",
    "level": "Beginner to Intermediate",
    "duration": "5 Weeks (30 Hours)",
    "mode": "Online Live",
    "price": 12000,
    "status": "Paid",
    "thumbnail": "/images/academy_tech_lab_1791521581547.jpg",
    "whatYouWillLearn": [
      "Linux file hierarchy, permissions (chmod, chown, SUID), and user management",
      "SSH key authentication, SSH config tunnels, and server hardening",
      "Writing custom systemd unit services and timer daemon jobs",
      "Automating server maintenance with Bash shell scripting",
      "Networking tools: netstat, ss, curl, dig, traceroute, and tcpdump",
      "Storage partitioning, LVM volume expansion, and disk health inspection"
    ],
    "prerequisites": [
      "No prior Linux experience required; terminal basics covered in week 1"
    ],
    "curriculum": [
      {
        "moduleTitle": "Module 1: The Linux Terminal & File Manipulation",
        "lessons": [
          "Navigation, Streams (stdin/stdout/stderr), and Text Filtering with grep/awk/sed",
          "User and Group Security Models",
          "Package Management on apt & dnf"
        ]
      },
      {
        "moduleTitle": "Module 2: Server Hardening & Remote Administration",
        "lessons": [
          "Key-based SSH with 2FA setup",
          "UFW and iptables Firewalls",
          "Fail2ban Intrusion Prevention"
        ]
      },
      {
        "moduleTitle": "Module 3: Systemd Services, Logging & Automation",
        "lessons": [
          "Creating Production systemd Unit Files",
          "Journalctl Log Debugging",
          "Cron Jobs vs Systemd Timers",
          "Shell Scripting for Daily Backups"
        ]
      }
    ],
    "faq": [
      {
        "question": "Which Linux distribution will be taught?",
        "answer": "We focus on Ubuntu Server LTS and Debian, with side-by-side examples on Rocky Linux / RHEL for enterprise parity."
      }
    ],
    "instructorRole": "Senior Linux Systems Administrator",
    "createdAt": "2026-09-05T10:00:00Z",
    "updatedAt": "2026-10-02T10:00:00Z"
  },
  {
    "id": "crs-3",
    "title": "Docker & Kubernetes: Containerization in Production",
    "slug": "docker-kubernetes-production",
    "category": "DevOps & Cloud",
    "shortDescription": "Build multi-stage Dockerfiles, compose multi-tier services, and orchestrate scalable deployments with Kubernetes.",
    "description": "Stop treating containers as black boxes. Learn how to write secure, minimal Docker images, network microservices, manage stateful volumes, and deploy manifests onto Kubernetes clusters.",
    "level": "Intermediate to Advanced",
    "duration": "6 Weeks (36 Hours)",
    "mode": "Hybrid",
    "price": 18000,
    "status": "Paid",
    "thumbnail": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "whatYouWillLearn": [
      "Docker engine architecture, namespaces, and cgroups fundamentals",
      "Writing optimized multi-stage Dockerfiles (sub-50MB production images)",
      "Docker Compose orchestration for databases, caches, and web APIs",
      "Kubernetes Core: Pods, Deployments, ReplicaSets, and Services",
      "Ingress Controllers, cert-manager automated SSL, and ConfigMaps/Secrets",
      "Troubleshooting failing pods using kubectl logs, describe, and exec"
    ],
    "prerequisites": [
      "Basic Linux command line knowledge"
    ],
    "curriculum": [
      {
        "moduleTitle": "Module 1: Docker Deep Dive & Image Optimization",
        "lessons": [
          "Docker Architecture",
          "Multi-stage Dockerfiles & Alpine/Distroless bases",
          "Container Networking & Volume Persistence"
        ]
      },
      {
        "moduleTitle": "Module 2: Multi-Container Stacks with Docker Compose",
        "lessons": [
          "Composing Web, Redis & Postgres Services",
          "Healthchecks & Depends_on Policies",
          "Volume Backups & Migrations"
        ]
      },
      {
        "moduleTitle": "Module 3: Kubernetes Fundamentals & Manifests",
        "lessons": [
          "K8s Architecture (Control Plane vs Worker Nodes)",
          "Deployments, Rolling Updates & Rollbacks",
          "ClusterIP, NodePort & LoadBalancer Services"
        ]
      }
    ],
    "faq": [
      {
        "question": "Do we use local Kubernetes or cloud clusters?",
        "answer": "We begin with lightweight K3s/Minikube locally, then deploy real manifests to an AWS EKS/managed Kubernetes cluster."
      }
    ],
    "instructorRole": "Cloud Solutions Architect & DevOps Lead",
    "createdAt": "2026-09-10T10:00:00Z",
    "updatedAt": "2026-10-03T10:00:00Z"
  },
  {
    "id": "crs-4",
    "title": "GitHub Actions & Modern CI/CD Automation",
    "slug": "github-actions-cicd-automation",
    "category": "DevOps & Cloud",
    "shortDescription": "Automate testing, linting, Docker image building, semantic versioning, and zero-downtime server deployments.",
    "description": "Learn to design resilient continuous integration and continuous deployment pipelines using GitHub Actions. Move from manual deployments to push-to-deploy confidence.",
    "level": "Intermediate",
    "duration": "4 Weeks (24 Hours)",
    "mode": "Self-Paced",
    "price": 9500,
    "status": "Paid",
    "thumbnail": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "whatYouWillLearn": [
      "Workflows, triggers, matrix builds, and GitHub Actions runner environments",
      "Automated pull request checks: linting, unit tests, and security scans",
      "Building and publishing Docker images to GitHub Container Registry (GHCR)",
      "Zero-downtime SSH deployments to VPS servers using GitHub Secrets",
      "Self-hosted runners and pipeline caching strategies for 5x speedups"
    ],
    "prerequisites": [
      "Basic Git experience (clone, commit, push, PR)"
    ],
    "curriculum": [
      {
        "moduleTitle": "Module 1: CI/CD Principles & GitHub Actions Core",
        "lessons": [
          "Continuous Integration vs Delivery",
          "Workflow YAML Syntax & Events",
          "Jobs, Steps, and Contexts"
        ]
      },
      {
        "moduleTitle": "Module 2: Building & Testing Automation",
        "lessons": [
          "Matrix Testing Across Node/Python Versions",
          "Automated Caching of Dependencies",
          "Security Vulnerability Scanning (Trivy)"
        ]
      },
      {
        "moduleTitle": "Module 3: Automated Production Deployments",
        "lessons": [
          "Managing Production Secrets & Environments",
          "Pushing to Registry & Deploying via Webhooks/SSH",
          "Rollback Triggers on Failure"
        ]
      }
    ],
    "faq": [
      {
        "question": "Are there practical projects in this course?",
        "answer": "Yes, you will build 3 complete pipelines: an automated test suite, a Docker publishing workflow, and a live web server auto-deployment pipeline."
      }
    ],
    "instructorRole": "DevOps & Automation Consultant",
    "createdAt": "2026-09-12T10:00:00Z",
    "updatedAt": "2026-10-04T10:00:00Z"
  },
  {
    "id": "crs-5",
    "title": "Python for IT Administrators & Network Automation",
    "slug": "python-it-network-automation",
    "category": "AI & Automation",
    "shortDescription": "Write real scripts to automate network configurations, audit active IPs, generate PDF reports, and process spreadsheets.",
    "description": "A no-nonsense Python course built strictly for system administrators and network engineers. Learn how to scrape router status, send alerts, and eliminate repetitive clerical work.",
    "level": "Beginner",
    "duration": "5 Weeks (30 Hours)",
    "mode": "Online Live",
    "price": 11500,
    "status": "Paid",
    "thumbnail": "/images/academy_tech_lab_1791521581547.jpg",
    "whatYouWillLearn": [
      "Python data structures, file handling (JSON, CSV, YAML), and error catching",
      "Paramiko and Netmiko for automated SSH commands to routers and switches",
      "Interacting with REST APIs and parsing webhook payloads",
      "Automating Google Sheets, Excel spreadsheets, and email alerts",
      "Packaging scripts into standalone executables and Docker cron jobs"
    ],
    "prerequisites": [
      "Basic IT or networking background; no previous programming required"
    ],
    "curriculum": [
      {
        "moduleTitle": "Module 1: Practical Python Syntax for Sysadmins",
        "lessons": [
          "Variables, Loops, and Functions in 3 Days",
          "Working with Files and Config Files",
          "Error Handling that Won’t Crash at 3 AM"
        ]
      },
      {
        "moduleTitle": "Module 2: Network Equipment Automation",
        "lessons": [
          "Netmiko SSH Automation",
          "Backing Up Multiple Router Configs in Seconds",
          "Validating VLAN and Interface Health"
        ]
      },
      {
        "moduleTitle": "Module 3: Webhooks & Automated Notifications",
        "lessons": [
          "Telegram & Slack Alert Bots",
          "Automating Daily IT Health Check Digests"
        ]
      }
    ],
    "faq": [
      {
        "question": "Will this help me transition to a DevOps role?",
        "answer": "Yes! Python scripting for automation is one of the most requested bridge skills when transitioning from IT support into DevOps engineering."
      }
    ],
    "instructorRole": "Automation Engineer & Python Specialist",
    "createdAt": "2026-09-14T10:00:00Z",
    "updatedAt": "2026-10-05T10:00:00Z"
  }
];

export const initialProjects: ProjectItem[] = [
  {
    "id": "proj-1",
    "name": "Enterprise Network Monitoring & Multi-WAN Failover System",
    "slug": "enterprise-network-monitoring-failover",
    "category": "Network Solutions",
    "overview": "High-availability dual-WAN corporate network infrastructure engineered for zero packet loss during ISP outages with automated alerting.",
    "problem": "Client experienced recurring 30-minute operational halts whenever their primary ISP dropped, resulting in disconnected customer VoIP calls and warehouse logistics stops.",
    "solution": "Designed and deployed MikroTik RB5009 routing with PCC load balancing, automated Netwatch script failover to secondary fiber line in under 2 seconds, and Grafana telemetry dashboards.",
    "technologies": [
      "MikroTik RouterOS v7",
      "PCC Load Balancing",
      "Netwatch Scripts",
      "Prometheus",
      "Grafana",
      "SNMP v3"
    ],
    "implementation": [
      "Installed dual Gigabit fiber uplinks from diverse carriers with diverse physical entry paths.",
      "Configured recursive routing check-gateway scripts detecting DNS reachability beyond the ISP gateway.",
      "Deployed SNMP v3 scrapers reporting port bandwidth, CPU temperatures, and drop counters.",
      "Conducted live pull-the-plug resilience tests with active Zoom calls passing over without disconnection."
    ],
    "features": [
      "Sub-2 second automated ISP failover with instant Telegram engineer alerts",
      "VLAN 802.1Q segregation isolating employee traffic, guest portals, and 32 IP cameras",
      "Real-time Grafana dashboard visualizing live bandwidth per department",
      "Encrypted WireGuard management gateway for secure out-of-band administration"
    ],
    "result": "Zero business outages over 12 consecutive months, 100% VoIP stability, and automated notification before staff notice carrier line drops.",
    "image": "/images/networking_mikrotik_hardware_1791521568663.jpg",
    "createdAt": "2026-08-15T10:00:00Z"
  },
  {
    "id": "proj-2",
    "name": "Centralized IT Service Request & Infrastructure Portal",
    "slug": "it-service-request-infrastructure-portal",
    "category": "IT Support & Systems",
    "overview": "Scalable service request management platform built for medium-sized enterprises to track hardware assets, ticket queues, and vendor SLAs.",
    "problem": "Staff relied on casual verbal requests and WhatsApp messages for IT support, causing delayed fixes, lost asset serials, and zero accountability.",
    "solution": "Engineered a unified web portal enabling instant ticket submissions, automatic technician assignment, asset warranty tracking, and manager analytics.",
    "technologies": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Docker"
    ],
    "implementation": [
      "Architected relational schema mapping employees, hardware serials, locations, and request statuses.",
      "Built responsive intake forms with category autofill and instant confirmation tokens.",
      "Created an administrative console with drag-and-drop status pipelines and notes logging.",
      "Integrated email dispatch hooks informing users when their machine is ready."
    ],
    "features": [
      "Multi-status tracking pipeline: New → Contacted → In Progress → Completed",
      "Hardware asset cross-reference linking tickets to specific workstation serials",
      "Exportable monthly resolution SLA performance reports for executives",
      "Role-based access separating public ticket submission from administrative triage"
    ],
    "result": "Reduced average support ticket resolution time from 48 hours to under 4 hours with 100% ticket audit history.",
    "image": "/images/hero_tech_infrastructure_1791521523767.jpg",
    "createdAt": "2026-08-28T10:00:00Z"
  },
  {
    "id": "proj-3",
    "name": "DevOps CI/CD Cloud Migration & Containerization",
    "slug": "devops-cicd-cloud-migration",
    "category": "DevOps & Cloud",
    "overview": "End-to-end migration of legacy monolithic client systems into containerized microservices deployed via GitHub Actions to hardened AWS EC2 instances.",
    "problem": "Developers manually uploaded files via FTP, leading to accidental file overrides, 3-hour deployment windows on weekends, and frequent runtime crashes.",
    "solution": "Re-architected the stack into multi-stage Docker containers with automated GitHub Actions pipelines, staging previews, and automated healthcheck rollbacks.",
    "technologies": [
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "AWS S3",
      "Nginx Reverse Proxy",
      "Certbot SSL",
      "Ubuntu 24.04 LTS"
    ],
    "implementation": [
      "Refactored services into Docker containers using lean Alpine and Distroless base images.",
      "Constructed GitHub Actions workflows with automated unit tests, linting, and security audits.",
      "Configured Nginx reverse proxy with HTTP/2 and auto-renewing Let’s Encrypt SSL certificates.",
      "Implemented automated database snapshots prior to each production release tag."
    ],
    "features": [
      "Push-to-deploy automated release pipeline executing in under 3 minutes",
      "Zero-downtime rolling reload via Nginx upstream swapping",
      "Comprehensive vulnerability scanning on every dependency pull request",
      "Daily encrypted off-site database backups synced to AWS S3 Glacier"
    ],
    "result": "Deployment time dropped from 180 minutes to 3.5 minutes with zero deployment-related outages.",
    "image": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "createdAt": "2026-09-02T10:00:00Z"
  },
  {
    "id": "proj-4",
    "name": "Commercial Multi-Zone CCTV & Biometric Access Deployment",
    "slug": "commercial-cctv-biometric-access-deployment",
    "category": "CCTV & Security",
    "overview": "Full physical security overhaul for a 3-story corporate headquarters including 24 IP cameras, NVR storage, and biometric door access controls.",
    "problem": "Outdated analog cameras with unreadable blurry footage and key-based door locks that allowed unauthorized entry into server rooms.",
    "solution": "Installed 4K PoE IP surveillance cameras with smart AcuSense human detection, 60-day RAID storage, and biometric fingerprint access with anti-passback rules.",
    "technologies": [
      "Hikvision 4K PoE IPC",
      "16-Channel 4K NVR",
      "ZKTeco Biometric Controllers",
      "Cat6 Shielded Cabling",
      "H.265+ Codec"
    ],
    "implementation": [
      "Ran structured Cat6 cabling through fire-rated conduits across 3 floors.",
      "Installed weatherproof perimeter cameras and indoor vandal-resistant domes.",
      "Programmed magnetic door releases with biometric fingerprint and RFID badge readers.",
      "Configured off-site backup stream sync and executive smartphone remote monitoring."
    ],
    "features": [
      "4K ultra-sharp facial and license plate identification at building entry points",
      "Strict audit log tracking every badge swipe into sensitive server rooms",
      "Automated push alerts if perimeter motion occurs between 10 PM and 6 AM",
      "Emergency door release integrated with the facility fire alarm panel"
    ],
    "result": "100% facility security coverage with zero unauthorized access incidents and rapid video export within 60 seconds.",
    "image": "/images/cctv_security_operations_1791521547732.jpg",
    "createdAt": "2026-09-12T10:00:00Z"
  }
];

export const initialBlogPosts: BlogPostItem[] = [
  {
    "id": "post-1",
    "title": "How to Configure MikroTik VLANs with Bridge VLAN Filtering on RouterOS v7",
    "slug": "how-to-configure-mikrotik-vlan",
    "excerpt": "Step-by-step practical guide to segmenting corporate networks, guest Wi-Fi, and IP cameras using standard 802.1Q bridge VLAN filtering in RouterOS v7.",
    "content": "Network segmentation is the most important defense in modern business IT. Without VLANs, a compromised guest phone or vulnerable IoT device shares the exact same broadcast domain as your financial servers and Active Directory domain controllers.\n\nIn RouterOS v7, MikroTik simplified VLAN configuration through Bridge VLAN Filtering, providing hardware offloading on supported switch chips.\n\n### Step 1: Create the Master Bridge\nEnsure you have a single bridge created with VLAN filtering initially disabled while setting up ports to prevent locking yourself out:\n```bash\n/interface bridge\nadd name=bridge1 vlan-filtering=no\n```\n\n### Step 2: Define VLAN Interfaces for Router Management\nIf the router needs to provide DHCP and gateway routing for these VLANs, create interface sub-interfaces:\n```bash\n/interface vlan\nadd interface=bridge1 name=vlan10-mgmt vlan-id=10\nadd interface=bridge1 name=vlan20-staff vlan-id=20\nadd interface=bridge1 name=vlan30-guest vlan-id=30\n```\n\n### Step 3: Assign IP Pools and DHCP Servers\nEach VLAN needs its own subnet and isolated DHCP scope:\n- Management (VLAN 10): 10.10.10.0/24\n- Staff (VLAN 20): 10.10.20.0/24\n- Guest (VLAN 30): 10.10.30.0/24\n\n### Step 4: Configure Bridge Ports & PVID\nAssign your physical ports:\n- Port 2: Trunk to Managed Switch (allows VLAN 10, 20, 30)\n- Port 3: Access port for Staff PC (PVID 20)\n- Port 4: Access port for Guest AP (PVID 30)\n\n```bash\n/interface bridge port\nadd bridge=bridge1 interface=ether2\nadd bridge=bridge1 interface=ether3 pvid=20\nadd bridge=bridge1 interface=ether4 pvid=30\n```\n\n### Step 5: Enable Bridge VLAN Filtering\nOnce your tagged and untagged members are verified, enable filtering on bridge1:\n```bash\n/interface bridge set bridge1 vlan-filtering=yes\n```\n\nBy separating guest devices from your internal server farm, you eliminate the risk of broadcast storms and unauthorized network sniffing.",
    "category": "Networking",
    "author": "Techlink Infrastructure Team",
    "status": "published",
    "featuredImage": "/images/networking_mikrotik_hardware_1791521568663.jpg",
    "readTime": "6 min read",
    "tags": [
      "MikroTik",
      "VLAN",
      "Networking",
      "RouterOS v7"
    ],
    "seoTitle": "How to Configure MikroTik VLANs on RouterOS v7 | Techlink Assist",
    "seoDescription": "Complete step-by-step engineering tutorial for configuring 802.1Q Bridge VLAN Filtering on MikroTik RouterOS v7 with clean code examples.",
    "publishedAt": "2026-09-18",
    "createdAt": "2026-09-18T10:00:00Z",
    "updatedAt": "2026-09-20T10:00:00Z"
  },
  {
    "id": "post-2",
    "title": "Linux Server Hardening: The Production Checklist for 2026",
    "slug": "linux-server-hardening-production-checklist",
    "excerpt": "Essential security measures every sysadmin must apply before exposing an Ubuntu or Debian cloud server to the public Internet.",
    "content": "When a new Linux VPS or bare-metal server is provisioned, automated malicious bots begin probing port 22 within minutes. Follow this essential hardening protocol:\n\n### 1. Disable Root Login & Password Authentication\nEdit `/etc/ssh/sshd_config`:\n```bash\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\n```\nReload the SSH daemon:\n```bash\nsudo systemctl restart sshd\n```\n\n### 2. Configure UFW Firewall Default Deny\nNever rely on application-level bind restrictions alone:\n```bash\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable\n```\n\n### 3. Install Fail2ban with Jails\nFail2ban automatically blocks IP addresses that make repeated failed login attempts:\n```bash\nsudo apt update && sudo apt install fail2ban -y\n```\n\n### 4. Enable Automatic Security Updates\nPrevent unpatched kernel and library vulnerabilities from lingering for months:\n```bash\nsudo apt install unattended-upgrades -y\nsudo dpkg-reconfigure --priority=low unattended-upgrades\n```\n\nApplying these foundational measures takes less than 15 minutes per server and blocks 99% of automated opportunistic intrusions.",
    "category": "Linux & DevOps",
    "author": "Techlink DevOps Team",
    "status": "published",
    "featuredImage": "/images/devops_cloud_datacenter_1791521536150.jpg",
    "readTime": "5 min read",
    "tags": [
      "Linux",
      "Security",
      "DevOps",
      "Ubuntu"
    ],
    "seoTitle": "Linux Server Hardening Production Checklist | Techlink Assist",
    "seoDescription": "Actionable production guide to hardening Ubuntu/Debian Linux servers: SSH keys, UFW firewall, Fail2ban, and unattended updates.",
    "publishedAt": "2026-09-24",
    "createdAt": "2026-09-24T10:00:00Z",
    "updatedAt": "2026-09-25T10:00:00Z"
  },
  {
    "id": "post-3",
    "title": "Dockerizing Applications: The 5 Multi-Stage Build Rules You Must Follow",
    "slug": "docker-multi-stage-build-rules",
    "excerpt": "How to reduce container image sizes from 1.2 GB to under 60 MB while eliminating build tools and security vulnerabilities in production.",
    "content": "Shipping compilers, test suites, and package manager caches into production containers is a common mistake that increases image pull times and inflates vulnerability scan reports.\n\n### Rule 1: Always Separate Build and Runtime Stages\nUse a full SDK image to compile code, then copy only the compiled artifacts into a lightweight runtime image:\n```dockerfile\n# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production Runtime\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/server.js\"]\n```\n\n### Rule 2: Run as Non-Root User\nBy default, Docker runs processes as root inside the container. If an application vulnerability allows arbitrary code execution, running as root makes host escape easier. Always declare `USER node` or create a dedicated service account.\n\n### Rule 3: Use .dockerignore Diligently\nNever let `node_modules`, `.git`, or local `.env` files bleed into your build context.\n\nImplementing these practices keeps your deployments fast, predictable, and resilient.",
    "category": "DevOps & Cloud",
    "author": "Techlink Cloud Engineering",
    "status": "published",
    "featuredImage": "/images/academy_tech_lab_1791521581547.jpg",
    "readTime": "4 min read",
    "tags": [
      "Docker",
      "Containers",
      "DevOps",
      "CI/CD"
    ],
    "seoTitle": "Docker Multi-Stage Build Rules for Production | Techlink Assist",
    "seoDescription": "Master Docker multi-stage builds: shrink container image sizes, eliminate build tools, and enforce non-root execution.",
    "publishedAt": "2026-10-02",
    "createdAt": "2026-10-02T10:00:00Z",
    "updatedAt": "2026-10-03T10:00:00Z"
  }
];

export const initialServiceRequests: ServiceRequest[] = [
  {
    "id": "req-1",
    "name": "David Miller",
    "company": "Apex Logistics Inc.",
    "email": "dmiller@apexlogistics.com",
    "phone": "+880 1711-223344",
    "service": "Network Solutions & MikroTik",
    "budget": "৳25,000–৳50,000",
    "message": "We have 45 warehouse workstations and 18 handheld scanners. Our current Wi-Fi drops frequently and we need dual-WAN failover with a MikroTik router setup.",
    "status": "In Progress",
    "internalNotes": "Initial site audit scheduled for Friday at 10 AM. RB5009 router and 2 UniFi APs proposed.",
    "createdAt": "2026-10-05T09:30:00Z"
  },
  {
    "id": "req-2",
    "name": "Sarah Jenkins",
    "company": "Horizon Health Clinic",
    "email": "sjenkins@horizonhealth.org",
    "phone": "+880 1912-334455",
    "service": "CCTV & Physical Security Systems",
    "budget": "৳50,000–৳100,000",
    "message": "Need 12 commercial 4K PoE IP cameras installed across patient waiting areas and pharmacy storage with 60 days of video retention.",
    "status": "New",
    "internalNotes": "Requested quote with Hikvision AcuSense domes and 16-channel NVR.",
    "createdAt": "2026-10-07T14:15:00Z"
  }
];

export const initialProductRequests: ProductRequest[] = [
  {
    "id": "preq-1",
    "customerName": "Marcus Vance",
    "productName": "MikroTik Cloud Router Switch CRS328-24P-4S+RM",
    "quantity": 2,
    "phone": "+880 1812-778899",
    "email": "mvance@vancemedia.co",
    "location": "Dhaka Tech District, Floor 8",
    "message": "Looking to purchase 2 units with rackmount ears for our server room upgrade. Need availability confirmation.",
    "status": "Contacted",
    "createdAt": "2026-10-06T11:20:00Z"
  }
];

export const initialCourseEnrollments: CourseEnrollment[] = [
  {
    "id": "enr-1",
    "studentName": "Alex Thorne",
    "email": "athorne@technet.dev",
    "phone": "+880 1612-990011",
    "courseTitle": "Enterprise Networking & MikroTik RouterOS Mastery",
    "mode": "Hands-on Lab",
    "message": "Working as junior IT support, looking to earn certification and master RouterOS v7 failover.",
    "status": "In Progress",
    "createdAt": "2026-10-04T16:00:00Z"
  }
];
