import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SiteSettings, BudgetOption } from '../../types';
import { db } from '../../services/db';
import { formatBDT } from '../../utils/currency';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('IT Support');
  const [selectedBudget, setSelectedBudget] = useState('No Budget Specified');
  const [customBudgetAmount, setCustomBudgetAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>([]);

  useEffect(() => {
    setBudgetOptions(db.getBudgetOptions().filter((b) => b.isEnabled));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    let finalBudget = selectedBudget;
    let numericCustom: number | undefined = undefined;

    if (selectedBudget === 'Custom Budget') {
      const parsed = parseFloat(customBudgetAmount);
      if (isNaN(parsed) || parsed < 0) {
        setErrorMsg('Please enter a valid positive budget amount in BDT (৳).');
        return;
      }
      numericCustom = parsed;
      finalBudget = `Custom Budget (${formatBDT(parsed)})`;
    }

    setIsSubmitting(true);

    try {
      const created = db.createServiceRequest({
        name: name.trim(),
        company: company.trim() || 'Direct Client',
        email: email.trim(),
        phone: phone.trim(),
        service,
        budget: finalBudget,
        customBudgetAmount: numericCustom,
        message: message.trim(),
      });

      setSubmittedToken(created.id);
      setIsSubmitting(false);
    } catch {
      setErrorMsg('Something went wrong submitting your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setSelectedBudget('No Budget Specified');
    setCustomBudgetAmount('');
    setMessage('');
    setSubmittedToken(null);
    setErrorMsg('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Direct Communications
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Better
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Reach our engineering desk to discuss network design, cloud deployments, hardware supply, SLA contracts, or training programs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="space-y-4 text-xs sm:text-sm">
            <h2 className="text-lg font-bold text-white">Direct Office Contacts</h2>

            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Operating Location</span>
                <span>{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <Phone className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Telephone Desk</span>
                <span>{settings.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <Mail className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Official Email</span>
                <span>{settings.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <Clock className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Hours of Operation</span>
                <span>{settings.businessHours}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              <span>SLA Response Commitment</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              All formal project inquiries receive an engineer review and initial scope reply within 4 business hours.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          {submittedToken ? (
            <div className="py-10 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Message Logged Successfully</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{name}</span>. Your request has been stored under reference{' '}
                <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-200">{submittedToken}</span>. A technician will contact you via email or phone shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Send an Inquiry</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complete the form below and an engineer will reply directly.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Full Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Logistics Ltd."
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Email Address <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tanvir@company.com"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Phone Number <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1711-000000"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Service / Requirement</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none min-h-[42px]"
                    >
                      <option value="IT Support">IT Support & Windows Server</option>
                      <option value="Networking">Networking & MikroTik RouterOS</option>
                      <option value="DevOps">DevOps & CI/CD Automation</option>
                      <option value="Cloud">Cloud Architecture & AWS</option>
                      <option value="CCTV">CCTV & Physical Security</option>
                      <option value="AI Automation">AI & Workflow Automation</option>
                      <option value="Website">Website & Digital Solutions</option>
                      <option value="Product">Hardware Product Inquiry</option>
                      <option value="Training">Training / Academy Course</option>
                      <option value="Other">Other Custom Requirement</option>
                    </select>
                  </div>

                  {/* Configurable Optional Budget */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Estimated Budget (Optional)
                    </label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none min-h-[42px]"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt.id} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Budget Input */}
                {selectedBudget === 'Custom Budget' && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-blue-900/60 animate-fade-in space-y-1">
                    <label className="block text-slate-300 font-medium">
                      Enter Custom Budget Amount in Bangladeshi Taka (৳ BDT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-blue-400 font-bold font-mono">
                        ৳
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        required
                        value={customBudgetAmount}
                        onChange={(e) => setCustomBudgetAmount(e.target.value)}
                        placeholder="e.g. 50000"
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-8 pr-3 py-2 text-white font-mono focus:border-blue-500 focus:outline-none min-h-[42px]"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Amount in Bangladeshi Taka. Validated automatically.
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Message / Technical Requirements <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your project, current issues, number of users, or preferred timelines..."
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Request'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
