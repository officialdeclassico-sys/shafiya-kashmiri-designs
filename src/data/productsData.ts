import { getAssetUrl } from '../utils/assetPath';

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export const ALL_SIZES: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export type ProductCategoryOption =
  | 'Kurtas'
  | 'Kurta Sets'
  | 'Palazzo Sets'
  | 'Pant Sets'
  | 'Dupatta Sets'
  | 'Kashmiri Embroidered Suits'
  | 'Suits'
  | 'Pherans'
  | 'Shawls'
  | 'Stoles'
  | 'Accessories';

export const ALL_CATALOG_CATEGORIES: ProductCategoryOption[] = [
  'Kurtas',
  'Kurta Sets',
  'Palazzo Sets',
  'Pant Sets',
  'Dupatta Sets',
  'Kashmiri Embroidered Suits',
  'Pherans',
  'Shawls',
  'Stoles',
  'Accessories',
];

export interface ProductGalleryItem {
  id: string;
  url: string;
  thumbUrl?: string;
  label: string;
  isVideoPreview?: boolean;
  imageFilter?: string;
  cropClass?: string;
}

export interface ProductColourVariant {
  name: string;
  hex: string;
  filterGroup: string;
  image: string;
  imageFilter?: string;
  availableSizes: SizeOption[];
}

export interface ProductReviewItem {
  id: string;
  author: string;
  avatar?: string;
  verifiedPurchase?: boolean;
  rating: number;
  date: string;
  variantLabel: string;
  comment: string;
  photos?: string[];
  helpfulCount?: number;
}

export interface SizeMeasurementRow {
  size: SizeOption;
  bustIn: string;
  waistIn: string;
  hipIn: string;
  lengthIn: string;
  bustCm: string;
  waistCm: string;
  hipCm: string;
  lengthCm: string;
}

/**
 * Structured product model ready for Admin Panel / CMS inventory management.
 * Note: Items in DEMO_CATALOG_PRODUCTS are marked `isDemoCatalogItem: true`
 * to clearly distinguish demonstration catalogue records from live warehouse stock.
 */
export interface CatalogProduct {
  id: string;
  slug: string;
  isDemoCatalogItem?: boolean;
  brand: string;
  name: string;
  category: ProductCategoryOption;
  collectionGroup: string;
  workType:
    | 'Kiran Border'
    | 'Kashmiri Aari'
    | 'Sozni Embroidery'
    | 'Zari & Gota'
    | 'Tilla Work'
    | 'Printed & Embroidered';
  fabric:
    | 'Cotton Silk'
    | 'Pure Silk'
    | 'Georgette'
    | 'Chiffon'
    | 'Wool Blend';
  price: number;
  originalPrice: number;
  discountPercent: number;
  topDiscountBadge?: string;
  assuredBadge?: boolean;
  lowStockLabel?: string;
  stockQuantity: number;
  availabilityStatus: 'In Stock' | 'Low Stock';
  rating: number;
  reviewCount: number;
  soldCount: number;
  sku: string;
  popularityRank: number;
  newestRank: number;
  defaultSize: SizeOption;
  extraColourCount: number;
  colours: ProductColourVariant[];
  gallery: ProductGalleryItem[];
  shortDescription: string;
  productDetailsSummary: string;
  specifications: { label: string; value: string }[];
  fabricAndCare: {
    fabricComposition: string;
    weaveAndEmbroidery: string;
    careInstructions: string[];
  };
  sizeAndFit: {
    fitDescription: string;
    modelInfo: string;
    garmentNote: string;
  };
  shippingAndReturns: {
    shippingNote: string;
    returnsNote: string;
    packagingNote: string;
  };
  reviews: ProductReviewItem[];
}

export const SAMPLE_SIZE_GUIDE_CHART: SizeMeasurementRow[] = [
  {
    size: 'XS',
    bustIn: '32',
    waistIn: '26',
    hipIn: '34',
    lengthIn: '44',
    bustCm: '81',
    waistCm: '66',
    hipCm: '86',
    lengthCm: '112',
  },
  {
    size: 'S',
    bustIn: '34',
    waistIn: '28',
    hipIn: '36',
    lengthIn: '44',
    bustCm: '86',
    waistCm: '71',
    hipCm: '91',
    lengthCm: '112',
  },
  {
    size: 'M',
    bustIn: '36',
    waistIn: '30',
    hipIn: '38',
    lengthIn: '45',
    bustCm: '91',
    waistCm: '76',
    hipCm: '97',
    lengthCm: '114',
  },
  {
    size: 'L',
    bustIn: '38',
    waistIn: '32',
    hipIn: '40',
    lengthIn: '45',
    bustCm: '97',
    waistCm: '81',
    hipCm: '102',
    lengthCm: '114',
  },
  {
    size: 'XL',
    bustIn: '40',
    waistIn: '34',
    hipIn: '42',
    lengthIn: '46',
    bustCm: '102',
    waistCm: '86',
    hipCm: '107',
    lengthCm: '117',
  },
  {
    size: 'XXL',
    bustIn: '42',
    waistIn: '36',
    hipIn: '44',
    lengthIn: '46',
    bustCm: '107',
    waistCm: '91',
    hipCm: '112',
    lengthCm: '117',
  },
];

// Shared default reviews helper for demonstration products beyond the primary 4
function createDemoReviews(
  productId: string,
  colourName: string,
  defaultSize: SizeOption,
  primaryPhoto: string
): ProductReviewItem[] {
  return [
    {
      id: `${productId}-rev-1`,
      author: 'Priya S.',
      avatar: getAssetUrl('assets/aistudio/pdp_thumb_3.png'),
      verifiedPurchase: true,
      rating: 5,
      date: '5 days ago',
      variantLabel: `Colour: ${colourName} · Size: ${defaultSize}`,
      comment:
        'Beautiful fabric and amazing quality. The Kashmiri embroidery is really elegant and finely finished. Fits perfectly!',
      photos: [
        getAssetUrl(primaryPhoto),
        getAssetUrl('assets/aistudio/pdp_thumb_3.png'),
        getAssetUrl('assets/aistudio/pdp_thumb_4.png'),
      ],
      helpfulCount: 12,
    },
    {
      id: `${productId}-rev-2`,
      author: 'Ananya K.',
      avatar: getAssetUrl('assets/aistudio/cat_1_shawls.png'),
      verifiedPurchase: true,
      rating: 5,
      date: '2 weeks ago',
      variantLabel: `Colour: ${colourName} · Size: ${defaultSize}`,
      comment:
        'Loved the design and material. Worth the price. Wore it to a family celebration and received so many compliments on the needlework.',
      helpfulCount: 8,
    },
    {
      id: `${productId}-rev-3`,
      author: 'Meera R.',
      avatar: getAssetUrl('assets/aistudio/cat_2_suits.png'),
      verifiedPurchase: true,
      rating: 4,
      date: '3 weeks ago',
      variantLabel: `Colour: ${colourName} · Size: L`,
      comment:
        'The drape and border detailing are very graceful. True to the Shafiya size guide measurements.',
      photos: [getAssetUrl('assets/aistudio/pdp_thumb_4.png')],
      helpfulCount: 5,
    },
    {
      id: `${productId}-rev-4`,
      author: 'Zoya H.',
      avatar: getAssetUrl('assets/aistudio/cat_3_pherans.png'),
      verifiedPurchase: true,
      rating: 5,
      date: '1 month ago',
      variantLabel: `Colour: ${colourName} · Size: S`,
      comment:
        'Authentic Kashmiri craftsmanship with a modern silhouette. Packaging was also very neat and protective.',
      helpfulCount: 4,
    },
  ];
}

function buildFourGalleryImages(
  prefix: string,
  mainImg: string,
  secondaryImg: string,
  detailImg: string,
  mainFilter?: string
): ProductGalleryItem[] {
  const resolvedMain = getAssetUrl(mainImg);
  const resolvedSecondary = getAssetUrl(secondaryImg);
  const resolvedDetail = getAssetUrl(detailImg);

  return [
    {
      id: `${prefix}-g1`,
      url: resolvedMain,
      thumbUrl: resolvedMain,
      label: 'Full-Length Front View',
      imageFilter: mainFilter,
    },
    {
      id: `${prefix}-g2`,
      url: resolvedMain,
      thumbUrl: resolvedMain,
      label: 'Neckline & Yoke Close-Up',
      cropClass: 'scale-135 object-top',
      imageFilter: mainFilter,
    },
    {
      id: `${prefix}-g3`,
      url: resolvedMain,
      thumbUrl: resolvedMain,
      label: 'Border & Hemline Craft Detail',
      cropClass: 'scale-135 object-bottom',
      imageFilter: mainFilter,
    },
    {
      id: `${prefix}-g4`,
      url: resolvedDetail,
      thumbUrl: resolvedDetail,
      label: 'Kashmiri Needlework Close-Up',
    },
    {
      id: `${prefix}-g5`,
      url: resolvedSecondary,
      thumbUrl: resolvedSecondary,
      label: '360° Fabric Drape & Motion Preview',
      isVideoPreview: true,
      cropClass: 'scale-115 object-center',
    },
    {
      id: `${prefix}-g6`,
      url: resolvedMain,
      thumbUrl: resolvedMain,
      label: 'Back & Silhouette Fall View',
      cropClass: 'scale-110 object-center',
      imageFilter: mainFilter,
    },
  ];
}

