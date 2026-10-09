-- ==============================================================================
-- TECHLINK ASSIST - DATABASE INITIAL SEED
-- ==============================================================================

INSERT INTO public.site_settings (
  site_name, tagline, secondary_tagline, phone, email, address, business_hours, footer_text
) VALUES (
  'Techlink Assist',
  'Smart Technology Solutions for Businesses & Professionals',
  'IT • Networking • DevOps • Cloud • Security • AI Automation',
  '+1 (555) 234-8900',
  'contact@techlinkassist.com',
  'Suite 400, Techlink Business Center, Metropolitan Tech District',
  'Monday – Saturday: 9:00 AM – 7:00 PM EST (24/7 On-call Support for SLA Clients)',
  'Techlink Assist delivers dependable enterprise IT infrastructure, MikroTik networking, DevOps automation, cloud architecture, and security systems.'
) ON CONFLICT DO NOTHING;

-- Initial Services
INSERT INTO public.services (slug, title, category, category_name, short_description, overview, problem, solution, features, technologies, is_featured) VALUES
('it-support-infrastructure', 'IT Support & Infrastructure', 'it-infrastructure', 'IT & Infrastructure', 'Enterprise workstation management, Windows Server, Active Directory, and dependable office IT systems.', 'Techlink Assist architects, installs, and manages solid IT infrastructure.', 'Slow computers, unmanaged credentials, and frequent crashes.', 'End-to-end administration including Active Directory, automated patches, and fast desk support.', '["Active Directory Domain Services", "Group Policy Enforcement", "Automated Software Deployment"]'::jsonb, '["Windows Server 2022", "Active Directory", "PowerShell"]'::jsonb, true),
('enterprise-networking', 'Network Solutions & MikroTik', 'network-solutions', 'Network Solutions', 'LAN/WAN engineering, MikroTik RouterOS routing, VLAN segregation, and bandwidth optimization.', 'High-availability computer networks engineered for throughput.', 'Uncontrolled network congestion and lack of line failover.', 'Segmented network topologies with MikroTik RouterOS and dual-WAN failover.', '["MikroTik RouterOS multi-WAN", "VLAN 802.1Q Segregation", "WireGuard VPN Tunnels"]'::jsonb, '["MikroTik RouterOS", "WireGuard", "UniFi"]'::jsonb, true),
('devops-and-cloud', 'DevOps & Cloud Architecture', 'devops-cloud', 'DevOps & Cloud', 'Linux server administration, GitHub Actions CI/CD pipelines, Docker, and AWS cloud infrastructure.', 'Streamline software releases and achieve scalable server infrastructure.', 'Manual error-prone server deployments and software crashes.', 'Automated CI/CD pipelines with GitHub Actions and containerized Docker applications.', '["Hardened Linux server setup", "GitHub Actions CI/CD", "Docker containerization", "AWS Cloud"]'::jsonb, '["Linux", "Docker", "Kubernetes", "AWS", "GitHub Actions"]'::jsonb, true)
ON CONFLICT (slug) DO NOTHING;
