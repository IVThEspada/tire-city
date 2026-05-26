import { TireProduct, BrandLogo } from './types';

// Exporting the generated image paths so they can be imported statically
export const IMAGE_HERO_TIRES = '/src/assets/images/hero_tires_1779310975441.png';
export const IMAGE_PRODUCT_TIRE = '/src/assets/images/product_tire_wheel_1779310993264.png';
export const IMAGE_TREAD_BG = '/src/assets/images/tire_tread_bg_1779311013616.png';

export const BRANDS: BrandLogo[] = [
  { id: 'michelin', name: 'Michelin', textLogo: 'MICHELIN', subText: 'Daha İyi Bir Geleceğe Doğru', description: 'Ağır pist yüklerini desteklemek için tasarlanmış çoklu kauçuk bileşenlerin ve dinamik biyomekanik filtrelerin öncüleri.' },
  { id: 'continental', name: 'Continental', textLogo: 'CONTINENTAL', subText: 'Gelecek Harekette', description: 'Alman hassas tasarım standartları. Yol Gücü uyumluluğu ve iç gürültü engelleme katmanlarında uzmanlaşmıştır.' },
  { id: 'pirelli', name: 'Pirelli', textLogo: 'PIRELLI', subText: 'Kontrolsüz Güç Güç Değildir', description: 'Formula 1 resmi orijinal ekipman tedarikçisi. Ultra yüksek hız dereceleri ve zorlu viraj G Kuvvetleri için formüle edilmiştir.' },
  { id: 'goodyear', name: 'Goodyear', textLogo: 'GOODYEAR', subText: 'Daha Sürücü Odaklı', description: 'Mükemmel kilometre performansı ve ıslak kuru zemin dengesi. İnovatif sırt deseni teknolojisiyle sürüş güvenliğini maksimize eder.' },
  { id: 'bridgestone', name: 'Bridgestone', textLogo: 'BRIDGESTONE', subText: 'Yolculuğunuz için çözümler', description: 'Japon mühendisliğiyle üretilmiş yüksek dayanıklılık ve konfor. Optimum frenleme mesafesi ve sessiz sürüş deneyimi sunar.' },
  { id: 'yokohama', name: 'Yokohama', textLogo: 'YOKOHAMA', subText: 'Yüksek Performanslı Lastikler', description: 'Yarış pistlerinden ilham alan yüksek hız kararlılığı. Islak yüzeylerde mükemmel kavrama ve su tahliyesi sağlar.' },
  { id: 'falken', name: 'Falken', textLogo: 'FALKEN', subText: 'Islak Zeminde Performansın Nabzı', description: 'Zorlu yol şartlarında yüksek seviyede tepki ve üstün kontrol. Genç ve dinamik sürüş ruhunu destekleyen özel kauçuk yapısı.' },
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
      warranty: '80.000 KM',
      wetGrip: 'A',
      fuelEfficiency: 'B',
      noiseLevel: 70,
      treadwear: 560,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '10/32"',
      runflat: false,
    },
    description: 'ExtremeContact DWS06 Plus, ultra yüksek performanslı yaz ve kuru zemin yol tutuş kulvarının şampiyonudur. Spor arabalar, yüksek performanslı sedanlar ve lüks spor crossover araçlar için tasarlanan bu lastik, ıslak ve kuru zemin kavrayışında yeni standartları belirliyor. Diş ömrünü uzatan, sıra dışı bir yol tutuş sunan ve hem kuru hem ıslak yüzeylerde mutlak kontrolü garanti eden SportPlus+ teknolojisine sahiptir.',
    reviews: [
      {
        id: 'rev-1',
        user: 'Chase M.',
        rating: 5,
        date: '2026-04-12',
        title: 'BMW M4 aracımda olağanüstü performans',
        comment: 'Kuru zemin tutuşu muazzam! Virajlarda adeta ray üzerindeymişsiniz gibi hissettiriyor ve yoğun sağanak yağmurlarda suyu olağanüstü bir şekilde tahliye ediyor. Sessiz, piste hazır kalite.',
        verified: true,
        helpfulCount: 42,
      },
      {
        id: 'rev-2',
        user: 'Vikram S.',
        rating: 4,
        date: '2026-04-28',
        title: 'Yola iyi yapışıyor ve güvenilir, sürüş biraz sert',
        comment: 'Direksiyon hassasiyetine kesinlikle bayılıyorum. Yolu mükemmel bir şekilde hissedebiliyorsunuz. Yol gürültüsü minimum düzeyde, ancak otobandaki bağlantı noktalarında sürüş biraz sert hissettirebilir.',
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
      warranty: '50.000 KM',
      wetGrip: 'A',
      fuelEfficiency: 'C',
      noiseLevel: 71,
      treadwear: 300,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '9.5/32"',
      runflat: false,
    },
    description: 'Michelin Pilot Sport 4S, dayanıklılık yarışı kökeninden gelen, performans lastiklerinin tartışmasız kralıdır. Michelin Çoklu Bileşen Teknolojisi kullanılarak üretilen bu lastik, maksimum yapışma sağlamak için sırt yüzeyi genelinde farklı elastomer kombinasyonları kullanır. Premium süper arabalar, yüksek güçlü pist araçları ve rekabetçi ortamlar için idealdir.',
    reviews: [
      {
        id: 'rev-m1',
        user: 'Alexander P.',
        rating: 5,
        date: '2026-05-01',
        title: 'Taycan Turbo S için mükemmel',
        comment: 'Sıfır patinaj ile anında güç aktarımı. Kauçuk bileşeni adeta asfalta yapışıyor. Şimdiye kadar satın aldığım en iyi lastik, ödediğim her kuruşa sonuna kadar değer.',
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
      warranty: '65.000 KM',
      wetGrip: 'B',
      fuelEfficiency: 'B',
      noiseLevel: 69,
      treadwear: 420,
      traction: 'A',
      temperature: 'A',
      treadDepth: '11/32"',
      runflat: true,
    },
    description: 'Pirelli P Zero Winter, dondurucu kar zeminlerinde üst düzey yarış performansı sunar. Özel yüksek silikalı kauçuk bileşikleriyle formüle edilmiş olup, aşırı kutup sıcaklıklarında dahi yumuşaklığını korurken benzersiz güvenlik, stabilite ve kontrol için teknik asimetrik sırt tasarımından yararlanır.',
    reviews: [
      {
        id: 'rev-p1',
        user: 'Sven K.',
        rating: 5,
        date: '2026-01-15',
        title: 'Dağ karlarında mutlak güven',
        comment: 'Dağlık bölgelerde yaşıyorum ve haftada iki kez geçitlerden geçiyorum. Bu lastikler eşsiz bir tutuş sunuyor. Yoğun sıkıştırılmış kar üzerinde minimum kayma. Olağanüstü fren güvenliği.',
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
      warranty: 'Sınırlı Pist Garantisi',
      wetGrip: 'A',
      fuelEfficiency: 'D',
      noiseLevel: 73,
      treadwear: 200,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '8/32"',
      runflat: false,
    },
    description: 'ADVAN Neova AD09, premium pist günleri için optimize edilmiş agresif bir gövde yapısına sahiptir. Dev blok omuz yapısı, yüksek yanal yükler altında esnemeyi azaltırken, özel motor sporları sınıfı bileşeni anında ısınarak sıradışı termik eşik performansı sağlar.',
    reviews: [
      {
        id: 'rev-y1',
        user: 'Dominic T.',
        rating: 5,
        date: '2026-05-18',
        title: 'Yol izni olan yarış lastiği hissi',
        comment: 'Bu lastikler inanılmaz. Normal kamu yollarında viraj limitlerine ulaşmak neredeyse imkansız. Bir tur ısıtın ve size muazzam bir pist telemetrisi sunacaktır.',
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
      warranty: '70.000 KM',
      wetGrip: 'A',
      fuelEfficiency: 'C',
      noiseLevel: 68,
      treadwear: 500,
      traction: 'AA',
      temperature: 'A',
      treadDepth: '10/32"',
      runflat: false,
    },
    description: 'Goodyear Eagle Exhilarate, lüks sınıf kalitenin yüksek performansla buluştuğu noktadır. Yüksek hızlanma, yoğun frenleme ve virajlı ıslak zeminlerle başa çıkmak üzere tasarlanmıştır. Hem ıslak hem kuru asfalt üzerinde fren mesafesini azaltan aktif frenleme teknolojisi sunar.',
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
      warranty: '95.000 KM',
      wetGrip: 'B',
      fuelEfficiency: 'C',
      noiseLevel: 72,
      treadwear: 600,
      traction: 'A',
      temperature: 'B',
      treadDepth: '14/32"',
      runflat: false,
    },
    description: 'Ağır iş kamyonları, standart Jeep modelleri ve dinamik arazi araçları için tasarlanan Dueler A/T Revo 3, yolda ve arazide zorlu çekiş koşullarında üstün performans sağlar. Pürüzlü çakıl veya dallardan kaynaklanan delinmelere karşı direnç gösteren derin kademeli oluklar ve sağlam yanak dişlerine sahiptir.',
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
      warranty: '90.000 KM',
      wetGrip: 'A',
      fuelEfficiency: 'D',
      noiseLevel: 70,
      treadwear: 660,
      traction: 'A',
      temperature: 'B',
      treadDepth: '13/32"',
      runflat: false,
    },
    description: 'Falken Wildpeak A/T3W, efsanevi arazi dayanıklılığını yüksek asfalt sürüş kalitesi ile birleştirir. Optimize edilmiş sırt tasarımı, taş sıkışmasını önler ve yoğun dağ kış fırtınalarında mükemmel otoyol takibini garanti eder. Üstün güvenlik için 3D kanyon kılcal kanalları ile desteklenmiştir.',
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
