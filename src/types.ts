export interface PricingPackage {
  id: string;
  bottles: number;
  badgeTitle: string;
  badgeBg?: string;
  subtitle: string;
  pricePerBottle: number;
  regularPricePerBottle: number;
  totalPrice: number;
  originalTotalPrice: number;
  savings: number;
  shipping: number; // 0 for free
  isBestOffer?: boolean;
  isPopular?: boolean;
  cardTypes: string[];
  features: string[];
  supplyDays: number;
}

export interface OrderDetails {
  packageId: string;
  packageName: string;
  bottles: number;
  pricePerBottle: number;
  subtotal: number;
  shipping: number;
  savings: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  orderId: string;
  orderDate: string;
}
