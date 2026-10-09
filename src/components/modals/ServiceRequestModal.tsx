import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { db } from '../../services/db';
import { BudgetOption } from '../../types';
import { formatBDT } from '../../utils/currency';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || 'IT Support & Infrastructure');
  const [selectedBudget, setSelectedBudget] = useState('No Budget Specified');
  const [customBudgetAmount, setCustomBudgetAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>([]);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      setBudgetOptions(db.getBudgetOptions().filter((b) => b.isEnabled));
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

      setSubmittedId(created.id);
      setIsSubmitting(false);
    } catch {
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setSelectedBudget('No Budget Specified');
    setCustomBudgetAmount('');
    setMessage('');
    setSubmittedId(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-8 shadow-2xl">
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedId ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Service Request Received</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{name}</span>. Your request for{' '}
              <span className="text-blue-400 font-medium">{service}</span> has been logged under reference{' '}
              <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-200">{submittedId}</span>. Our technical desk will review your scope and contact you within 4 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-white tracking-tight">Request a Technology Service</h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your infrastructure, networking, DevOps, or automation requirements.
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
                    Your Name <span className="text-blue-400">*</span>
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
                  <label className="block text-slate-300 font-medium mb-1">Service Required</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none min-h-[42px]"
                  >
                    <option value="IT Support & Infrastructure">IT Support & Infrastructure</option>
                    <option value="Network Solutions & MikroTik">Network Solutions & MikroTik</option>
                    <option value="DevOps & Cloud Architecture">DevOps & Cloud Architecture</option>
                    <option value="CCTV & Physical Security Systems">CCTV & Physical Security Systems</option>
                    <option value="AI & Business Process Automation">AI & Business Process Automation</option>
                    <option value="Web & Digital Solutions">Web & Digital Solutions</option>
                    <option value="Technical Documentation & IT Runbooks">Technical Documentation & IT Runbooks</option>
                    <option value="Hardware Procurement / Consultation">Hardware Procurement / Consultation</option>
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

              {/* Custom Budget Input if Selected */}
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
                      placeholder="e.g. 35000"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-8 pr-3 py-2 text-white font-mono focus:border-blue-500 focus:outline-none min-h-[42px]"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Amounts in Bangladeshi Taka (BDT). You may leave this blank or adjust as needed.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Project / Scope Details <span className="text-blue-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current setup, number of machines/users, pain points, or specific deadlines..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Send Service Request'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
