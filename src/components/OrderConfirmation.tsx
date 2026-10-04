import React, { useEffect } from 'react';
import { OrderDetails } from '../types';
import { BottlesIllustration } from './BottleSvgDefs';
import confetti from 'canvas-confetti';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Printer, Sparkles, Mail, ShieldCheck } from 'lucide-react';

interface OrderConfirmationProps {
  order: OrderDetails;
  onReset: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onReset }) => {
  useEffect(() => {
    // Fire celebratory confetti on mount
    const end = Date.now() + 2 * 1000;
    const colors = ['#f08a00', '#ffd200', '#2a5aa0', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Success banner */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-8 shadow-xl text-center relative overflow-hidden mb-8">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
        
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider rounded-full border border-emerald-200 mb-2">
          Order Successfully Placed
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
          Thank You For Your Order!
        </h2>
        
        <p className="text-gray-600 font-medium max-w-lg mx-auto text-sm sm:text-base">
          We have received your order and our fulfillment warehouse is preparing your shipment. A confirmation email has been sent to <span className="font-bold text-gray-900">{order.email}</span>.
        </p>

        {/* Order Meta Bar */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-wrap items-center justify-around gap-4 text-left">
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Order Number</div>
            <div className="font-mono font-black text-base text-[#1b3a6b]">{order.orderId}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Order Date</div>
            <div className="font-bold text-sm text-gray-800">{order.orderDate}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Estimated Delivery</div>
            <div className="font-bold text-sm text-emerald-700">2-4 Business Days</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Total Paid</div>
            <div className="font-black text-lg text-[#a35a14]">${order.total}.00</div>
          </div>
        </div>
      </div>

      {/* Shipment and Receipt Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shipping details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-extrabold uppercase text-[#2e5a8a] tracking-wider mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Shipping Address
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="font-bold text-gray-900">{order.customerName}</div>
            <div>{order.address}</div>
            <div>{order.city}, {order.state} {order.zip}</div>
            <div className="text-xs text-gray-500 pt-2 font-medium">Contact: {order.phone}</div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-extrabold uppercase text-[#2e5a8a] tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Payment & Protection
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-mono font-bold text-gray-800">{order.cardNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Guarantee:</span>
              <span className="text-emerald-700 font-bold">60-Day Money Back</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-black uppercase">
                Paid / Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
            <BottlesIllustration bottles={order.bottles} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-gray-900">{order.packageName}</h4>
            <p className="text-xs font-semibold text-gray-500">
              {order.bottles} Bottles of SodaSlim Supplement • ${(order.pricePerBottle).toFixed(2)}/bottle
            </p>
            <div className="text-xs text-emerald-600 font-bold mt-1">
              You saved ${order.savings}.00 with today's promo
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${order.subtotal}.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
            <span>Total Paid</span>
            <span className="text-[#a35a14] text-xl">${order.total}.00</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          Print Receipt
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 bg-[#2e5a8a] text-white font-black uppercase tracking-wider rounded-lg hover:bg-[#1b3a6b] transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Select Another Package</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