// ============================================================================
// DEMONSTRATION PRODUCT CATALOGUE (24 DISTINCT PRODUCTS ACROSS 10 CATEGORIES)
// ============================================================================
const RAW_CATALOG_PRODUCTS: CatalogProduct[] = [
  // -------------------------------------------------------------------------
  // 1. KURTAS — Women Cotton Silk Kurta Salwar Dupatta Set (Reference Card 1)
  // -------------------------------------------------------------------------
  {
    id: 'women-cotton-silk-kurta-salwar-dupatta-set',
    slug: 'women-cotton-silk-kurta-salwar-dupatta-set',
    isDemoCatalogItem: true,
    brand: 'Ethnic Junction',
    name: 'Women Cotton Silk Kurta Salwar Dupatta Set',
    category: 'Kurtas',
    collectionGroup: 'Kurtas',
    workType: 'Kiran Border',
    fabric: 'Cotton Silk',
    price: 808,
    originalPrice: 5426,
    discountPercent: 85,
    topDiscountBadge: 'Top Discount of the Sale',
    stockQuantity: 12,
    availabilityStatus: 'In Stock',
    rating: 4.6,
    reviewCount: 124,
    soldCount: 253,
    sku: 'SHF-EJ-KB-808',
    popularityRank: 1,
    newestRank: 2,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Black',
        hex: '#101014',
        filterGroup: 'Black',
        image: '/assets/aistudio/plp_prod_1.png',
        imageFilter: 'none',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Champagne Beige',
        hex: '#ead5bd',
        filterGroup: 'Beige',
        image: '/assets/aistudio/plp_prod_1.png',
        imageFilter: 'sepia(0.28) brightness(1.08) saturate(1.1)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Blush Pink',
        hex: '#eb93a4',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_1.png',
        imageFilter: 'hue-rotate(315deg) saturate(1.22) brightness(1.04)',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Dusty Rose',
        hex: '#d49098',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_1.png',
        imageFilter: 'hue-rotate(330deg) saturate(1.15) contrast(1.02)',
        availableSizes: ['XS', 'M', 'L', 'XL'],
      },
      {
        name: 'Mist Blue',
        hex: '#d5dfe4',
        filterGroup: 'Blue',
        image: '/assets/aistudio/plp_prod_1.png',
        imageFilter: 'hue-rotate(175deg) saturate(1.08) brightness(1.05)',
        availableSizes: ['M', 'L', 'XL', 'XXL'],
      },
    ],
    gallery: [
      {
        id: 'front-full',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/plp_prod_1.png',
        label: 'Full-Length Front View',
      },
      {
        id: 'side-drape',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/pdp_thumb_2.png',
        label: 'Side Silhouette & Dupatta Drape',
        cropClass: 'scale-110 object-top',
      },
      {
        id: 'portrait-closeup',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/pdp_thumb_3.png',
        label: 'Neckline & Portrait Close-Up',
        cropClass: 'scale-150 object-top',
      },
      {
        id: 'border-closeup',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/pdp_thumb_4.png',
        label: 'Kiran Border & Zari Embroidery Detail',
        cropClass: 'scale-150 object-bottom',
      },
      {
        id: 'drape-showcase',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/pdp_thumb_5.png',
        label: '360° Movement & Fabric Flow Preview',
        isVideoPreview: true,
        cropClass: 'scale-125 object-center',
      },
      {
        id: 'back-zari-detail',
        url: '/assets/aistudio/pdp_main_1.png',
        thumbUrl: '/assets/aistudio/pdp_thumb_2.png',
        label: 'Salwar Ankle & Dupatta Fall View',
        cropClass: 'scale-115 object-bottom',
      },
    ],
    shortDescription:
      'Elegant cotton silk kurta set with intricate Kashmiri-inspired embroidery, paired with comfortable salwar and a graceful dupatta. A perfect blend of tradition and everyday elegance.',
    productDetailsSummary:
      'This beautifully crafted cotton silk kurta set features intricate Kashmiri-inspired embroidery, blending traditional artistry with modern elegance. Perfect for festive occasions, family gatherings, or everyday ethnic wear.',
    specifications: [
      { label: 'Set Includes', value: 'Kurta, Salwar & Embroidered Organza-Silk Dupatta' },
      { label: 'Work Type', value: 'Kiran Border & Kashmiri Zari Trim' },
      { label: 'Neckline & Sleeves', value: 'V-Neckline · Three-Quarter Sleeves' },
      { label: 'Bottom Style', value: 'Pleated Salwar with Woven Zari Ankle Border' },
    ],
    fabricAndCare: {
      fabricComposition:
        'Kurta & Salwar: Breathable Cotton Silk Blend · Dupatta: Chanderi Organza Silk with Zari Border',
      weaveAndEmbroidery:
        'Metallic Kiran border edging along the kurta hem, sleeves, and salwar cuffs.',
      careInstructions: [
        'Dry clean recommended for the first two washes to preserve metallic Zari sheen.',
        'Gentle hand wash separately in cold water with mild liquid silk detergent.',
        'Dry in shade; steam iron on low heat from the reverse side.',
      ],
    },
    sizeAndFit: {
      fitDescription: 'Regular A-Line Kurta fit with relaxed pleated Salwar.',
      modelInfo: 'Model is 5\'7" (170 cm) and is wearing Size M.',
      garmentNote: 'Select your standard size for a tailored ethnic silhouette.',
    },
    shippingAndReturns: {
      shippingNote: 'Eligible for Free Shipping. Dispatched in protective garment packaging.',
      returnsNote:
        'Easy returns and size exchanges supported within the applicable return window for unworn items with original tags intact.',
      packagingNote: 'Shipped with quality verification from our fulfilment partner.',
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Priya S.',
        avatar: '/assets/aistudio/pdp_thumb_3.png',
        verifiedPurchase: true,
        rating: 5,
        date: '5 days ago',
        variantLabel: 'Colour: Black · Size: M',
        comment:
          'Beautiful fabric and amazing quality. The embroidery is really elegant. Fits perfectly! The contrast between the jet-black cotton silk kurta and the golden Kiran border dupatta looks regal in person.',
        photos: [
          '/assets/aistudio/pdp_thumb_2.png',
          '/assets/aistudio/pdp_thumb_3.png',
          '/assets/aistudio/pdp_thumb_4.png',
        ],
        helpfulCount: 12,
      },
      {
        id: 'rev-2',
        author: 'Ananya K.',
        avatar: '/assets/aistudio/cat_1_shawls.png',
        verifiedPurchase: true,
        rating: 5,
        date: '2 weeks ago',
        variantLabel: 'Colour: Black · Size: M',
        comment:
          'Loved the design and material. Worth the price. Wore it for an evening family gathering and received so many compliments on the dupatta border.',
        helpfulCount: 8,
      },
      {
        id: 'rev-3',
        author: 'Meera R.',
        avatar: '/assets/aistudio/cat_2_suits.png',
        verifiedPurchase: true,
        rating: 4,
        date: '3 weeks ago',
        variantLabel: 'Colour: Champagne Beige · Size: L',
        comment:
          'Fabric has a lovely subtle sheen and the salwar border work is very neat. True to the size chart.',
        photos: ['/assets/aistudio/pdp_thumb_4.png'],
        helpfulCount: 5,
      },
      {
        id: 'rev-4',
        author: 'Farah D.',
        avatar: '/assets/aistudio/cat_3_pherans.png',
        verifiedPurchase: true,
        rating: 5,
        date: '1 month ago',
        variantLabel: 'Colour: Blush Pink · Size: S',
        comment:
          'Lightweight yet festive! The dupatta length is generous and the zari border does not scratch at all.',
        photos: ['/assets/aistudio/pdp_thumb_2.png'],
        helpfulCount: 9,
      },
      {
        id: 'rev-5',
        author: 'Kavita N.',
        avatar: '/assets/aistudio/cat_4_stoles.png',
        verifiedPurchase: true,
        rating: 4,
        date: '1 month ago',
        variantLabel: 'Colour: Black · Size: XL',
        comment:
          'Very comfortable cotton silk blend for all-day wear. Delivery was prompt and well packed.',
        helpfulCount: 3,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. KURTAS — Women Silk Blend Kurti Palazzo Attached Dupatta Set (Ref Card 2)
  // -------------------------------------------------------------------------
  {
    id: 'women-silk-blend-kurti-palazzo-attached-dupatta-set',
    slug: 'women-silk-blend-kurti-palazzo-attached-dupatta-set',
    isDemoCatalogItem: true,
    brand: 'RILLOURA',
    name: 'Women Silk Blend Kurti Palazzo Attached Dupatta Set',
    category: 'Kurtas',
    collectionGroup: 'Kurtas',
    workType: 'Kiran Border',
    fabric: 'Pure Silk',
    price: 834,
    originalPrice: 3500,
    discountPercent: 76,
    topDiscountBadge: 'Festive Bestseller',
    stockQuantity: 9,
    availabilityStatus: 'In Stock',
    rating: 4.5,
    reviewCount: 98,
    soldCount: 189,
    sku: 'SHF-RIL-SB-834',
    popularityRank: 2,
    newestRank: 1,
    defaultSize: 'S',
    extraColourCount: 4,
    colours: [
      {
        name: 'Espresso Rose',
        hex: '#432616',
        filterGroup: 'Brown',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'none',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Petal Blush',
        hex: '#d9b9ad',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'brightness(1.06) saturate(0.92)',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
      {
        name: 'Dusty Mauve',
        hex: '#c8a69c',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'hue-rotate(340deg) saturate(1.05)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Lotus Pink',
        hex: '#e89eb0',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'saturate(1.18) contrast(1.02)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Rani Rose',
        hex: '#ec6988',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'hue-rotate(350deg) saturate(1.3)',
        availableSizes: ['S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'ril',
      '/assets/aistudio/plp_prod_2.png',
      '/assets/aistudio/cat_2_suits.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Luminous blush-rose silk blend kurti paired with wide-leg palazzos and an attached pre-draped dupatta adorned with shimmering Kiran and mirror-zari borders.',
    productDetailsSummary:
      'Designed for effortless celebration wear, this RILLOURA silk blend ensemble features a sculpted sweetheart yoke with intricate zari and sequin work, finished with wide Kiran borders on the cuffs and hem.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Kurti, Wide-Leg Palazzo & Attached Dupatta' },
      { label: 'Work Type', value: 'Kiran Border, Zari & Mirror-Foil Embroidery' },
      { label: 'Neckline & Sleeves', value: 'Sweetheart Neckline · Bell Cuffed Sleeves' },
      { label: 'Available Sizes', value: 'XS, S, M, L, XL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Lustrous Tissue Silk Blend with soft crepe inner lining.',
      weaveAndEmbroidery: 'Hand-guided zari and Kiran border trim along neckline, cuffs, and hemline.',
      careInstructions: [
        'Specialist dry clean only to protect tissue silk lustre and mirror work.',
        'Store on a padded hanger or folded in muslin cloth.',
      ],
    },
    sizeAndFit: {
      fitDescription: 'Relaxed festive kurti fit with high-waisted flared palazzo trousers.',
      modelInfo: 'Model is 5\'6" (168 cm) and is wearing Size S.',
      garmentNote: 'Attached dupatta drapes effortlessly over the shoulder without pinning.',
    },
    shippingAndReturns: {
      shippingNote: 'Eligible for Free Shipping on all prepaid and standard orders.',
      returnsNote: 'Easy returns and size exchanges supported within the standard return policy.',
      packagingNote: 'Delivered in protective Shafiya festive packaging.',
    },
    reviews: createDemoReviews(
      'ril',
      'Petal Blush',
      'S',
      '/assets/aistudio/plp_prod_2.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 3. KURTAS — Women Pure Silk Kurta Palazzo Set (Reference Card 3)
  // -------------------------------------------------------------------------
  {
    id: 'women-pure-silk-kurta-palazzo-set',
    slug: 'women-pure-silk-kurta-palazzo-set',
    isDemoCatalogItem: true,
    brand: 'Colors of Earth',
    name: 'Women Pure Silk Kurta Palazzo Set',
    category: 'Kurtas',
    collectionGroup: 'Kurtas',
    workType: 'Kiran Border',
    fabric: 'Pure Silk',
    price: 914,
    originalPrice: 3899,
    discountPercent: 76,
    assuredBadge: true,
    topDiscountBadge: 'Assured Quality Edit',
    stockQuantity: 15,
    availabilityStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 162,
    soldCount: 310,
    sku: 'SHF-COE-PS-914',
    popularityRank: 3,
    newestRank: 4,
    defaultSize: 'L',
    extraColourCount: 2,
    colours: [
      {
        name: 'Antique Gold',
        hex: '#b5895a',
        filterGroup: 'Gold',
        image: '/assets/aistudio/plp_prod_3.png',
        imageFilter: 'none',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Burnished Bronze',
        hex: '#74563c',
        filterGroup: 'Brown',
        image: '/assets/aistudio/plp_prod_3.png',
        imageFilter: 'contrast(1.08) brightness(0.95)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Mulberry Wine',
        hex: '#54292c',
        filterGroup: 'Wine',
        image: '/assets/aistudio/plp_prod_3.png',
        imageFilter: 'hue-rotate(310deg) saturate(1.25) brightness(0.92)',
        availableSizes: ['M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Warm Ivory',
        hex: '#e5d0cb',
        filterGroup: 'Beige',
        image: '/assets/aistudio/plp_prod_3.png',
        imageFilter: 'brightness(1.12) saturate(0.8)',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'coe',
      '/assets/aistudio/plp_prod_3.png',
      '/assets/aistudio/cat_2_suits.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Hand-finished pure silk sleeveless kurta and palazzo ensemble in antique bronze-gold, highlighted with an intricately embroidered Kashmiri geometric yoke and Kiran zari borders.',
    productDetailsSummary:
      'Crafted by Colors of Earth, this pure silk kurta and wide-leg palazzo set pairs a richly embroidered geometric neckline with a translucent organza-silk overlay and metallic border framing.',
    specifications: [
      { label: 'Set Includes', value: 'Pure Silk Kurta & Matching Wide-Leg Palazzo' },
      { label: 'Work Type', value: 'Kiran Border & Tilla-Inspired Yoke Embroidery' },
      { label: 'Quality Badge', value: 'Shafiya Assured Quality Checked' },
      { label: 'Available Sizes', value: 'S, M, L, XL, XXL' },
    ],
    fabricAndCare: {
      fabricComposition: '100% Pure Chanderi & Mulberry Silk with breathable cotton-silk lining.',
      weaveAndEmbroidery: 'Intricate antique gold threadwork across the bib yoke and border slits.',
      careInstructions: [
        'Dry clean only to maintain pure silk structure and antique zari embroidery.',
        'Avoid direct contact with moisture or perfumes.',
      ],
    },
    sizeAndFit: {
      fitDescription: 'Straight-cut sleeveless kurta with ankle-length parallel palazzos.',
      modelInfo: 'Model is 5\'8" (173 cm) and is wearing Size L.',
      garmentNote: 'Includes internal seam allowance for minor custom adjustments.',
    },
    shippingAndReturns: {
      shippingNote: 'Eligible for Free Shipping across India.',
      returnsNote: 'Easy returns and exchanges supported on unworn items with original tags.',
      packagingNote: 'Packaged with heirloom tissue wrap.',
    },
    reviews: createDemoReviews(
      'coe',
      'Antique Gold',
      'L',
      '/assets/aistudio/plp_prod_3.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 4. KURTAS — Women Georgette Kurta Pant Dupatta Set (Reference Card 4)
  // -------------------------------------------------------------------------
  {
    id: 'women-georgette-kurta-pant-dupatta-set',
    slug: 'women-georgette-kurta-pant-dupatta-set',
    isDemoCatalogItem: true,
    brand: 'Trijal Fab',
    name: 'Women Georgette Kurta Pant Dupatta Set',
    category: 'Kurtas',
    collectionGroup: 'Kurtas',
    workType: 'Kiran Border',
    fabric: 'Georgette',
    price: 761,
    originalPrice: 2999,
    discountPercent: 74,
    lowStockLabel: 'Only 1 left',
    topDiscountBadge: 'Limited Stock Deal',
    stockQuantity: 1,
    availabilityStatus: 'Low Stock',
    rating: 4.5,
    reviewCount: 87,
    soldCount: 194,
    sku: 'SHF-TF-GK-761',
    popularityRank: 4,
    newestRank: 3,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Rust Brown',
        hex: '#683716',
        filterGroup: 'Brown',
        image: '/assets/aistudio/plp_prod_4.png',
        imageFilter: 'hue-rotate(25deg) saturate(0.95)',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
      {
        name: 'Crimson Magenta',
        hex: '#5e2129',
        filterGroup: 'Wine',
        image: '/assets/aistudio/plp_prod_4.png',
        imageFilter: 'none',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
      {
        name: 'Soft Peach',
        hex: '#f3dfd1',
        filterGroup: 'Beige',
        image: '/assets/aistudio/plp_prod_4.png',
        imageFilter: 'brightness(1.12) saturate(0.85)',
        availableSizes: ['S', 'M'],
      },
      {
        name: 'Rose Pink',
        hex: '#ec799a',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_4.png',
        imageFilter: 'brightness(1.06) saturate(1.15)',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'tf',
      '/assets/aistudio/plp_prod_4.png',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Rich crimson-magenta georgette kurta and tailored pant set paired with a heavily embroidered floral jaal dupatta edged in silver-gold Kiran border trim.',
    productDetailsSummary:
      'Featuring all-over floral bootis and an intricately worked Kashmiri-style neckline and damman border, this Trijal Fab georgette three-piece set brings vibrant festive colour and fluid grace.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Kurta, Tailored Pant & Heavy Floral Dupatta' },
      { label: 'Work Type', value: 'Kiran Border, Resham & Sequin Floral Jaal' },
      { label: 'Stock Note', value: 'Only 1 unit remaining in current artisanal batch' },
      { label: 'Available Sizes', value: 'XS, S, M, L' },
    ],
    fabricAndCare: {
      fabricComposition: 'High-twist Faux Georgette with soft santoon inner lining.',
      weaveAndEmbroidery: 'Dense floral jaal embroidery across the dupatta with Kiran border edging.',
      careInstructions: [
        'Gentle dry clean recommended.',
        'Do not wring or bleach; steam press from reverse.',
      ],
    },
    sizeAndFit: {
      fitDescription: 'Tailored straight kurta with cigarette-fit embroidered ankle pants.',
      modelInfo: 'Model is 5\'6" (168 cm) and is wearing Size M.',
      garmentNote: 'Maximum order quantity for this item is limited to current stock (1 unit).',
    },
    shippingAndReturns: {
      shippingNote: 'Eligible for Free Shipping. Ready for immediate dispatch.',
      returnsNote: 'Easy returns and exchanges supported within standard policy guidelines.',
      packagingNote: 'Carefully folded with acid-free tissue protection.',
    },
    reviews: createDemoReviews(
      'tf',
      'Crimson Magenta',
      'M',
      '/assets/aistudio/plp_prod_4.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 5. KURTA SETS — Nishat Garden Lavender Silk Kurta Dupatta Set
  // -------------------------------------------------------------------------
  {
    id: 'nishat-lavender-silk-kurta-set',
    slug: 'nishat-lavender-silk-kurta-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Nishat Garden Lavender Silk Kurta Dupatta Set',
    category: 'Kurta Sets',
    collectionGroup: 'Kurta Sets',
    workType: 'Sozni Embroidery',
    fabric: 'Pure Silk',
    price: 1890,
    originalPrice: 4999,
    discountPercent: 62,
    assuredBadge: true,
    topDiscountBadge: 'Valley Bestseller',
    stockQuantity: 8,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 74,
    soldCount: 142,
    sku: 'SHF-NG-LS-1890',
    popularityRank: 5,
    newestRank: 5,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Lavender Mist',
        hex: '#c6b4f7',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_2_suits.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Blush Rose',
        hex: '#f4b8c8',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_2_suits.png',
        imageFilter: 'hue-rotate(45deg) saturate(1.08)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Powder Blue',
        hex: '#bdd8f2',
        filterGroup: 'Blue',
        image: '/assets/aistudio/cat_2_suits.png',
        imageFilter: 'hue-rotate(285deg) saturate(1.05)',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'ng',
      '/assets/aistudio/cat_2_suits.png',
      '/assets/aistudio/plp_prod_2.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Pastel lavender mulberry silk three-piece kurta set adorned with delicate Kashmiri Sozni floral vines along the neckline and organza dupatta.',
    productDetailsSummary:
      'Inspired by the terraced blooms of Nishat Bagh, this pastel lavender silk ensemble pairs whisper-soft mulberry silk with authentic Kashmiri floral needlework.',
    specifications: [
      { label: 'Set Includes', value: 'Silk Kurta, Straight Trouser & Embroidered Dupatta' },
      { label: 'Work Type', value: 'Sozni Embroidery & Delicate Floral Bootis' },
      { label: 'Neckline & Sleeves', value: 'Round Split Neck · Full Sleeves' },
      { label: 'Occasion', value: 'Daytime Celebrations & Festive Gatherings' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Kashmiri Mulberry Silk Blend.',
      weaveAndEmbroidery: 'Artisan-guided Sozni floral motifs.',
      careInstructions: ['Dry clean only.', 'Store in breathable muslin bag.'],
    },
    sizeAndFit: {
      fitDescription: 'Comfortable straight-fit silhouette.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to standard Shafiya sizing.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on eligible orders.',
      returnsNote: 'Easy 14-day return and exchange policy.',
      packagingNote: 'Ships from our Srinagar atelier.',
    },
    reviews: createDemoReviews(
      'ng',
      'Lavender Mist',
      'M',
      '/assets/aistudio/cat_2_suits.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 6. KURTA SETS — Verinag Emerald Chinar Cotton Silk Kurta Set
  // -------------------------------------------------------------------------
  {
    id: 'verinag-emerald-chinar-kurta-set',
    slug: 'verinag-emerald-chinar-kurta-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Heritage',
    name: 'Verinag Emerald Chinar Cotton Silk Kurta Set',
    category: 'Kurta Sets',
    collectionGroup: 'Kurta Sets',
    workType: 'Kashmiri Aari',
    fabric: 'Cotton Silk',
    price: 1495,
    originalPrice: 3990,
    discountPercent: 63,
    stockQuantity: 11,
    availabilityStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 68,
    soldCount: 154,
    sku: 'SHF-VE-CK-1495',
    popularityRank: 6,
    newestRank: 6,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Forest Charcoal',
        hex: '#1c2a24',
        filterGroup: 'Black',
        image: '/assets/aistudio/pdp_thumb_2.png',
        imageFilter: 'hue-rotate(95deg) saturate(1.15)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Golden Ochre',
        hex: '#c9974c',
        filterGroup: 'Gold',
        image: '/assets/aistudio/pdp_thumb_2.png',
        imageFilter: 'sepia(0.35) saturate(1.25)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      've',
      '/assets/aistudio/pdp_thumb_2.png',
      '/assets/aistudio/pdp_main_1.png',
      '/assets/aistudio/pdp_thumb_4.png',
      'hue-rotate(95deg) saturate(1.15)'
    ),
    shortDescription:
      'Deep emerald-toned cotton silk kurta set featuring hand-guided Kashmiri Chinar leaf Aari work and a contrast zari-bordered organza dupatta.',
    productDetailsSummary:
      'Drawing inspiration from the tranquil waters of Verinag Spring, this structured cotton silk kurta set balances everyday comfort with heirloom Kashmiri border artistry.',
    specifications: [
      { label: 'Set Includes', value: 'Chinar Embroidered Kurta, Tapered Salwar & Dupatta' },
      { label: 'Work Type', value: 'Kashmiri Aari & Zari Border' },
      { label: 'Neckline', value: 'Notched Mandarin Collar' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: '80% Combed Cotton, 20% Mulberry Silk.',
      weaveAndEmbroidery: 'Fine Aari chain-stitch Chinar motifs.',
      careInstructions: ['Gentle hand wash or dry clean.', 'Steam iron on reverse.'],
    },
    sizeAndFit: {
      fitDescription: 'Tailored straight kurta with relaxed salwar.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day returns and exchanges.',
      packagingNote: 'Protective garment pouch included.',
    },
    reviews: createDemoReviews(
      've',
      'Forest Charcoal',
      'M',
      '/assets/aistudio/pdp_thumb_2.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 7. PALAZZO SETS — Shalimar Ivory Botanical Aari Kurta Palazzo Set
  // -------------------------------------------------------------------------
  {
    id: 'shalimar-ivory-botanical-pheran-set',
    slug: 'shalimar-ivory-botanical-pheran-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Shalimar Ivory Botanical Aari Kurta Palazzo Set',
    category: 'Palazzo Sets',
    collectionGroup: 'Palazzo Sets',
    workType: 'Kashmiri Aari',
    fabric: 'Wool Blend',
    price: 2150,
    originalPrice: 4800,
    discountPercent: 55,
    assuredBadge: true,
    stockQuantity: 6,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 91,
    soldCount: 176,
    sku: 'SHF-SI-BP-2150',
    popularityRank: 7,
    newestRank: 7,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Warm Ivory',
        hex: '#efe6da',
        filterGroup: 'Beige',
        image: '/assets/aistudio/cat_3_pherans.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Midnight Black',
        hex: '#19191d',
        filterGroup: 'Black',
        image: '/assets/aistudio/cat_6_custom.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'si',
      '/assets/aistudio/cat_3_pherans.png',
      '/assets/aistudio/cat_6_custom.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Warm ivory cashmere-wool blend kurta and flared palazzo set featuring multicolour hand-knotted Kashmiri Aari chinar and blossom motifs.',
    productDetailsSummary:
      'Reimagining classic Kashmiri botanical needlework for contemporary wardrobes, this ivory palazzo ensemble showcases vibrant floral Aari embroidery across the neckline, cuffs, and side slits.',
    specifications: [
      { label: 'Set Includes', value: 'Aari Embroidered Kurta & Matching Wide-Leg Palazzo' },
      { label: 'Work Type', value: 'Hand-Knotted Kashmiri Floral Aari' },
      { label: 'Neckline & Sleeves', value: 'Embroidered Keyhole Neck · Bell Sleeves' },
      { label: 'Available Sizes', value: 'XS, S, M, L, XL, XXL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Fine Cashmere-Wool & Cotton Silk Blend.',
      weaveAndEmbroidery: 'Traditional hooked-needle Aari chain-stitch floral embroidery.',
      careInstructions: ['Dry clean only.', 'Store flat in cool dry space.'],
    },
    sizeAndFit: {
      fitDescription: 'Relaxed straight kurta with wide-flared palazzos.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'Designed for effortless layering.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy returns and size exchanges supported.',
      packagingNote: 'Packaged in signature Shafiya box.',
    },
    reviews: createDemoReviews(
      'si',
      'Warm Ivory',
      'M',
      '/assets/aistudio/cat_3_pherans.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 8. PALAZZO SETS — Pahalgam Peach Organza Zari Palazzo Set
  // -------------------------------------------------------------------------
  {
    id: 'pahalgam-peach-organza-zari-palazzo-set',
    slug: 'pahalgam-peach-organza-zari-palazzo-set',
    isDemoCatalogItem: true,
    brand: 'RILLOURA',
    name: 'Pahalgam Peach Organza Silk Zari Palazzo Set',
    category: 'Palazzo Sets',
    collectionGroup: 'Palazzo Sets',
    workType: 'Zari & Gota',
    fabric: 'Pure Silk',
    price: 1340,
    originalPrice: 4199,
    discountPercent: 68,
    topDiscountBadge: 'Festive Edit',
    stockQuantity: 10,
    availabilityStatus: 'In Stock',
    rating: 4.6,
    reviewCount: 59,
    soldCount: 132,
    sku: 'SHF-PP-OZ-1340',
    popularityRank: 8,
    newestRank: 8,
    defaultSize: 'S',
    extraColourCount: 3,
    colours: [
      {
        name: 'Sunset Peach',
        hex: '#f3b29a',
        filterGroup: 'Pink',
        image: '/assets/aistudio/plp_prod_2.png',
        imageFilter: 'hue-rotate(18deg) saturate(1.12) brightness(1.04)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Champagne Gold',
        hex: '#e2c598',
        filterGroup: 'Gold',
        image: '/assets/aistudio/plp_prod_3.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'pp',
      '/assets/aistudio/plp_prod_2.png',
      '/assets/aistudio/plp_prod_3.png',
      '/assets/aistudio/pdp_thumb_4.png',
      'hue-rotate(18deg) saturate(1.12) brightness(1.04)'
    ),
    shortDescription:
      'Sunlit peach organza-silk kurta and flared palazzo set highlighted with Kashmiri Gota-Zari borders and delicate floral yoke work.',
    productDetailsSummary:
      'Lightweight yet celebratory, the Pahalgam Peach Palazzo Set combines shimmering silk-organza texture with artisanal zari border work along the flared hemline.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Kurti, Flared Palazzo & Organza Dupatta' },
      { label: 'Work Type', value: 'Zari & Gota Border Craft' },
      { label: 'Available Sizes', value: 'XS, S, M, L, XL' },
      { label: 'Lining', value: 'Soft Mulmul & Crepe Inner Lining' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Organza Silk with breathable lining.',
      weaveAndEmbroidery: 'Gota-patti and Kashmiri zari border detailing.',
      careInstructions: ['Dry clean recommended.', 'Steam press on low heat.'],
    },
    sizeAndFit: {
      fitDescription: 'Flared festive fit with high-rise palazzo.',
      modelInfo: 'Model is 5\'6" and is wearing Size S.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Protective tissue-lined box.',
    },
    reviews: createDemoReviews(
      'pp',
      'Sunset Peach',
      'S',
      '/assets/aistudio/plp_prod_2.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 9. PANT SETS — Midnight Bloom Kashmiri Tilla Kurta Pant Set
  // -------------------------------------------------------------------------
  {
    id: 'midnight-tilla-velvet-pant-set',
    slug: 'midnight-tilla-velvet-pant-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Midnight Bloom Kashmiri Tilla Kurta Pant Set',
    category: 'Pant Sets',
    collectionGroup: 'Pant Sets',
    workType: 'Tilla Work',
    fabric: 'Chiffon',
    price: 1680,
    originalPrice: 4200,
    discountPercent: 60,
    lowStockLabel: 'Only 2 left',
    stockQuantity: 2,
    availabilityStatus: 'Low Stock',
    rating: 4.7,
    reviewCount: 64,
    soldCount: 118,
    sku: 'SHF-MB-TP-1680',
    popularityRank: 9,
    newestRank: 9,
    defaultSize: 'L',
    extraColourCount: 2,
    colours: [
      {
        name: 'Obsidian Black',
        hex: '#141418',
        filterGroup: 'Black',
        image: '/assets/aistudio/cat_6_custom.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Crimson Wine',
        hex: '#611f2a',
        filterGroup: 'Wine',
        image: '/assets/aistudio/plp_prod_4.png',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'mb',
      '/assets/aistudio/cat_6_custom.png',
      '/assets/aistudio/plp_prod_4.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Dramatic obsidian-black kurta and cigarette pant set featuring vibrant Kashmiri floral Aari and metallic Tilla neckline embroidery.',
    productDetailsSummary:
      'A striking evening ensemble combining deep black chiffon-silk fabric with luminous coral, rose, and gold Kashmiri embroidery along the bib yoke and cuffs.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Kurta, Ankle Pant & Sheer Dupatta' },
      { label: 'Work Type', value: 'Tilla Work & Kashmiri Floral Embroidery' },
      { label: 'Neckline & Sleeves', value: 'Crew Embroidered Yoke · Full Sleeves' },
      { label: 'Available Sizes', value: 'S, M, L, XL' },
    ],
    fabricAndCare: {
      fabricComposition: 'High-density Silk Chiffon with Crepe lining.',
      weaveAndEmbroidery: 'Traditional Kashmiri Tilla and silk threadwork.',
      careInstructions: ['Dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Sleek straight kurta with tailored ankle-length pants.',
      modelInfo: 'Model is 5\'7" and is wearing Size L.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy returns and exchanges.',
      packagingNote: 'Ships from Srinagar atelier.',
    },
    reviews: createDemoReviews(
      'mb',
      'Obsidian Black',
      'L',
      '/assets/aistudio/cat_6_custom.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 10. PANT SETS — Kokernag Sapphire Georgette Embroidered Pant Set
  // -------------------------------------------------------------------------
  {
    id: 'kokernag-sapphire-georgette-pant-set',
    slug: 'kokernag-sapphire-georgette-pant-set',
    isDemoCatalogItem: true,
    brand: 'Trijal Fab',
    name: 'Kokernag Sapphire Georgette Embroidered Pant Set',
    category: 'Pant Sets',
    collectionGroup: 'Pant Sets',
    workType: 'Sozni Embroidery',
    fabric: 'Georgette',
    price: 1120,
    originalPrice: 3499,
    discountPercent: 68,
    assuredBadge: true,
    stockQuantity: 14,
    availabilityStatus: 'In Stock',
    rating: 4.6,
    reviewCount: 53,
    soldCount: 129,
    sku: 'SHF-KS-GP-1120',
    popularityRank: 10,
    newestRank: 10,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Sapphire Berry',
        hex: '#3b2447',
        filterGroup: 'Blue',
        image: '/assets/aistudio/plp_prod_4.png',
        imageFilter: 'hue-rotate(265deg) saturate(1.1)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Ruby Magenta',
        hex: '#6d1d3a',
        filterGroup: 'Wine',
        image: '/assets/aistudio/plp_prod_4.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'ks',
      '/assets/aistudio/plp_prod_4.png',
      '/assets/aistudio/pdp_main_1.png',
      '/assets/aistudio/collage_embroidery.png',
      'hue-rotate(265deg) saturate(1.1)'
    ),
    shortDescription:
      'Jewel-toned sapphire georgette kurta and cigarette pant set paired with a scalloped Sozni-inspired floral border dupatta.',
    productDetailsSummary:
      'Tailored for evening elegance, this Kokernag Sapphire Pant Set features delicate Kashmiri-style resham threadwork across the bodice and ankle-cuff trousers.',
    specifications: [
      { label: 'Set Includes', value: 'Georgette Kurta, Cigarette Pant & Embroidered Dupatta' },
      { label: 'Work Type', value: 'Sozni-Inspired Resham & Zari Threadwork' },
      { label: 'Available Sizes', value: 'XS to XXL' },
      { label: 'Quality Check', value: 'Shafiya Assured' },
    ],
    fabricAndCare: {
      fabricComposition: 'Premium Faux Georgette with soft lining.',
      weaveAndEmbroidery: 'Fine resham and metallic border embroidery.',
      careInstructions: ['Dry clean or gentle cold wash.'],
    },
    sizeAndFit: {
      fitDescription: 'Straight-fit kurta with ankle-length tapered pants.',
      modelInfo: 'Model is 5\'6" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy 14-day return window.',
      packagingNote: 'Shipped in protective garment sleeve.',
    },
    reviews: createDemoReviews(
      'ks',
      'Sapphire Berry',
      'M',
      '/assets/aistudio/plp_prod_4.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 11. DUPATTA SETS — Gulmarg Blossom Floral Aari Kurta Dupatta Set
  // -------------------------------------------------------------------------
  {
    id: 'gulmarg-blossom-aari-dupatta-set',
    slug: 'gulmarg-blossom-aari-dupatta-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Gulmarg Blossom Floral Aari Kurta Dupatta Set',
    category: 'Dupatta Sets',
    collectionGroup: 'Dupatta Sets',
    workType: 'Kashmiri Aari',
    fabric: 'Cotton Silk',
    price: 2450,
    originalPrice: 4900,
    discountPercent: 50,
    topDiscountBadge: 'Signature Heritage Edit',
    stockQuantity: 5,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 112,
    soldCount: 204,
    sku: 'SHF-GB-AD-2450',
    popularityRank: 11,
    newestRank: 11,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Ivory Rose',
        hex: '#f6d8dc',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_1_shawls.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Saffron Gold',
        hex: '#e4b869',
        filterGroup: 'Gold',
        image: '/assets/aistudio/cat_4_stoles.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'gb',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/cat_4_stoles.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Signature Kashmiri floral Aari embroidered dupatta and kurta set bursting with rose-pink, turquoise, and marigold silk threadwork.',
    productDetailsSummary:
      'Handcrafted in Srinagar, this heirloom-inspired ensemble pairs a subtle ivory kurta with a statement Kashmiri floral embroidered dupatta/shawl drape.',
    specifications: [
      { label: 'Set Includes', value: 'Kurta, Trouser & Heavy Aari Embroidered Dupatta' },
      { label: 'Work Type', value: 'Kashmiri Aari Floral Tapestry' },
      { label: 'Dupatta Length', value: '2.5 Metres Full Artisan Drape' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Cotton Silk Kurta with Fine Pashmina-Modal Embroidered Dupatta.',
      weaveAndEmbroidery: 'Dense multicolour floral Aari embroidery.',
      careInstructions: ['Specialist dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Classic tailored kurta with full-length 2.5m artisan dupatta.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free insured shipping.',
      returnsNote: 'Easy returns within 14 days of delivery.',
      packagingNote: 'Includes heirloom muslin storage bag.',
    },
    reviews: createDemoReviews(
      'gb',
      'Ivory Rose',
      'M',
      '/assets/aistudio/cat_1_shawls.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 12. DUPATTA SETS — Chashme Shahi Ivory Silk Heavy Dupatta Set
  // -------------------------------------------------------------------------
  {
    id: 'chashme-shahi-ivory-silk-dupatta-set',
    slug: 'chashme-shahi-ivory-silk-dupatta-set',
    isDemoCatalogItem: true,
    brand: 'Ethnic Junction',
    name: 'Chashme Shahi Ivory Silk Zari Dupatta Set',
    category: 'Dupatta Sets',
    collectionGroup: 'Dupatta Sets',
    workType: 'Zari & Gota',
    fabric: 'Cotton Silk',
    price: 1290,
    originalPrice: 3799,
    discountPercent: 66,
    assuredBadge: true,
    stockQuantity: 9,
    availabilityStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 64,
    soldCount: 147,
    sku: 'SHF-CS-ID-1290',
    popularityRank: 12,
    newestRank: 12,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Pearl Ivory & Black',
        hex: '#e8dec8',
        filterGroup: 'Beige',
        image: '/assets/aistudio/pdp_thumb_4.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Noir Gold',
        hex: '#16161a',
        filterGroup: 'Black',
        image: '/assets/aistudio/pdp_main_1.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'cs',
      '/assets/aistudio/pdp_thumb_4.png',
      '/assets/aistudio/pdp_main_1.png',
      '/assets/aistudio/pdp_thumb_3.png'
    ),
    shortDescription:
      'Graceful Chanderi-silk dupatta set showcasing woven Kashmiri geometric zari pallu borders paired with a contrasting cotton-silk kurta and salwar.',
    productDetailsSummary:
      'Highlighting the grandeur of woven Kashmiri borders, the Chashme Shahi Dupatta Set centres around a luminous organza-silk dupatta framed with intricate black-and-gold jaal trim.',
    specifications: [
      { label: 'Set Includes', value: 'Cotton Silk Kurta, Salwar & Statement Zari Dupatta' },
      { label: 'Work Type', value: 'Zari & Gota Woven Pallu Border' },
      { label: 'Available Sizes', value: 'XS to XXL' },
      { label: 'Fit', value: 'Regular Comfort Ethnic Fit' },
    ],
    fabricAndCare: {
      fabricComposition: 'Cotton Silk Blend with Chanderi Silk Dupatta.',
      weaveAndEmbroidery: 'Woven metallic zari pallu and border edging.',
      careInstructions: ['Dry clean recommended.', 'Do not bleach.'],
    },
    sizeAndFit: {
      fitDescription: 'Regular straight kurta with pleated salwar.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Protective garment box.',
    },
    reviews: createDemoReviews(
      'cs',
      'Pearl Ivory & Black',
      'M',
      '/assets/aistudio/pdp_thumb_4.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 13. KASHMIRI EMBROIDERED SUITS — Dachigam Royal Tilla Embroidered Suit
  // -------------------------------------------------------------------------
  {
    id: 'dachigam-royal-tilla-embroidered-suit',
    slug: 'dachigam-royal-tilla-embroidered-suit',
    isDemoCatalogItem: true,
    brand: 'Shafiya Couture',
    name: 'Dachigam Royal Kashmiri Tilla Embroidered Suit',
    category: 'Kashmiri Embroidered Suits',
    collectionGroup: 'Suits',
    workType: 'Tilla Work',
    fabric: 'Pure Silk',
    price: 2890,
    originalPrice: 6400,
    discountPercent: 55,
    assuredBadge: true,
    topDiscountBadge: 'Bridal & Festive Couture',
    stockQuantity: 7,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 108,
    soldCount: 184,
    sku: 'SHF-DR-TS-2890',
    popularityRank: 13,
    newestRank: 13,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Royal Amethyst',
        hex: '#9d82d4',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_2_suits.png',
        imageFilter: 'contrast(1.06) saturate(1.15)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Saffron Bronze',
        hex: '#b5895a',
        filterGroup: 'Gold',
        image: '/assets/aistudio/plp_prod_3.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'dr',
      '/assets/aistudio/cat_2_suits.png',
      '/assets/aistudio/plp_prod_3.png',
      '/assets/aistudio/contact_embroidery_tall.png',
      'contrast(1.06) saturate(1.15)'
    ),
    shortDescription:
      'Heirloom three-piece Kashmiri embroidered silk suit adorned with hand-couched metallic Tilla badam (paisley) and floraljaal needlework.',
    productDetailsSummary:
      'Handcrafted by master Tilla artisans in old Srinagar, this three-piece pure silk suit features regal metallic threadwork along the neckline, sleeve cuffs, trouser hem, and four-side dupatta border.',
    specifications: [
      { label: 'Set Includes', value: 'Tilla Embroidered Silk Suit, Trouser & Organza Dupatta' },
      { label: 'Work Type', value: 'Hand-Couched Kashmiri Tilla Work' },
      { label: 'Occasion', value: 'Weddings, Receptions & Festive Celebrations' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: '100% Pure Kashmiri Mulberry Silk.',
      weaveAndEmbroidery: 'Authentic gold-dipped Tilla metallic embroidery.',
      careInstructions: ['Specialist dry clean only.', 'Wrap in acid-free tissue.'],
    },
    sizeAndFit: {
      fitDescription: 'Couture tailored suit with straight silk trousers.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'Generous seam allowance included inside.',
    },
    shippingAndReturns: {
      shippingNote: 'Complimentary insured courier delivery.',
      returnsNote: 'Easy 14-day return and size exchange.',
      packagingNote: 'Delivered in signature Shafiya heirloom box.',
    },
    reviews: createDemoReviews(
      'dr',
      'Royal Amethyst',
      'M',
      '/assets/aistudio/cat_2_suits.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 14. KASHMIRI EMBROIDERED SUITS — Sonamarg Rose Sozni Silk Suit Set
  // -------------------------------------------------------------------------
  {
    id: 'sonamarg-rose-sozni-silk-suit-set',
    slug: 'sonamarg-rose-sozni-silk-suit-set',
    isDemoCatalogItem: true,
    brand: 'Shafiya Couture',
    name: 'Sonamarg Meadow Rose Sozni Embroidered Suit Set',
    category: 'Kashmiri Embroidered Suits',
    collectionGroup: 'Suits',
    workType: 'Sozni Embroidery',
    fabric: 'Pure Silk',
    price: 2590,
    originalPrice: 5800,
    discountPercent: 55,
    stockQuantity: 8,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 82,
    soldCount: 149,
    sku: 'SHF-SM-SS-2590',
    popularityRank: 14,
    newestRank: 14,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Meadow Rose',
        hex: '#e56b8f',
        filterGroup: 'Pink',
        image: '/assets/aistudio/model_mobile.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        name: 'Ivory Blossom',
        hex: '#f3e6dd',
        filterGroup: 'Beige',
        image: '/assets/aistudio/cat_1_shawls.png',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'sm',
      '/assets/aistudio/model_mobile.png',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Vibrant rose-and-ivory Kashmiri embroidered suit featuring multicolour Sozni and floral Aari motifs across the yoke, sleeves, and matching dupatta.',
    productDetailsSummary:
      'Celebrating the alpine meadows of Sonamarg, this three-piece suit showcases lively pink, turquoise, and saffron Kashmiri floral embroidery on breathable pure silk.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Suit Kurta, Salwar & Floral Dupatta' },
      { label: 'Work Type', value: 'Sozni & Floral Aari Needlework' },
      { label: 'Available Sizes', value: 'XS, S, M, L, XL, XXL' },
      { label: 'Craft Origin', value: 'Srinagar Artisan Guild' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Silk & Pashmina-Modal Dupatta.',
      weaveAndEmbroidery: 'Hand-guided multicolour silk threadwork.',
      careInstructions: ['Dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Classic Kashmiri suit silhouette.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Heirloom muslin pouch included.',
    },
    reviews: createDemoReviews(
      'sm',
      'Meadow Rose',
      'M',
      '/assets/aistudio/model_mobile.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 15. PHERANS — Srinagar Heritage Cashmere-Wool Aari Pheran
  // -------------------------------------------------------------------------
  {
    id: 'srinagar-heritage-cashmere-aari-pheran',
    slug: 'srinagar-heritage-cashmere-aari-pheran',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Srinagar Heritage Cashmere-Wool Floral Aari Pheran',
    category: 'Pherans',
    collectionGroup: 'Pherans',
    workType: 'Kashmiri Aari',
    fabric: 'Wool Blend',
    price: 2390,
    originalPrice: 5200,
    discountPercent: 54,
    assuredBadge: true,
    topDiscountBadge: 'Signature Valley Pheran',
    stockQuantity: 10,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 138,
    soldCount: 275,
    sku: 'SHF-SH-AP-2390',
    popularityRank: 15,
    newestRank: 15,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Almond Ivory',
        hex: '#ede2d5',
        filterGroup: 'Beige',
        image: '/assets/aistudio/cat_3_pherans.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Obsidian Noir',
        hex: '#17171b',
        filterGroup: 'Black',
        image: '/assets/aistudio/cat_6_custom.png',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Chinar Wine',
        hex: '#69232f',
        filterGroup: 'Wine',
        image: '/assets/aistudio/cat_3_pherans.png',
        imageFilter: 'hue-rotate(310deg) saturate(1.2) brightness(0.92)',
        availableSizes: ['S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'shap',
      '/assets/aistudio/cat_3_pherans.png',
      '/assets/aistudio/cat_6_custom.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Authentic Kashmiri wool-cashmere pheran adorned with multicolour Chinar and almond-blossom Aari embroidery around the neckline, pockets, and cuffs.',
    productDetailsSummary:
      'A quintessential Kashmiri winter and autumn staple, our Srinagar Heritage Pheran offers a relaxed, cosy drape crafted from soft Ladakhi-inspired wool blend and finished with hand-hooked floral Aari needlework.',
    specifications: [
      { label: 'Garment Type', value: 'Traditional Kashmiri Pheran Tunic with Side Pockets' },
      { label: 'Work Type', value: 'Kashmiri Hooked-Needle Floral Aari' },
      { label: 'Sleeves & Slits', value: 'Wide Traditional Cuffs · Embroidered Side Slits' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Fine Cashmere-Wool Blend (Warm yet lightweight).',
      weaveAndEmbroidery: 'Multicolour silk-thread Aari chain stitch.',
      careInstructions: ['Dry clean only.', 'Fold flat with cedar or lavender sachet.'],
    },
    sizeAndFit: {
      fitDescription: 'Relaxed traditional Kashmiri pheran fit with room for layering.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'Choose your usual size for an authentic relaxed drape.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day returns and exchanges.',
      packagingNote: 'Packaged in protective Shafiya box.',
    },
    reviews: createDemoReviews(
      'shap',
      'Almond Ivory',
      'M',
      '/assets/aistudio/cat_3_pherans.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 16. PHERANS — Zabarwan Noir Tilla & Aari Velvet-Wool Pheran
  // -------------------------------------------------------------------------
  {
    id: 'zabarwan-noir-tilla-aari-pheran',
    slug: 'zabarwan-noir-tilla-aari-pheran',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Zabarwan Noir Tilla & Floral Aari Pheran',
    category: 'Pherans',
    collectionGroup: 'Pherans',
    workType: 'Tilla Work',
    fabric: 'Wool Blend',
    price: 2650,
    originalPrice: 5600,
    discountPercent: 53,
    lowStockLabel: 'Only 3 left',
    stockQuantity: 3,
    availabilityStatus: 'Low Stock',
    rating: 4.8,
    reviewCount: 79,
    soldCount: 163,
    sku: 'SHF-ZN-TP-2650',
    popularityRank: 16,
    newestRank: 16,
    defaultSize: 'L',
    extraColourCount: 2,
    colours: [
      {
        name: 'Jet Black',
        hex: '#121216',
        filterGroup: 'Black',
        image: '/assets/aistudio/cat_6_custom.png',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Warm Ivory',
        hex: '#ede2d5',
        filterGroup: 'Beige',
        image: '/assets/aistudio/cat_3_pherans.png',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'zntp',
      '/assets/aistudio/cat_6_custom.png',
      '/assets/aistudio/cat_3_pherans.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Statement jet-black Kashmiri pheran richly embroidered with coral-pink, saffron, and metallic gold Tilla floral motifs along the bib yoke.',
    productDetailsSummary:
      'Named after the Zabarwan mountain range overlooking Dal Lake, this noir wool-blend pheran contrasts deep black fabric with radiant Kashmiri floral needlework.',
    specifications: [
      { label: 'Garment Type', value: 'Embroidered Kashmiri Pheran' },
      { label: 'Work Type', value: 'Tilla Work & Floral Aari' },
      { label: 'Available Sizes', value: 'S, M, L, XL, XXL' },
      { label: 'Pockets', value: 'Dual Concealed Side-Slit Pockets' },
    ],
    fabricAndCare: {
      fabricComposition: 'Merino-Cashmere Wool Blend.',
      weaveAndEmbroidery: 'Dense neckline and cuff floral embroidery.',
      careInstructions: ['Dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Relaxed knee-length pheran cut.',
      modelInfo: 'Model is 5\'7" and is wearing Size L.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day return policy.',
      packagingNote: 'Signature Shafiya gift box.',
    },
    reviews: createDemoReviews(
      'zntp',
      'Jet Black',
      'L',
      '/assets/aistudio/cat_6_custom.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 17. SHAWLS — Dal Lake Heirloom Pure Pashmina Floral Aari Shawl
  // -------------------------------------------------------------------------
  {
    id: 'dal-lake-heirloom-pashmina-aari-shawl',
    slug: 'dal-lake-heirloom-pashmina-aari-shawl',
    isDemoCatalogItem: true,
    brand: 'Shafiya Heritage',
    name: 'Dal Lake Heirloom Pashmina Floral Aari Shawl',
    category: 'Shawls',
    collectionGroup: 'Shawls',
    workType: 'Kashmiri Aari',
    fabric: 'Wool Blend',
    price: 3250,
    originalPrice: 6999,
    discountPercent: 54,
    assuredBadge: true,
    topDiscountBadge: 'Artisan Collector Piece',
    stockQuantity: 6,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 146,
    soldCount: 290,
    sku: 'SHF-DL-PS-3250',
    popularityRank: 17,
    newestRank: 17,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Blossom Cream',
        hex: '#f5e1e4',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_1_shawls.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Turquoise Rose',
        hex: '#bce8e2',
        filterGroup: 'Blue',
        image: '/assets/aistudio/collage_embroidery.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'dlps',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/collage_embroidery.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Full-length Kashmiri Pashmina-wool shawl blanketed in vibrant hand-knotted floral Aari embroidery inspired by Dal Lake lotus gardens.',
    productDetailsSummary:
      'Every inch of the Dal Lake Heirloom Shawl is worked by master Srinagar artisans using fine silk threads in rose pink, turquoise, marigold, and emerald across a feather-soft Pashmina-wool base.',
    specifications: [
      { label: 'Dimensions', value: '100 cm × 205 cm (Full-Size Kashmiri Shawl)' },
      { label: 'Work Type', value: 'All-Over Kashmiri Floral Aari Jaal' },
      { label: 'Fit / Sizing', value: 'Free-Size Drape (Selectable Gift Fit XS–XXL)' },
      { label: 'Artisan Hours', value: '180+ Hours of Hand Needlework' },
    ],
    fabricAndCare: {
      fabricComposition: 'Fine Spun Pashmina-Wool Blend with Silk Thread Embroidery.',
      weaveAndEmbroidery: 'Hand-hooked Aari floral relief.',
      careInstructions: ['Specialist dry clean only.', 'Store folded in muslin wrap.'],
    },
    sizeAndFit: {
      fitDescription: 'Generous full-shoulder wrap drape.',
      modelInfo: 'Standard 100 cm × 205 cm heirloom shawl proportions.',
      garmentNote: 'Size selector corresponds to complimentary matching blouse/slip gift sizing.',
    },
    shippingAndReturns: {
      shippingNote: 'Complimentary insured shipping.',
      returnsNote: 'Easy 14-day return policy.',
      packagingNote: 'Includes cedar-scented heirloom storage box.',
    },
    reviews: createDemoReviews(
      'dlps',
      'Blossom Cream',
      'M',
      '/assets/aistudio/cat_1_shawls.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 18. SHAWLS — Badamwari Kalamkari & Sozni Pashmina Shawl
  // -------------------------------------------------------------------------
  {
    id: 'badamwari-kalamkari-sozni-pashmina-shawl',
    slug: 'badamwari-kalamkari-sozni-pashmina-shawl',
    isDemoCatalogItem: true,
    brand: 'Shafiya Heritage',
    name: 'Badamwari Kalamkari & Sozni Embroidered Shawl',
    category: 'Shawls',
    collectionGroup: 'Shawls',
    workType: 'Sozni Embroidery',
    fabric: 'Wool Blend',
    price: 2950,
    originalPrice: 6200,
    discountPercent: 52,
    stockQuantity: 7,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 94,
    soldCount: 182,
    sku: 'SHF-BK-SS-2950',
    popularityRank: 18,
    newestRank: 18,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Crimson & Teal Paisley',
        hex: '#8c2d46',
        filterGroup: 'Wine',
        image: '/assets/aistudio/cat_4_stoles.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Rose & Saffron',
        hex: '#e86888',
        filterGroup: 'Pink',
        image: '/assets/aistudio/collage_embroidery.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'bkss',
      '/assets/aistudio/cat_4_stoles.png',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Regal Kashmiri Kalamkari and fine Sozni needlepoint shawl featuring interlocking badam (almond blossom) and paisley arches.',
    productDetailsSummary:
      'Inspired by the historic almond orchards of Badamwari in Srinagar, this collector shawl blends timeless Kashmiri paisley motifs with dense satin-stitch Sozni needlework.',
    specifications: [
      { label: 'Dimensions', value: '100 cm × 205 cm' },
      { label: 'Work Type', value: 'Sozni Satin-Stitch & Kalamkari Motifs' },
      { label: 'Origin', value: 'Handcrafted in Kashmir' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Pashmina-Wool Blend.',
      weaveAndEmbroidery: 'Reversible-style fine Sozni needlepoint.',
      careInstructions: ['Dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Full-length artisanal shawl wrap.',
      modelInfo: '100 cm × 205 cm.',
      garmentNote: 'Standard heirloom shawl dimensions.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Signature Shafiya presentation box.',
    },
    reviews: createDemoReviews(
      'bkss',
      'Crimson & Teal Paisley',
      'M',
      '/assets/aistudio/cat_4_stoles.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 19. STOLES — Mughal Paisley Sozni Silk-Pashmina Stole
  // -------------------------------------------------------------------------
  {
    id: 'mughal-paisley-sozni-silk-stole',
    slug: 'mughal-paisley-sozni-silk-stole',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Mughal Paisley Sozni Silk-Pashmina Stole',
    category: 'Stoles',
    collectionGroup: 'Stoles',
    workType: 'Printed & Embroidered',
    fabric: 'Pure Silk',
    price: 1180,
    originalPrice: 2800,
    discountPercent: 58,
    assuredBadge: true,
    stockQuantity: 18,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 115,
    soldCount: 264,
    sku: 'SHF-MP-ST-1180',
    popularityRank: 19,
    newestRank: 19,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Royal Teal & Ruby',
        hex: '#28586b',
        filterGroup: 'Blue',
        image: '/assets/aistudio/cat_4_stoles.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Amber Gold',
        hex: '#c98e4b',
        filterGroup: 'Gold',
        image: '/assets/aistudio/cat_4_stoles.png',
        imageFilter: 'sepia(0.35) saturate(1.2)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'mpst',
      '/assets/aistudio/cat_4_stoles.png',
      '/assets/aistudio/collage_embroidery.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Featherlight mulberry silk and Pashmina stole adorned with intricate Mughal badam paisley arches and hand-embroidered Sozni outlines.',
    productDetailsSummary:
      'Designed for effortless everyday layering over kurtas, dresses, or winter coats, the Mughal Paisley Stole combines a fluid silk-pashmina drape with jewel-toned Kashmiri artistry.',
    specifications: [
      { label: 'Dimensions', value: '70 cm × 200 cm (Everyday Luxury Stole)' },
      { label: 'Work Type', value: 'Printed & Sozni Outlined Embroidery' },
      { label: 'Weight', value: 'Featherlight 140g Travel-Friendly Drape' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: '70% Mulberry Silk, 30% Fine Pashmina Wool.',
      weaveAndEmbroidery: 'Hand-guided Sozni highlight stitching.',
      careInstructions: ['Dry clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Lightweight neck scarf and shoulder stole.',
      modelInfo: '70 cm × 200 cm.',
      garmentNote: 'Effortless four-season accessory.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Gift-ready Shafiya envelope box.',
    },
    reviews: createDemoReviews(
      'mpst',
      'Royal Teal & Ruby',
      'M',
      '/assets/aistudio/cat_4_stoles.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 20. STOLES — Saffron Blossom Chiffon-Silk Aari Stole
  // -------------------------------------------------------------------------
  {
    id: 'saffron-blossom-chiffon-silk-aari-stole',
    slug: 'saffron-blossom-chiffon-silk-aari-stole',
    isDemoCatalogItem: true,
    brand: 'Shafiya Atelier',
    name: 'Pampore Saffron Blossom Silk Aari Stole',
    category: 'Stoles',
    collectionGroup: 'Stoles',
    workType: 'Kashmiri Aari',
    fabric: 'Chiffon',
    price: 980,
    originalPrice: 2450,
    discountPercent: 60,
    stockQuantity: 14,
    availabilityStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 67,
    soldCount: 158,
    sku: 'SHF-SB-ST-980',
    popularityRank: 20,
    newestRank: 20,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Coral Blossom',
        hex: '#f27c96',
        filterGroup: 'Pink',
        image: '/assets/aistudio/collage_embroidery.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Saffron Cream',
        hex: '#ebd29b',
        filterGroup: 'Gold',
        image: '/assets/aistudio/cat_1_shawls.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'sbst',
      '/assets/aistudio/collage_embroidery.png',
      '/assets/aistudio/cat_1_shawls.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Luminous coral-and-cream silk stole embroidered with dimensional Kashmiri Aari floral clusters and delicate scalloped borders.',
    productDetailsSummary:
      'Paying tribute to the saffron fields of Pampore, this airy silk-chiffon stole adds a burst of handcrafted Kashmiri colour to any solid kurta or evening ensemble.',
    specifications: [
      { label: 'Dimensions', value: '70 cm × 200 cm' },
      { label: 'Work Type', value: 'Dimensional Kashmiri Floral Aari' },
      { label: 'Available Sizes', value: 'XS to XXL' },
      { label: 'Finish', value: 'Hand-Rolled Edges' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Silk Chiffon & Modal Blend.',
      weaveAndEmbroidery: 'Vibrant silk-thread floral Aari work.',
      careInstructions: ['Dry clean or gentle cold hand wash.'],
    },
    sizeAndFit: {
      fitDescription: 'Fluid stole wrap.',
      modelInfo: '70 cm × 200 cm.',
      garmentNote: 'One size fits all.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day return policy.',
      packagingNote: 'Signature Shafiya pouch.',
    },
    reviews: createDemoReviews(
      'sbst',
      'Coral Blossom',
      'M',
      '/assets/aistudio/collage_embroidery.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 21. ACCESSORIES — Rosewater Floral Aari Embroidered Silk Potli Bag
  // -------------------------------------------------------------------------
  {
    id: 'rosewater-floral-aari-silk-potli-bag',
    slug: 'rosewater-floral-aari-silk-potli-bag',
    isDemoCatalogItem: true,
    brand: 'Shafiya Accessories',
    name: 'Rosewater Floral Aari Embroidered Silk Potli Bag',
    category: 'Accessories',
    collectionGroup: 'Accessories',
    workType: 'Kashmiri Aari',
    fabric: 'Pure Silk',
    price: 690,
    originalPrice: 1850,
    discountPercent: 63,
    topDiscountBadge: 'Festive Gifting Favourite',
    assuredBadge: true,
    stockQuantity: 20,
    availabilityStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 132,
    soldCount: 340,
    sku: 'SHF-RW-PB-690',
    popularityRank: 21,
    newestRank: 21,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Blush Rose',
        hex: '#f08aa3',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_5_accessories.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Champagne Gold',
        hex: '#dfc195',
        filterGroup: 'Gold',
        image: '/assets/aistudio/cat_5_accessories.png',
        imageFilter: 'sepia(0.32) brightness(1.05)',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Crimson Ruby',
        hex: '#8f1d3f',
        filterGroup: 'Wine',
        image: '/assets/aistudio/cat_5_accessories.png',
        imageFilter: 'hue-rotate(335deg) contrast(1.1) saturate(1.25)',
        availableSizes: ['XS', 'S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'rwpb',
      '/assets/aistudio/cat_5_accessories.png',
      '/assets/aistudio/collage_embroidery.png',
      '/assets/aistudio/contact_embroidery_tall.png'
    ),
    shortDescription:
      'Handcrafted blush-pink raw silk potli bag richly embroidered with 360-degree Kashmiri floral Aari blooms, braided gold drawstrings, and artisanal tassels.',
    productDetailsSummary:
      'The finishing touch to your festive Kashmiri ensemble, our Rosewater Silk Potli is cushioned with satin lining and spacious enough for smartphones, essentials, and jewellery.',
    specifications: [
      { label: 'Dimensions', value: '23 cm × 21 cm · Braided Gold Wrist Handle' },
      { label: 'Work Type', value: '360° Kashmiri Floral Aari & Zari Cord' },
      { label: 'Interior', value: 'Quilted Satin Lining with Coin Pocket' },
      { label: 'Capacity', value: 'Fits all large smartphones & festive essentials' },
    ],
    fabricAndCare: {
      fabricComposition: '100% Mulberry Raw Silk Exterior with Satin Lining.',
      weaveAndEmbroidery: 'Hand-knotted Kashmiri floral Aari needlework.',
      careInstructions: ['Spot clean gently with dry soft cloth.', 'Store in dust bag provided.'],
    },
    sizeAndFit: {
      fitDescription: 'Structured drawstring potli silhouette.',
      modelInfo: '23 cm height × 21 cm base width.',
      garmentNote: 'Select M for standard potli size or L for twin gift set.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Delivered in protective Shafiya dust bag.',
    },
    reviews: createDemoReviews(
      'rwpb',
      'Blush Rose',
      'M',
      '/assets/aistudio/cat_5_accessories.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 22. ACCESSORIES —Nigeen Zari & Velvet Kashmiri Heirloom Clutch Potli
  // -------------------------------------------------------------------------
  {
    id: 'nigeen-zari-velvet-kashmiri-potli',
    slug: 'nigeen-zari-velvet-kashmiri-potli',
    isDemoCatalogItem: true,
    brand: 'Shafiya Accessories',
    name: 'Nigeen Lake Zari & Aari Embroidered Trio Potli Set',
    category: 'Accessories',
    collectionGroup: 'Accessories',
    workType: 'Zari & Gota',
    fabric: 'Pure Silk',
    price: 890,
    originalPrice: 2299,
    discountPercent: 61,
    stockQuantity: 12,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 76,
    soldCount: 195,
    sku: 'SHF-NL-ZP-890',
    popularityRank: 22,
    newestRank: 22,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Coral & Gold',
        hex: '#e07a8c',
        filterGroup: 'Pink',
        image: '/assets/aistudio/cat_5_accessories.png',
        imageFilter: 'contrast(1.05) saturate(1.15)',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Antique Bronze',
        hex: '#9c744f',
        filterGroup: 'Brown',
        image: '/assets/aistudio/contact_embroidery_tall.png',
        availableSizes: ['S', 'M', 'L'],
      },
    ],
    gallery: buildFourGalleryImages(
      'nlzp',
      '/assets/aistudio/cat_5_accessories.png',
      '/assets/aistudio/contact_embroidery_tall.png',
      '/assets/aistudio/collage_embroidery.png',
      'contrast(1.05) saturate(1.15)'
    ),
    shortDescription:
      'Artisanal Kashmiri embroidered silk potli and jewel pouch ensemble featuring raised lotus Aari motifs and metallic zari drawstrings.',
    productDetailsSummary:
      'Designed for bridal trousseaus and festive gifting, the Nigeen Lake Embroidered Potli showcases dense Kashmiri floral needlework in rose, saffron, and emerald silk thread.',
    specifications: [
      { label: 'Includes', value: 'Embroidered Silk Potli & Matching Jewellery Pouch' },
      { label: 'Work Type', value: 'Zari & Kashmiri Floral Aari' },
      { label: 'Closure', value: 'Hand-Braided Tassel Drawstring' },
      { label: 'Available Sizes', value: 'XS to XXL' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Silk with velvet-soft inner lining.',
      weaveAndEmbroidery: 'Kashmiri floral Aari and zari cord work.',
      careInstructions: ['Spot clean only.'],
    },
    sizeAndFit: {
      fitDescription: 'Festive wrist potli.',
      modelInfo: 'Standard ceremonial dimensions.',
      garmentNote: 'Ideal for weddings and festive occasions.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day return policy.',
      packagingNote: 'Packaged in signature gift box.',
    },
    reviews: createDemoReviews(
      'nlzp',
      'Coral & Gold',
      'M',
      '/assets/aistudio/cat_5_accessories.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 23. KURTAS — Pari Mahal Noir Zari Border Anarkali Kurta Set
  // -------------------------------------------------------------------------
  {
    id: 'pari-mahal-noir-zari-kurta-set',
    slug: 'pari-mahal-noir-zari-kurta-set',
    isDemoCatalogItem: true,
    brand: 'Ethnic Junction',
    name: 'Pari Mahal Noir Zari Border Cotton Silk Kurta Set',
    category: 'Kurtas',
    collectionGroup: 'Kurtas',
    workType: 'Kiran Border',
    fabric: 'Cotton Silk',
    price: 945,
    originalPrice: 3699,
    discountPercent: 74,
    assuredBadge: true,
    stockQuantity: 11,
    availabilityStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 88,
    soldCount: 210,
    sku: 'SHF-PM-NZ-945',
    popularityRank: 23,
    newestRank: 23,
    defaultSize: 'M',
    extraColourCount: 2,
    colours: [
      {
        name: 'Noir & Champagne',
        hex: '#18181c',
        filterGroup: 'Black',
        image: '/assets/aistudio/pdp_thumb_3.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Sandstone Gold',
        hex: '#d9c2a3',
        filterGroup: 'Beige',
        image: '/assets/aistudio/pdp_thumb_4.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'pmnz',
      '/assets/aistudio/pdp_thumb_3.png',
      '/assets/aistudio/pdp_main_1.png',
      '/assets/aistudio/pdp_thumb_4.png'
    ),
    shortDescription:
      'Refined noir cotton-silk kurta set framed with antique gold Kiran edging and paired with a woven Kashmiri zari-pallu dupatta.',
    productDetailsSummary:
      'Inspired by the arched terraces of Pari Mahal overlooking Srinagar, this noir cotton-silk ensemble balances crisp tailoring with shimmering golden border details.',
    specifications: [
      { label: 'Set Includes', value: 'Cotton Silk Kurta, Salwar & Woven Zari Dupatta' },
      { label: 'Work Type', value: 'Kiran Border & Woven Zari Pallu' },
      { label: 'Available Sizes', value: 'XS to XXL' },
      { label: 'Fit', value: 'Tailored A-Line Kurta' },
    ],
    fabricAndCare: {
      fabricComposition: 'Breathable Cotton Silk Blend.',
      weaveAndEmbroidery: 'Metallic Kiran border and woven zari trim.',
      careInstructions: ['Dry clean or gentle cold hand wash.'],
    },
    sizeAndFit: {
      fitDescription: 'Comfortable everyday and festive fit.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping on all orders.',
      returnsNote: 'Easy 14-day returns.',
      packagingNote: 'Protective garment packaging.',
    },
    reviews: createDemoReviews(
      'pmnz',
      'Noir & Champagne',
      'M',
      '/assets/aistudio/pdp_thumb_3.png'
    ),
  },

  // -------------------------------------------------------------------------
  // 24. KURTA SETS — Yusmarg Pastel Floral Chiffon Kurta Dupatta Set
  // -------------------------------------------------------------------------
  {
    id: 'yusmarg-pastel-floral-chiffon-kurta-set',
    slug: 'yusmarg-pastel-floral-chiffon-kurta-set',
    isDemoCatalogItem: true,
    brand: 'Colors of Earth',
    name: 'Yusmarg Pastel Floral Embroidered Chiffon Kurta Set',
    category: 'Kurta Sets',
    collectionGroup: 'Kurta Sets',
    workType: 'Printed & Embroidered',
    fabric: 'Chiffon',
    price: 1240,
    originalPrice: 3599,
    discountPercent: 66,
    stockQuantity: 13,
    availabilityStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 71,
    soldCount: 165,
    sku: 'SHF-YP-FC-1240',
    popularityRank: 24,
    newestRank: 24,
    defaultSize: 'M',
    extraColourCount: 3,
    colours: [
      {
        name: 'Blossom Ivory',
        hex: '#f7dce2',
        filterGroup: 'Pink',
        image: '/assets/aistudio/pdp_thumb_5.png',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Golden Meadow',
        hex: '#d8b77b',
        filterGroup: 'Gold',
        image: '/assets/aistudio/plp_prod_3.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
      },
    ],
    gallery: buildFourGalleryImages(
      'ypfc',
      '/assets/aistudio/pdp_thumb_5.png',
      '/assets/aistudio/cat_2_suits.png',
      '/assets/aistudio/collage_embroidery.png'
    ),
    shortDescription:
      'Breezy pastel chiffon-silk kurta set embellished with Kashmiri floral resham embroidery and paired with a fluid scalloped dupatta.',
    productDetailsSummary:
      'Capturing the serene charm of Yusmarg meadows, this lightweight chiffon-silk ensemble features delicate floral motifs and soft gold border highlights.',
    specifications: [
      { label: 'Set Includes', value: 'Embroidered Kurta, Trouser & Scalloped Dupatta' },
      { label: 'Work Type', value: 'Printed & Hand-Guided Floral Embroidery' },
      { label: 'Available Sizes', value: 'XS to XXL' },
      { label: 'Occasion', value: 'Daytime Festivities & Intimate Gatherings' },
    ],
    fabricAndCare: {
      fabricComposition: 'Pure Viscose Chiffon with soft cotton lining.',
      weaveAndEmbroidery: 'Silk-thread floral embroidery.',
      careInstructions: ['Gentle hand wash or dry clean.'],
    },
    sizeAndFit: {
      fitDescription: 'Fluid straight-cut silhouette.',
      modelInfo: 'Model is 5\'7" and is wearing Size M.',
      garmentNote: 'True to size.',
    },
    shippingAndReturns: {
      shippingNote: 'Free shipping across India.',
      returnsNote: 'Easy 14-day return policy.',
      packagingNote: 'Ships in protective Shafiya sleeve.',
    },
    reviews: createDemoReviews(
      'ypfc',
      'Blossom Ivory',
      'M',
      '/assets/aistudio/pdp_thumb_5.png'
    ),
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = RAW_CATALOG_PRODUCTS.map(
  (prod) => ({
    ...prod,
    colours: prod.colours.map((col) => ({
      ...col,
      image: getAssetUrl(col.image),
    })),
    gallery: prod.gallery.map((g) => ({
      ...g,
      url: getAssetUrl(g.url),
      thumbUrl: g.thumbUrl ? getAssetUrl(g.thumbUrl) : getAssetUrl(g.url),
    })),
    reviews: prod.reviews.map((rev) => ({
      ...rev,
      avatar: rev.avatar ? getAssetUrl(rev.avatar) : undefined,
      photos: rev.photos ? rev.photos.map((p) => getAssetUrl(p)) : undefined,
    })),
  })
);

