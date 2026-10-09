import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ServiceRequest, BudgetOption } from '../../types';
import { formatBDT } from '../../utils/currency';

interface RequestBudgetModalProps {
  isOpen: boolean;
  request: ServiceRequest | null;
  budgetOptions: BudgetOption[];
  onClose: () => void;
  onSave: (requestId: string, budget: string, customAmount?: number) => void;
}

export const RequestBudgetModal: React.FC<RequestBudgetModalProps> = ({
  isOpen,
  request,
  budgetOptions,
  onClose,
  onSave,
}) => {
  const [selectedBudget, setSelectedBudget] = useState('No Budget Specified');
  const [customAmount, setCustomAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (request) {
      if (request.customBudgetAmount) {
        setSelectedBudget('Custom Budget');
        setCustomAmount(String(request.customBudgetAmount));
      } else {
        setSelectedBudget(request.budget || 'No Budget Specified');
        setCustomAmount('');
      }
      setErrorMsg('');
    }
  }, [request, isOpen]);

  if (!isOpen || !request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let finalBudget = selectedBudget;
    let numericAmount: number | undefined = undefined;

    if (selectedBudget === 'Custom Budget') {
      const parsed = parseFloat(customAmount);
      if (isNaN(parsed) || parsed < 0) {
        setErrorMsg('Please enter a valid positive amount in Bangladeshi Taka (BDT ৳).');
        return;
      }
      numericAmount = parsed;
      finalBudget = `Custom Budget (${formatBDT(parsed)})`;
    }

    onSave(request.id, finalBudget, numericAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Edit Request Budget</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Client: <span className="text-slate-200 font-medium">{request.name}</span> ({request.company})
          </p>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Estimated Budget (Optional)
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
            >
              {budgetOptions.map((opt) => (
                <option key={opt.id} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {selectedBudget === 'Custom Budget' && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <label className="block text-slate-300 font-medium">
                Custom Budget Amount in Bangladeshi Taka (৳ BDT)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-blue-400 font-bold font-mono">৳</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  required
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 75000"
                  className="w-full rounded bg-slate-900 border border-slate-700 pl-8 pr-3 py-2 text-white font-mono min-h-[40px]"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-colors min-h-[38px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[38px]"
            >
              <Check className="h-4 w-4" />
              <span>Update Budget</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
