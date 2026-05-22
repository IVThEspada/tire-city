import { TireProduct, BrandLogo } from './types';

// Exporting the generated image paths so they can be imported statically
export const IMAGE_HERO_TIRES = '/src/assets/images/hero_tires_1779310975441.png';
export const IMAGE_PRODUCT_TIRE = '/src/assets/images/product_tire_wheel_1779310993264.png';
export const IMAGE_TREAD_BG = '/src/assets/images/tire_tread_bg_1779311013616.png';

export const BRANDS: BrandLogo[] = [
  { id: 'michelin', name: 'Michelin', textLogo: 'MICHELIN', subText: 'A Better Way Forward' },
  { id: 'continental', name: 'Continental', textLogo: 'CONTINENTAL', subText: 'The Future in Motion' },
  { id: 'pirelli', name: 'Pirelli', textLogo: 'PIRELLI', subText: 'Power Is Nothing Without Control' },
  { id: 'goodyear', name: 'Goodyear', textLogo: 'GOODYEAR', subText: 'More Driven' },
  { id: 'bridgestone', name: 'Bridgestone', textLogo: 'BRIDGESTONE', subText: 'Solutions for your journey' },
  { id: 'yokohama', name: 'Yokohama', textLogo: 'YOKOHAMA', subText: 'High Performance Tires' },
  { id: 'falken', name: 'Falken', textLogo: 'FALKEN', subText: 'On the Pulse of Wet Performance' },
];

