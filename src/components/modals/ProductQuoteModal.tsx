import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { db } from '../../services/db';
import { ProductItem } from '../../types';
import { formatBDT } from '../../utils/currency';

interface ProductQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductItem | null;
}

export const ProductQuoteModal: React.FC<ProductQuoteModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (product) {
      setMessage(`Requesting formal quote and delivery timeline for ${product.name} (SKU: ${product.sku}).`);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please provide your name, phone, and email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = db.createProductRequest({
        customerName: customerName.trim(),
        productName: product ? product.name : 'Hardware Inquiries',
        quantity: Number(quantity) || 1,
        phone: phone.trim(),
        email: email.trim(),
        location: location.trim() || 'Not specified',
        message: message.trim(),
      });

      setSubmittedId(created.id);
      setIsSubmitting(false);
    } catch {
      setErrorMsg('Failed to submit quote request. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setCustomerName('');
    setPhone('');
    setEmail('');
    setQuantity(1);
    setLocation('');
    setMessage('');
    setSubmittedId(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedId ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Quote Request Received</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              We received your inquiry for <span className="text-white font-medium">{product?.name}</span> (Quantity: {quantity}). Reference token: <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-200">{submittedId}</span>. Our sales desk will verify current inventory and deliver pricing to your email.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-white tracking-tight">Request Product Quote</h3>
              {product && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">{product.name}</span>
                    <span className="block text-slate-400">SKU: {product.sku} · Brand: {product.brand}</span>
                  </div>
                  <span className="text-blue-400 font-semibold font-mono text-sm">{formatBDT(product.price)}</span>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Full Name / Contact Person <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone Number <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Quantity Needed</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Delivery City / Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Inquiry / Note</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need expedited shipping, mounting bracket, or installation support?"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Quote Request'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
