import React, { useState } from 'react';
import { PricingPackage, OrderDetails } from '../types';
import { BottlesIllustration } from './BottleSvgDefs';
import { ShieldCheck, Lock, Truck, ArrowLeft, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

interface CheckoutStepProps {
  selectedPackage: PricingPackage;
  onBack: () => void;
  onCompleteOrder: (details: OrderDetails) => void;
}

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  selectedPackage,
  onBack,
  onCompleteOrder,
}) => {
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '(555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    cardNumber: '4532 •••• •••• 8892',
    cardExp: '08/29',
    cardCvc: '849',
    billingSame: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bonusGift, setBonusGift] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'SLIM-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = selectedPackage.totalPrice + (selectedPackage.shipping || 0);

      onCompleteOrder({
        packageId: selectedPackage.id,
        packageName: `${selectedPackage.bottles} Bottles (${selectedPackage.supplyDays} Day Supply)`,
        bottles: selectedPackage.bottles,
        pricePerBottle: selectedPackage.pricePerBottle,
        subtotal: selectedPackage.totalPrice,
        shipping: selectedPackage.shipping,
        savings: selectedPackage.savings,
        total: totalAmount,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        cardNumber: formData.cardNumber,
        cardExp: formData.cardExp,
        cardCvc: formData.cardCvc,
        orderId: orderId,
        orderDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      });
      setIsProcessing(false);
    }, 900);
  };

  const finalTotal = selectedPackage.totalPrice + (selectedPackage.shipping || 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-amber-800 mb-6 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs cursor-pointer transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Package Selection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Checkout form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-[#2e5a8a]/30 p-6 sm:p-8 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase">Express Checkout</h2>
              <p className="text-sm text-gray-500 font-semibold">256-Bit SSL Encrypted & 100% Safe</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURE</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details */}
            <div>
              <h3 className="text-sm font-extrabold uppercase text-[#2e5a8a] tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2e5a8a] text-white flex items-center justify-center text-xs">1</span>
                Contact & Shipping Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (For Order Tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-extrabold uppercase text-[#2e5a8a] tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2e5a8a] text-white flex items-center justify-center text-xs">2</span>
                Payment Information
              </h3>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#2e5a8a]" />
                  <span className="text-xs font-black uppercase text-gray-800">Credit / Debit Card</span>
                </div>
                <div className="flex gap-1">
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-white border border-gray-300 rounded text-blue-800">VISA</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-white border border-gray-300 rounded text-orange-600">MC</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-white border border-gray-300 rounded text-blue-600">AMEX</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-white border border-gray-300 rounded text-orange-500">DISC</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">CVC / Security Code</label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#2e5a8a] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Free VIP Bonus gift checkbox */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-3">
              <input
                type="checkbox"
                id="bonusGift"
                checked={bonusGift}
                onChange={(e) => setBonusGift(e.target.checked)}
                className="mt-1 h-4 w-4 text-amber-600 rounded cursor-pointer"
              />
              <label htmlFor="bonusGift" className="text-xs text-amber-950 font-semibold cursor-pointer">
                <span className="font-extrabold uppercase text-amber-900">FREE Bonus:</span> Include "The 7-Day Rapid Cleanse & Energy Blueprint" eBook (Normally $39 - Yours Free with this order).
              </label>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 btn-gold rounded-lg font-black text-xl uppercase tracking-wide cursor-pointer shadow-lg transition flex items-center justify-center gap-2 text-black hover:brightness-105"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Secure Order...</span>
                </div>
              ) : (
                <>
                  <span>🔒 Complete My Order Now (${finalTotal})</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-gray-500 font-semibold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Backed by our 100% No-Risk 60-Day Money Back Guarantee</span>
            </div>
          </form>
        </div>

        {/* Right column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#2e5a8a] p-6 shadow-md overflow-hidden">
            <div className="bg-[#3f6590] -mx-6 -mt-6 p-4 text-white text-center font-extrabold text-lg uppercase tracking-wide">
              Order Summary
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                  <BottlesIllustration bottles={selectedPackage.bottles} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-black uppercase mb-1">
                    {selectedPackage.badgeTitle}
                  </div>
                  <h4 className="font-extrabold text-base text-gray-900 leading-snug">
                    SodaSlim - {selectedPackage.bottles} Bottles
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold">
                    {selectedPackage.supplyDays} Day Supply (${selectedPackage.pricePerBottle}/bottle)
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-4 space-y-2.5 text-sm border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Regular Price</span>
                  <span className="line-through">${selectedPackage.originalTotalPrice}.00</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Instant Package Savings</span>
                  <span>-${selectedPackage.savings}.00</span>
                </div>
                <div className="flex justify-between text-gray-700 font-bold">
                  <span>Package Subtotal</span>
                  <span>${selectedPackage.totalPrice}.00</span>
                </div>
                <div className="flex justify-between text-gray-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Shipping & Handling
                  </span>
                  <span className={selectedPackage.shipping === 0 ? 'text-emerald-600 font-black' : 'font-bold'}>
                    {selectedPackage.shipping === 0 ? 'FREE' : `$${selectedPackage.shipping.toFixed(2)}`}
                  </span>
                </div>
                {bonusGift && (
                  <div className="flex justify-between text-amber-700 font-bold text-xs bg-amber-50 p-2 rounded">
                    <span>VIP Blueprint eBook</span>
                    <span className="uppercase text-emerald-700 font-black">FREE ($39 Value)</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-4 flex items-baseline justify-between">
                <span className="text-lg font-black text-gray-900 uppercase">Today's Total:</span>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#a35a14]">${finalTotal}.00</div>
                  <span className="text-[11px] font-bold text-gray-500">One-time payment • No auto-ship</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Highlight Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 text-xs space-y-2 text-amber-950 shadow-xs">
            <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              <span>100% 60-Day Satisfaction Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Try SodaSlim for a full 60 days. If you aren't thrilled with your results, simply return the bottles (even empty ones) for a full, prompt refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
