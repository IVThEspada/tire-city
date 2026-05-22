import React, { useState } from 'react';
import { CartItem, BookingDetails } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Wrench, 
  Calendar, 
  Clock, 
  Truck, 
  Tag, 
  CheckCircle2, 
  MapPin, 
  CreditCard,
  CreditCardIcon, 
  Info 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, val: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'booking' | 'payment' | 'completed'>('cart');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in dollars
  const [couponFeedback, setCouponFeedback] = useState('');

  // Booking states
  const [bookingType, setBookingType] = useState<'shop' | 'mobile'>('mobile');
  const [bookingDate, setBookingDate] = useState('2026-05-25');
  const [bookingTime, setBookingTime] = useState('10:00 AM - 12:00 PM');
  const [localStore, setLocalStore] = useState('Downtown Speed Shop & alignment (Certified)');
  const [mobileAddress, setMobileAddress] = useState('123 Drifting Way, Apt 14A');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'cc' | 'affirm'>('cc');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8490');
  const [affirmMonths, setAffirmMonths] = useState(6); // 6 months financing

  // Form errors
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Math subtotal
  const tiresTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const installationTotal = cartItems.reduce(
    (acc, item) => acc + (item.withInstallation ? item.installationCost * item.qty : 0),
    0
  );
  const stateEcoTax = cartItems.reduce((acc, item) => acc + 4.25 * item.qty, 0); // $4.25 tyre disposal eco fee
  const subtotal = tiresTotal + installationTotal + stateEcoTax;
  const grandTotal = Math.max(0, subtotal - appliedDiscount);

  // Affirm calculations
  const monthlyFinanceAmount = grandTotal / affirmMonths;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'PERFORMANCE50') {
      setAppliedDiscount(50);
      setCouponFeedback('✓ PERFORMANCE50 applied! Coupon saved you $50.00!');
    } else if (cleanCode === 'TIRE10') {
      setAppliedDiscount(Math.round(tiresTotal * 0.1));
      setCouponFeedback('✓ TIRE10 applied! 10% coupon saved you some cash!');
    } else {
      setCouponFeedback('✗ Invalid coupon code. Try code "PERFORMANCE50" for $50 off!');
    }
  };

  const handleNextToBooking = () => {
    if (cartItems.length === 0) return;
    setStep('booking');
  };

  const handleNextToPayment = () => {
    if (!driverName || !driverPhone || (bookingType === 'mobile' && !mobileAddress)) {
      setFormError('Please complete all mechanic scheduling and contact columns.');
      return;
    }
    setFormError('');
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setStep('completed');
  };

  const triggerClose = () => {
    if (step === 'completed') {
      onClearCart();
      setStep('cart');
      setAppliedDiscount(0);
      setCouponCode('');
      setCouponFeedback('');
      setDriverName('');
      setDriverPhone('');
      setLicensePlate('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Outer Click dismisser */}
      <div className="absolute inset-0" onClick={triggerClose} />

      {/* Main Slide-out Container */}
      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-lg bg-[#0F0F10] border-l border-[#262629] text-white flex flex-col shadow-2xl relative">
          
          {/* Top Decorative glowing band */}
          <div className="h-1 bg-gradient-to-r from-[#FF6A00] to-yellow-500 w-full" />

          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#262629] flex items-center justify-between">
            <div>
              <h3 className="font-display font-black text-lg tracking-tight uppercase flex items-center gap-2">
                📂 Your Garage Cart
              </h3>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider">
                {step === 'cart' && 'STAGE 1: ITEMS SUMMARY & VALVES'}
                {step === 'booking' && 'STAGE 2: MECHANIC & MOBILE SCHEDULING'}
                {step === 'payment' && 'STAGE 3: PERFORMANCE FINANCING'}
                {step === 'completed' && 'STAGE 4: DISPATCH ORDER COMPLETED'}
              </p>
            </div>
            
            <button
              onClick={triggerClose}
              className="p-1 text-gray-400 hover:text-white rounded-md border border-[#262629] hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar">
            
            {/* Step: Cart */}
            {step === 'cart' && (
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#1B1B1D] flex items-center justify-center border border-[#262629]">
                      <X className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base">Your Cart is Empty</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs font-mono">
                        Add high-performance tires to calculate compound specifications, speed ratings, and custom fitting offsets.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item, idx) => (
                        <div 
                          key={`${item.product.id}-${idx}`}
                          className="bg-[#1B1B1D] border border-[#262629] p-4 rounded-lg flex gap-4 items-start relative group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 bg-[#101012] p-2 rounded border border-[#262629] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.model}
                              className="h-14 w-auto object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-mono tracking-wider text-gray-400 block uppercase">
                              {item.product.brand} &bull; {item.product.type}
                            </span>
                            <h5 className="font-display font-extrabold text-xs text-white uppercase truncate">
                              {item.product.brand} {item.product.model}
                            </h5>
                            <span className="text-[10px] font-mono font-bold text-[#FF6A00] block mt-0.5">
                              Size selected: {item.selectedSize}
                            </span>

                            {/* Qty & Price Row */}
                            <div className="flex items-center justify-between mt-3 font-mono">
                              <div className="flex items-center bg-[#101012] border border-[#262629] rounded overflow-hidden">
                                <button
                                  onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 text-xs text-white font-bold">{item.qty}</span>
                                <button
                                  onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs text-white font-bold">
                                ${(item.product.price * item.qty).toFixed(2)}
                              </span>
                            </div>

                            {/* Balanced Valve Stem Badge toggle */}
                            {item.withInstallation && (
                              <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded w-fit border border-emerald-500/10">
                                <Wrench className="w-3 h-3 text-emerald-400" />
                                + Includes Certified Valve Stem Balance Fitting
                              </div>
                            )}
                          </div>

                          {/* Trash indicator */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-500 hover:text-red-500 p-1 rounded-md border border-transparent hover:border-[#262629] h-8 w-8 flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo code form */}
                    <form onSubmit={handleApplyCoupon} className="border-t border-[#262629] pt-4 mt-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Coupon Code</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter PERFORMANCE50 or TIRE10"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 bg-[#1B1B1D] text-xs text-white px-3 py-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                          />
                          <button
                            type="submit"
                            className="bg-[#1B1B1D] hover:bg-[#FF6A00] text-gray-300 hover:text-black border border-[#262629] hover:border-[#FF6A00] px-4 py-2 text-xs font-display font-bold uppercase rounded transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponFeedback && (
                          <span className={`text-[10px] font-mono ${couponFeedback.includes('✓') ? 'text-emerald-400' : 'text-red-400'}`}>
                            {couponFeedback}
                          </span>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

            {/* Step: Booking */}
            {step === 'booking' && (
              <div className="space-y-6">
                <div className="p-4 bg-orange-500/10 border border-[#FF6A00]/20 rounded text-xs text-gray-300 leading-relaxed font-mono">
                  <strong>PRO-TIP:</strong> Set of 4 tires qualifies for **FREE priority Mobile Delivery**. Choose below to have our hydraulic tire van mount them directly in your driveway!
                </div>

                {/* Switcher Option */}
                <div className="flex gap-3 bg-[#101012] p-1.5 rounded-lg border border-[#262629]">
                  <button
                    onClick={() => setBookingType('mobile')}
                    className={`flex-1 flex flex-col items-center py-2.5 px-3 rounded text-center transition-all ${
                      bookingType === 'mobile'
                        ? 'bg-[#FF6A00] text-black font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 mb-1" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider">Mobile Hub Install</span>
                  </button>
                  <button
                    onClick={() => setBookingType('shop')}
                    className={`flex-1 flex flex-col items-center py-2.5 px-3 rounded text-center transition-all ${
                      bookingType === 'shop'
                        ? 'bg-[#FF6A00] text-black font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Wrench className="w-4 h-4 mb-1" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider">Local Shop drop-off</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Location Address */}
                  {bookingType === 'mobile' ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Mobile Driveway Address</label>
                      <input
                        type="text"
                        required
                        value={mobileAddress}
                        onChange={(e) => setMobileAddress(e.target.value)}
                        placeholder="e.g. 123 Performance Loop"
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Select Certified Partner Station</label>
                      <select
                        value={localStore}
                        onChange={(e) => setLocalStore(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      >
                        <option value="Downtown Speed Shop & alignment (Certified)">Downtown Performance alignment (+ Road Force Balance)</option>
                        <option value="Westside Tire Pros (Certified)">Westside Dynamic Alignment Garage</option>
                        <option value="Tire City Track Garage (Official Store)">Tire City High-Performance Showroom (Bay #3)</option>
                      </select>
                    </div>
                  )}

                  {/* Date Picker */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Booking Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Time Block Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      >
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                        <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Driver Contact details */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Driver Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Christian Horner"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Mobile Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 911-3031"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Vehicle Trim / license Plate (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. GT3-911"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-400 font-mono mt-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-red-400" />
                    {formError}
                  </p>
                )}
              </div>
            )}

            {/* Step: Payment */}
            {step === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-3">
                    💳 SECURE ACCOUNT FINANCING
                  </h4>
                  
                  {/* Switching */}
                  <div className="grid grid-cols-2 gap-3 bg-[#101012] p-1.5 rounded-lg border border-[#262629]">
                    <button
                      onClick={() => setPaymentMethod('cc')}
                      className={`py-3.5 rounded text-center transition-all flex flex-col items-center justify-center font-display font-bold text-xs ${
                        paymentMethod === 'cc'
                          ? 'bg-[#FF6A00] text-black font-extrabold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <CreditCardIcon className="w-4 h-4 mb-1" />
                      SECURE CHECKOUT
                    </button>
                    <button
                      onClick={() => setPaymentMethod('affirm')}
                      className={`py-3.5 rounded text-center transition-all flex flex-col items-center justify-center font-display font-bold text-xs ${
                        paymentMethod === 'affirm'
                          ? 'bg-[#FF6A00] text-black font-extrabold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Tag className="w-4 h-4 mb-1" />
                      AFFIRM 0% FINANCING
                    </button>
                  </div>
                </div>

                {paymentMethod === 'cc' ? (
                  <div className="space-y-4">
                    {/* Simulated CC detail mock */}
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-mono text-gray-400 uppercase">TIRE CITY STAGE-WAY SECURE</span>
                        <span className="text-xs bg-emerald-500 font-bold text-black px-2 py-0.5 rounded">PCI-DSS COMPLIANT</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Fake Test Credit Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black text-xs text-white px-3 py-2 border border-zinc-800 focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">Expiry code</span>
                          <span className="text-xs text-white font-mono">08/2030</span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">CVV security</span>
                          <span className="text-xs text-white font-mono">312</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Affirm simulated financing calculator */}
                    <div className="p-5 bg-gradient-to-r from-blue-900/10 to-blue-900/20 border border-blue-500/20 rounded-lg">
                      <h5 className="font-display font-bold text-sm text-[#FF6A00] flex items-center gap-1.5 uppercase">
                        Affirm 0% APR Financing Calculator
                      </h5>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Divide your premium tire installation into budget-friendly monthly payouts with zero hidden fees. Compounded flat-rate!
                      </p>

                      {/* Slider months */}
                      <div className="mt-5">
                        <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                          <span>Financing Payout Term</span>
                          <span className="text-[#FF6A00] font-bold">{affirmMonths} Low Monthly Payments</span>
                        </div>

                        <div className="flex gap-2">
                          {[3, 6, 12].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setAffirmMonths(m)}
                              className={`flex-1 py-2 rounded text-xs font-mono font-bold border transition-colors ${
                                affirmMonths === m
                                  ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                                  : 'border-[#262629] hover:border-gray-500'
                              }`}
                            >
                              {m} Months
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Affirm dynamic amount */}
                      <div className="border-t border-dashed border-[#262629] pt-4 mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 block">YOUR MONTHLY PAYOUT</span>
                          <span className="text-2xl font-mono font-black text-white">
                            ${monthlyFinanceAmount.toFixed(2)}
                            <span className="text-xs font-normal text-gray-400"> /mo</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded">
                          0% APR Certified
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step: Completed */}
            {step === 'completed' && (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center border-4 border-emerald-900 mx-auto glow-orange-lg animate-bounce">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="font-display font-black text-xl text-white tracking-tight uppercase">
                    ORDER DISPATCH CONSOLIDATED!
                  </h4>
                  <p className="text-xs font-mono text-gray-400 mt-2">
                    Order ID Receipt number <strong className="text-emerald-400">#TC-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </p>
                </div>

                <div className="bg-[#1B1B1D] border border-[#262629] p-5 rounded-lg text-left text-xs space-y-3 font-mono">
                  <span className="text-cyan-400 uppercase font-bold border-b border-[#262629] pb-1.5 block">
                    🔧 Fitting Specialist Scheduled
                  </span>
                  <div>
                    <span className="text-gray-500 block">Fitting Style:</span>
                    <span className="text-white font-bold uppercase">{bookingType === 'mobile' ? '🚚 Driveway Mobile Fleet Van' : '⚙ Certified Local Garage drop-off'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Date &amp; Time block:</span>
                    <span className="text-white font-bold">{bookingDate} @ {bookingTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Mechanic contact info:</span>
                    <span className="text-white font-bold truncate block">{driverName} ({driverPhone})</span>
                  </div>
                  {bookingType === 'mobile' ? (
                    <div>
                      <span className="text-gray-500 block">Dispatch address:</span>
                      <span className="text-white font-bold">{mobileAddress}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-gray-500 block">Certified Station location:</span>
                      <span className="text-white font-bold">{localStore}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  We have dispatched confirmation text codes &amp; calendar appointments to <strong>{driverPhone}</strong> under security validation protocols.
                </p>
              </div>
            )}

          </div>

          {/* Drawer Footer billing section */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#262629] bg-[#101012] space-y-4">
              {/* Receipt Breakdowns */}
              {step !== 'completed' && (
                <div className="space-y-1.5 font-mono text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Selected Compound Base:</span>
                    <span className="text-white font-bold">${tiresTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tire Balancing:</span>
                    <span className="text-white">
                      {installationTotal > 0 ? `$${installationTotal.toFixed(2)}` : 'Self-Installation ($0)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>EPA Waste Tyre scrap disposal:</span>
                    <span className="text-white">${stateEcoTax.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Applied Promo Code:</span>
                      <span>-${appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Divider */}
                  <div className="border-t border-[#262629]/60 my-2" />

                  <div className="flex justify-between text-sm">
                    <span className="font-display font-medium text-white uppercase font-bold uppercase">Estimated Subtotal:</span>
                    <span className="text-[#FF6A00] font-extrabold text-lg">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Step Navigation buttons */}
              <div className="flex gap-3">
                {step === 'cart' && (
                  <button
                    onClick={handleNextToBooking}
                    disabled={cartItems.length === 0}
                    className="w-full py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] disabled:opacity-40 transition-colors glow-orange"
                  >
                    PROCEED TO SCHEDULING & FITTING
                  </button>
                )}

                {step === 'booking' && (
                  <>
                    <button
                      onClick={() => setStep('cart')}
                      className="px-4 py-4 bg-transparent border border-[#262629] text-gray-400 hover:text-white rounded font-display font-bold text-xs uppercase transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextToPayment}
                      className="flex-1 py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] transition-colors glow-orange"
                    >
                      GO TO SECURE PAYMENTS ({paymentMethod === 'affirm' ? `$${monthlyFinanceAmount.toFixed(0)}/mo` : `$${grandTotal.toFixed(2)}`})
                    </button>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <button
                      onClick={() => setStep('booking')}
                      className="px-4 py-4 bg-transparent border border-[#262629] text-gray-400 hover:text-white rounded font-display font-bold text-xs uppercase transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      className="flex-1 py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] transition-colors glow-orange"
                    >
                      {paymentMethod === 'affirm' ? 'SUBMIT AFFIRM FINANCING' : 'CONFIRM ORDER DETACH LIST'}
                    </button>
                  </>
                )}

                {step === 'completed' && (
                  <button
                    onClick={triggerClose}
                    className="w-full py-4 bg-neutral-800 hover:bg-[#FF6A00] text-white hover:text-black font-display font-black tracking-widest text-xs uppercase rounded transition-colors"
                  >
                    CLOSE &amp; RESET GARAGE CHECKOUT
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