export const PRODUCTS: TireProduct[] = [
  {
    id: 'prod-conti-sport',
    brand: 'Continental',
    model: 'ExtremeContact DWS06 Plus',
    type: 'Summer',
    size: '275/35ZR19',
    width: 275,
    ratio: 35,
    diameter: 19,
    price: 247.99,
    originalPrice: 289.99,
    rating: 4.8,
    reviewCount: 342,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: true,
    speedRating: 'Y',
    loadIndex: '100',
    specs: {
      warranty: '50,000 Miles',
      wetGrip: 'A',
      fuelEfficiency: 'B',
      noiseLevel: 70,
      treadwear: 560,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '10/32"',
      runflat: false,
    },
    description: 'The ExtremeContact DWS06 Plus is an ultra-high performance summer and dry-handling champion. Designed for sports cars, high-performance sedans, and luxury sport crossovers, this tire sets the benchmark for wet and dry grip. Features SportPlus+ technology which advances tread life, provides exceptional handling, and guarantees absolute control on dry and wet surfaces alike.',
    reviews: [
      {
        id: 'rev-1',
        user: 'Chase M.',
        rating: 5,
        date: '2026-04-12',
        title: 'Outstanding performance on my BMW M4',
         comment: 'The dry grip is phenomenal! Cornering feels on absolute rails and they channel water exceptionally well during typical heavy structural downpours. Quiet, track-ready quality.',
        verified: true,
        helpfulCount: 42,
      },
      {
        id: 'rev-2',
        user: 'Vikram S.',
        rating: 4,
        date: '2026-04-28',
        title: 'Sticky and reliable, slightly firm ride',
        comment: 'Absolutely love the steering responsiveness. You can feel the road perfectly. The road noise is minimal, but the ride can feel slightly stiff over high-speed expressway seams.',
        verified: true,
        helpfulCount: 15,
      }
    ]
  },
  {
    id: 'prod-mich-pilot',
    brand: 'Michelin',
    model: 'Pilot Sport 4S',
    type: 'Track/Racing',
    size: '305/30ZR21',
    width: 305,
    ratio: 30,
    diameter: 21,
    price: 369.99,
    originalPrice: 419.99,
    rating: 4.9,
    reviewCount: 512,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: true,
    speedRating: 'Y',
    loadIndex: '104',
    specs: {
      warranty: '30,000 Miles',
      wetGrip: 'A',
      fuelEfficiency: 'C',
      noiseLevel: 71,
      treadwear: 300,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '9.5/32"',
      runflat: false,
    },
    description: 'The Michelin Pilot Sport 4S is the undisputed king of performance tires, born from endurance racing pedigree. Built using Michelin Multi-Compound Technology, it uses different elastomer combinations across the tread surface for maximum adhesion. Ideal for premium supercars, high-power track builds, and competitive environments.',
    reviews: [
      {
        id: 'rev-m1',
        user: 'Alexander P.',
        rating: 5,
        date: '2026-05-01',
        title: 'Perfect for Taycan Turbo S',
        comment: 'Instant power delivery with zero spin. The rubber compound literally glues itself to the concrete. Best tire I have ever bought, completely worth every single dollar.',
        verified: true,
        helpfulCount: 89,
      }
    ]
  },
  {
    id: 'prod-pirelli-zero',
    brand: 'Pirelli',
    model: 'P Zero Winter Perform',
    type: 'Winter',
    size: '265/35R21',
    width: 265,
    ratio: 35,
    diameter: 21,
    price: 312.50,
    rating: 4.7,
    reviewCount: 184,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: false,
    speedRating: 'W',
    loadIndex: '101',
    specs: {
      warranty: '40,000 Miles',
      wetGrip: 'B',
      fuelEfficiency: 'B',
      noiseLevel: 69,
      treadwear: 420,
      traction: 'A',
      temperature: 'A',
      treadDepth: '11/32"',
      runflat: true,
    },
    description: 'Pirelli P Zero Winter brings top-tier racing performance to freezing snow profiles. Formulated with customized high-silica rubber compounds, it remains pliable in extreme arctic temperatures while utilizing a technical asymmetric tread layout for unmatched safety, stability, and control.',
    reviews: [
      {
        id: 'rev-p1',
        user: 'Sven K.',
        rating: 5,
        date: '2026-01-15',
        title: 'Absolute confidence on mountain snow',
        comment: 'I live in Colorado and take alpine passes twice a week. These tires hold like nothing else. Minimal slide on heavy compact snow. Exceptional brake safety.',
        verified: true,
        helpfulCount: 23,
      }
    ]
  },
  {
    id: 'prod-yoko-advan',
    brand: 'Yokohama',
    model: 'Advan Neova AD09',
    type: 'Track/Racing',
    size: '245/35R20',
    width: 245,
    ratio: 35,
    diameter: 20,
    price: 289.00,
    rating: 4.8,
    reviewCount: 98,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: false,
    speedRating: 'W',
    loadIndex: '95',
    specs: {
      warranty: 'Limited track wear',
      wetGrip: 'A',
      fuelEfficiency: 'D',
      noiseLevel: 73,
      treadwear: 200,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '8/32"',
      runflat: false,
    },
    description: 'The ADVAN Neova AD09 features an aggressive casing structure optimized for premium track days. Its massive contiguous shoulder blocks reduce squirm under heavy side loads, while the specialized motorsport-grade compound heats up instantly to provide extreme thermal threshold performance.',
    reviews: [
      {
        id: 'rev-y1',
        user: 'Dominic T.',
        rating: 5,
        date: '2026-05-18',
        title: 'Street legal racing slick feel',
        comment: 'These tires are insane. Cornering limits are basically unreachable on normal public streets. Warm them up for a lap and they provide supreme track telemetry.',
        verified: true,
        helpfulCount: 54,
      }
    ]
  },
  {
    id: 'prod-goodyear-eagle',
    brand: 'Goodyear',
    model: 'Eagle Exhilarate',
    type: 'All-Season',
    size: '255/35R21',
    width: 255,
    ratio: 35,
    diameter: 21,
    price: 259.99,
    originalPrice: 279.99,
    rating: 4.6,
    reviewCount: 210,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: true,
    speedRating: 'Y',
    loadIndex: '98',
    specs: {
      warranty: '45,000 Miles',
      wetGrip: 'A',
      fuelEfficiency: 'C',
      noiseLevel: 68,
      treadwear: 500,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '10/32"',
      runflat: false,
    },
    description: 'The Goodyear Eagle Exhilarate is premium-class luxury meets performance. Engineered to handle high acceleration, intense braking, and severe wet curves. Offers active braking technology that reduces braking distance on both wet and dry pavements.',
    reviews: []
  },
  {
    id: 'prod-bridge-dueler',
    brand: 'Bridgestone',
    model: 'Dueler A/T Revo 3',
    type: 'All-Terrain',
    size: '315/70R17',
    width: 315,
    ratio: 70,
    diameter: 17,
    price: 298.00,
    rating: 4.7,
    reviewCount: 165,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: false,
    speedRating: 'S',
    loadIndex: '121',
    specs: {
      warranty: '60,000 Miles',
      wetGrip: 'B',
      fuelEfficiency: 'C',
      noiseLevel: 72,
      treadwear: 600,
      traction: 'A',
      temperature: 'B',
      treadDepth: '14/32"',
      runflat: false,
    },
    description: 'Designed for heavy work trucks, standard Jeeps, and dynamic offroad builds, the Dueler A/T Revo 3 provides severe traction on and off-road. Features deep staggered grooves and robust sidewall teeth that resist punctures from jagged gravel or branches.',
    reviews: []
  },
  {
    id: 'prod-falken-wildpeak',
    brand: 'Falken',
    model: 'Wildpeak A/T3W',
    type: 'All-Terrain',
    size: '285/70R17',
    width: 285,
    ratio: 70,
    diameter: 17,
    price: 224.00,
    originalPrice: 245.00,
    rating: 4.8,
    reviewCount: 412,
    images: [IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE, IMAGE_PRODUCT_TIRE],
    isPopular: true,
    speedRating: 'T',
    loadIndex: '115',
    specs: {
      warranty: '55,000 Miles',
      wetGrip: 'A',
      fuelEfficiency: 'D',
      noiseLevel: 70,
      treadwear: 660,
      traction: 'A',
      temperature: 'B',
      treadDepth: '13/32"',
      runflat: false,
    },
    description: 'Falken Wildpeak A/T3W combines legendary offroad longevity with high asphalt composure. Optimized tread design prevents stone trapping and guarantees perfect highway tracking in heavy mountain winter blizzards. Backed by 3D canyon sipes for ultimate safety.',
    reviews: []
  }
];

