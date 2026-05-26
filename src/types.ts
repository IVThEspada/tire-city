export type TireType = 'Summer' | 'Winter' | 'All-Season' | 'All-Terrain' | 'Track/Racing';

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface TireProduct {
  id: string;
  brand: string;
  model: string;
  type: TireType;
  size: string;
  width: number;
  ratio: number;
  diameter: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isPopular: boolean;
  speedRating: string;
  loadIndex: string;
  specs: {
    warranty: string;
    wetGrip: 'A' | 'B' | 'C' | 'D';
    fuelEfficiency: 'A' | 'B' | 'C' | 'D';
    noiseLevel: number; // e.g., 71 dB
    treadwear: number; // e.g., 540
    traction: 'AA' | 'A' | 'B' | 'C';
    temperature: 'A' | 'B' | 'C';
    treadDepth: string; // e.g. "10/32\""
    runflat: boolean;
  };
  description: string;
  reviews: Review[];
}

export interface CartItem {
  product: TireProduct;
  qty: number;
  selectedSize: string;
  withInstallation: boolean;
  installationCost: number;
}

export interface VehicleSelection {
  year: string;
  make: string;
  model: string;
  trim: string;
}

export interface SizeSelection {
  width: string;
  profile: string;
  diameter: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  logoUrl?: string;
  textLogo: string;
  subText: string;
  description?: string;
}

export interface BookingDetails {
  type: 'shop' | 'mobile';
  date: string;
  timeSlot: string;
  location: string;
  vehicleInfo: string;
}

export interface CustomSlide {
  id: string;
  tagText: string;
  title: string;
  titleGradient: string;
  description: string;
  primaryBtnText: string;
  primaryActionType: 'find_tires' | 'browse_catalog' | 'filter_all_terrain';
  secondaryBtnText: string;
  secondaryActionType: 'find_tires' | 'browse_catalog' | 'filter_all_terrain';
  image: string;
  imageClass?: string;
  badgeLabel: string;
  badgeValue: string;
  bgGlowColor: string;
  stats: { label: string; value: string; highlight?: boolean }[];
}

export interface FeaturedCatalog {
  id: string;
  title: string;
  subtitle: string;
  productIds: string[];
}

export interface SafetyRatingConfig {
  badgeText: string;
  title: string;
  desc1: string;
  desc2: string;
  bgUrl: string;
  badge1Label: string;
  badge1Sub: string;
  badge2Label: string;
  badge2Sub: string;
}



