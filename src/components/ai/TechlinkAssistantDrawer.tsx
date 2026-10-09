import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  Network,
  Server,
  Cloud,
  GraduationCap,
  ShoppingBag,
  ArrowRight,
  Info,
} from 'lucide-react';

interface TechlinkAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestService: (serviceName?: string) => void;
  onNavigate: (path: string) => void;
}

interface QuickTopic {
  category: string;
  icon: React.ElementType;
  title: string;
  guidance: string;
  recommendedAction: string;
  actionType: 'service' | 'course' | 'products';
  actionTarget: string;
}

const KNOWLEDGE_TOPICS: QuickTopic[] = [
  {
    category: 'Network Help',
    icon: Network,
    title: 'MikroTik Multi-WAN & Failover Setup',
    guidance:
      'For seamless dual-ISP failover on RouterOS v7, configure recursive routing checks using check-gateway=ping against external DNS resolvers (e.g. 8.8.8.8 and 1.1.1.1). Pair this with PCC load balancing to distribute staff bandwidth evenly without session disconnects.',
    recommendedAction: 'Request Network Solution',
    actionType: 'service',
    actionTarget: 'Network Solutions & MikroTik',
  },
  {
    category: 'DevOps Help',
    icon: Cloud,
    title: 'Containerization & GitHub Actions Pipelines',
    guidance:
      'Always utilize multi-stage Docker builds to keep runtime containers lean (under 60MB). Enforce non-root execution and verify dependencies with automated security vulnerability scanning during GitHub Actions pull-request checks.',
    recommendedAction: 'Explore DevOps & Cloud Services',
    actionType: 'service',
    actionTarget: 'DevOps & Cloud Architecture',
  },
  {
    category: 'IT Support',
    icon: Server,
    title: 'Active Directory Domain Controller Health',
    guidance:
      'Ensure at least two redundant Domain Controllers exist on separate hypervisors. Audit replication health using repadmin /replsummary and verify that DNS forwarders and DHCP option 006 point strictly to local DCs, never external IPs.',
    recommendedAction: 'Schedule IT Infrastructure Audit',
    actionType: 'service',
    actionTarget: 'IT Support & Infrastructure',
  },
  {
    category: 'Find a Course',
    icon: GraduationCap,
    title: 'Best Roadmap for Junior Engineers',
    guidance:
      'We recommend beginning with "Enterprise Networking & MikroTik RouterOS Mastery" followed immediately by "Linux Server Administration for Modern DevOps". This foundation allows you to transition into cloud and container engineering with confidence.',
    recommendedAction: 'View Techlink Academy Courses',
    actionType: 'course',
    actionTarget: '/courses',
  },
  {
    category: 'Find a Product',
    icon: ShoppingBag,
    title: 'Recommended Router for 50+ Workstations',
    guidance:
      'The MikroTik RB5009UG+S+IN provides quad-core ARM processing, 10G SFP+ uplink capability, and 1GB DDR4 RAM, making it the most cost-effective enterprise router for 50-150 office users with dual gigabit internet lines.',
    recommendedAction: 'Check MikroTik RB5009 in Products',
    actionType: 'products',
    actionTarget: '/products',
  },
];

export const TechlinkAssistantDrawer: React.FC<TechlinkAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onRequestService,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<QuickTopic | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'IT Support', 'Network Help', 'DevOps Help', 'Find a Course', 'Find a Product'];

  const filteredTopics = KNOWLEDGE_TOPICS.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesQuery =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.guidance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    // Intelligent triage matching
    const q = userQuery.toLowerCase();
    if (q.includes('mikrotik') || q.includes('vlan') || q.includes('router') || q.includes('network') || q.includes('wifi')) {
      setCustomResponse(
        `For network & routing inquiries regarding "${userQuery.trim()}": Techlink Assist specializes in MikroTik RouterOS v7 setups, VLAN segregation, and automated line failovers. Our engineering team can perform a site audit or configure your network remotely.`
      );
    } else if (q.includes('docker') || q.includes('devops') || q.includes('cloud') || q.includes('aws') || q.includes('kubernetes')) {
      setCustomResponse(
        `For DevOps & Cloud inquiries regarding "${userQuery.trim()}": We build automated CI/CD pipelines, containerize applications, and maintain AWS server infrastructure with 24/7 monitoring.`
      );
    } else if (q.includes('cctv') || q.includes('camera') || q.includes('security') || q.includes('nvr')) {
      setCustomResponse(
        `For physical security inquiries regarding "${userQuery.trim()}": We supply commercial 4K PoE IP cameras, 60-day retention NVR systems, and biometric server room access controllers.`
      );
    } else if (q.includes('course') || q.includes('learn') || q.includes('training') || q.includes('class')) {
      setCustomResponse(
        `Techlink Assist Academy offers hands-on courses in Networking, MikroTik RouterOS, Linux Administration, and Docker/Kubernetes. You can enroll with flexible live and lab sessions.`
      );
    } else {
      setCustomResponse(
        `Thank you for your inquiry regarding "${userQuery.trim()}". For customized technology engineering, please submit a service request or contact our operations desk directly.`
      );
    }
  };

  const handleActionClick = (topic: QuickTopic) => {
    onClose();
    if (topic.actionType === 'service') {
      onRequestService(topic.actionTarget);
    } else if (topic.actionType === 'course') {
      onNavigate('/courses');
    } else if (topic.actionType === 'products') {
      onNavigate('/products');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Techlink Smart Assistant</h3>
              <p className="text-xs text-slate-400">Technical Triage & Solution Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Integration notice banner */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 py-2 text-xs text-slate-400 flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <span>Architecture ready: Gemini API or custom endpoints can be bound via environment variables.</span>
        </div>

        {/* Category Filter Tabs */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedTopic(null);
                setCustomResponse(null);
              }}
              className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {customResponse ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800 text-slate-200">
                <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Technical Triage Result</span>
                </div>
                <p className="leading-relaxed">{customResponse}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onRequestService();
                  }}
                  className="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Request Service Consultation
                </button>
                <button
                  onClick={() => setCustomResponse(null)}
                  className="px-3 py-2 bg-slate-800 text-slate-300 rounded-lg hover:text-white"
                >
                  Ask Another Question
                </button>
              </div>
            </div>
          ) : selectedTopic ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                ← Back to topics
              </button>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <selectedTopic.icon className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-slate-300">{selectedTopic.category}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{selectedTopic.title}</h4>
                <p className="text-slate-300 leading-relaxed">{selectedTopic.guidance}</p>
                <div className="pt-2">
                  <button
                    onClick={() => handleActionClick(selectedTopic)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <span>{selectedTopic.recommendedAction}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-slate-400 font-medium">Quick Technology Triage:</div>
              {filteredTopics.map((topic, i) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedTopic(topic)}
                    className="w-full text-left p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-950 transition-colors flex items-start gap-3"
                  >
                    <div className="p-2 rounded-md bg-slate-900 text-blue-400 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">{topic.category}</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{topic.title}</div>
                      <div className="text-slate-400 line-clamp-1 mt-1">{topic.guidance}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form onSubmit={handleAsk} className="flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask about MikroTik, Linux, CCTV, Cloud, or Courses..."
              className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors shrink-0"
              aria-label="Send question"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Techlink Knowledge Engine</span>
            <button
              onClick={() => {
                onClose();
                onRequestService();
              }}
              className="text-blue-400 hover:underline"
            >
              Need human technician?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