// Rich compatibility lookup table
export const COMPATIBILITY: {
  [year: string]: {
    [make: string]: {
      [model: string]: {
        [trim: string]: {
          tireSize: string;
          recommendedIds: string[];
        }
      }
    }
  }
} = {
  '2026': {
    'Porsche': {
      '911 GT3': {
        'Standard Performance': {
          tireSize: '305/30ZR21',
          recommendedIds: ['prod-mich-pilot', 'prod-pirelli-zero']
        }
      },
      'Taycan': {
        'Turbo S': {
          tireSize: '265/35R21',
          recommendedIds: ['prod-pirelli-zero', 'prod-goodyear-eagle']
        }
      }
    },
    'BMW': {
      'M4 Coupe': {
        'Competition': {
          tireSize: '275/35ZR19',
          recommendedIds: ['prod-conti-sport', 'prod-yoko-advan']
        }
      }
    },
    'Tesla': {
      'Model S': {
        'Plaid': {
          tireSize: '265/35R21',
          recommendedIds: ['prod-pirelli-zero', 'prod-goodyear-eagle']
        }
      }
    }
  },
  '2025': {
    'Porsche': {
      '911 GT3': {
        'Standard Performance': {
          tireSize: '305/30ZR21',
          recommendedIds: ['prod-mich-pilot', 'prod-pirelli-zero']
        }
      }
    },
    'BMW': {
      'M4 Coupe': {
        'Competition': {
          tireSize: '275/35ZR19',
          recommendedIds: ['prod-conti-sport', 'prod-yoko-advan']
        }
      },
      'X5 M': {
        'Competition': {
          tireSize: '275/35ZR19',
          recommendedIds: ['prod-conti-sport']
        }
      }
    },
    'Tesla': {
      'Model S': {
        'Plaid': {
          tireSize: '265/35R21',
          recommendedIds: ['prod-pirelli-zero', 'prod-goodyear-eagle']
        }
      },
      'Model Y': {
        'Performance': {
          tireSize: '255/35R21',
          recommendedIds: ['prod-goodyear-eagle', 'prod-pirelli-zero']
        }
      }
    },
    'Ford': {
      'Mustang Shelby': {
        'GT500': {
          tireSize: '275/35ZR19',
          recommendedIds: ['prod-conti-sport', 'prod-mich-pilot']
        }
      },
      'F-150': {
        'Raptor Offroad': {
          tireSize: '315/70R17',
          recommendedIds: ['prod-bridge-dueler', 'prod-falken-wildpeak']
        }
      }
    }
  },
  '2024': {
    'BMW': {
      'M4 Coupe': {
        'Competition': {
          tireSize: '275/35ZR19',
          recommendedIds: ['prod-conti-sport', 'prod-yoko-advan']
        }
      }
    },
    'Tesla': {
      'Model Y': {
        'Performance': {
          tireSize: '255/35R21',
          recommendedIds: ['prod-goodyear-eagle', 'prod-pirelli-zero']
        }
      }
    },
    'Ford': {
      'F-150': {
        'Raptor Offroad': {
          tireSize: '315/70R17',
          recommendedIds: ['prod-bridge-dueler', 'prod-falken-wildpeak']
        }
      }
    }
  }
};
