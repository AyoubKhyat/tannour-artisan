export type ProductCategory = 'bags' | 'wallets' | 'belts' | 'accessories';

export interface Product {
  id: string;
  nameFr: string;
  nameDarija: string;
  category: ProductCategory;
  price: number;
  description: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 'sac-medina',
    nameFr: 'Sac Medina',
    nameDarija: 'شنطة المدينة',
    category: 'bags',
    price: 2800,
    description: 'Hand-stitched shoulder bag crafted from vegetable-tanned leather in the heart of the Marrakesh medina. Each piece carries the mark of its artisan.',
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
    featured: true,
  },
  {
    id: 'sac-atlas',
    nameFr: 'Sac Atlas',
    nameDarija: 'شنطة الأطلس',
    category: 'bags',
    price: 3200,
    description: 'Inspired by the Atlas Mountains, this structured tote features hand-carved geometric patterns and burnished brass hardware.',
    colors: [
      { name: 'Terre', hex: '#6B4423' },
      { name: 'Sable', hex: '#C2B280' },
      { name: 'Bordeaux', hex: '#4A0E0E' },
    ],
    sizes: ['Medium', 'Large'],
    featured: true,
  },
  {
    id: 'sac-riad',
    nameFr: 'Sac Riad',
    nameDarija: 'شنطة الرياض',
    category: 'bags',
    price: 2400,
    description: 'A compact crossbody inspired by riad doorways. Features an embossed arch pattern and adjustable strap.',
    colors: [
      { name: 'Miel', hex: '#EB9605' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Noir', hex: '#1a1a1a' },
    ],
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: 'portefeuille-souk',
    nameFr: 'Portefeuille Souk',
    nameDarija: 'بزطام السوق',
    category: 'wallets',
    price: 950,
    description: 'Bifold wallet with six card slots and a coin pocket. Edges hand-burnished with beeswax for a lustrous finish.',
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    sizes: ['One Size'],
    featured: true,
  },
  {
    id: 'portefeuille-fes',
    nameFr: 'Portefeuille Fès',
    nameDarija: 'بزطام فاس',
    category: 'wallets',
    price: 1100,
    description: 'Long wallet with a zellige-inspired embossed pattern. Hand-dyed using traditional pigments from Fès.',
    colors: [
      { name: 'Indigo', hex: '#2E0854' },
      { name: 'Safran', hex: '#F4C430' },
      { name: 'Terre', hex: '#6B4423' },
    ],
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: 'portefeuille-kasbah',
    nameFr: 'Portefeuille Kasbah',
    nameDarija: 'بزطام القصبة',
    category: 'wallets',
    price: 850,
    description: 'Minimalist card holder with a single center pocket. Cut from a single piece of full-grain leather.',
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Noir', hex: '#1a1a1a' },
    ],
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: 'ceinture-sahara',
    nameFr: 'Ceinture Sahara',
    nameDarija: 'حزام الصحراء',
    category: 'belts',
    price: 1200,
    description: 'Wide belt with a solid brass buckle cast in the shape of a Berber symbol. Leather aged naturally over months.',
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Noir', hex: '#1a1a1a' },
    ],
    sizes: ['85cm', '90cm', '95cm', '100cm', '105cm'],
    featured: true,
  },
  {
    id: 'ceinture-nomade',
    nameFr: 'Ceinture Nomade',
    nameDarija: 'حزام الرحالة',
    category: 'belts',
    price: 980,
    description: 'Slim dress belt with hand-stitched edges and a brushed silver buckle. Supple yet durable.',
    colors: [
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Bordeaux', hex: '#4A0E0E' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    sizes: ['85cm', '90cm', '95cm', '100cm'],
    featured: false,
  },
  {
    id: 'ceinture-berbere',
    nameFr: 'Ceinture Berbère',
    nameDarija: 'حزام أمازيغي',
    category: 'belts',
    price: 1400,
    description: 'Statement belt featuring hand-woven leather strands and antique brass rings. Each one unique.',
    colors: [
      { name: 'Terre', hex: '#6B4423' },
      { name: 'Miel', hex: '#EB9605' },
    ],
    sizes: ['90cm', '95cm', '100cm'],
    featured: false,
  },
  {
    id: 'babouche-royale',
    nameFr: 'Babouche Royale',
    nameDarija: 'بلغة ملكية',
    category: 'accessories',
    price: 750,
    description: 'Traditional Moroccan slipper reimagined with gold-leaf accents and cushioned insole. Handmade in one piece.',
    colors: [
      { name: 'Or', hex: '#C8A05A' },
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Bordeaux', hex: '#4A0E0E' },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    featured: true,
  },
  {
    id: 'etui-menthe',
    nameFr: 'Étui à Thé Menthe',
    nameDarija: 'غلاف أتاي',
    category: 'accessories',
    price: 450,
    description: 'Leather sleeve for Moroccan tea glasses. Protects hands from heat while adding elegance to the ritual.',
    colors: [
      { name: 'Vert', hex: '#2D5A27' },
      { name: 'Cognac', hex: '#8B4513' },
    ],
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: 'pochette-zellige',
    nameFr: 'Pochette Zellige',
    nameDarija: 'بوشيطة الزليج',
    category: 'accessories',
    price: 1600,
    description: 'Clutch with laser-cut zellige pattern overlay. Interior lined with hand-loomed cotton from Essaouira.',
    colors: [
      { name: 'Ivoire', hex: '#F0E8D8' },
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Cognac', hex: '#8B4513' },
    ],
    sizes: ['One Size'],
    featured: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
