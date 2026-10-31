import React, { useState, useMemo, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Check,
  ShieldCheck,
  X,
  RotateCcw,
} from 'lucide-react';
import { Header, NavItemKey } from './Header';
import { Footer } from './Footer';
import { BagItem } from '../data/heroSlides';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  SizeOption,
  ALL_SIZES,
  ALL_CATALOG_CATEGORIES,
} from '../data/productsData';

interface ProductListingPageProps {
  embeddedInHomepage?: boolean;
  onOpenSignIn: () => void;
  onNavigate: (page: NavItemKey) => void;
  onOpenProduct: (
    productSlug: string,
    initialColourIdx?: number,
    initialSize?: SizeOption
  ) => void;
  onOpenBagPage?: () => void;
  selectedCollectionCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  bagItems: BagItem[];
  onAddVariantToBag: (
    product: CatalogProduct,
    colourName: string,
    size: SizeOption,
    quantity: number,
    variantImage: string
  ) => void;
  onRemoveBagItem: (id: string) => void;
  onUpdateBagQuantity?: (id: string, delta: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onToggleHeaderWishlist?: () => void;
}

const CATEGORY_FILTER_OPTIONS = ALL_CATALOG_CATEGORIES;

const FABRIC_FILTER_OPTIONS = [
  'Cotton Silk',
  'Pure Silk',
  'Georgette',
  'Chiffon',
  'Wool Blend',
] as const;

const COLOUR_FILTER_OPTIONS = [
  { name: 'Black', hex: '#101014' },
  { name: 'Beige', hex: '#ead5bd' },
  { name: 'Pink', hex: '#eb93a4' },
  { name: 'Brown', hex: '#683716' },
  { name: 'Gold', hex: '#b5895a' },
  { name: 'Wine', hex: '#5e2129' },
  { name: 'Blue', hex: '#d5dfe4' },
] as const;

const WORK_TYPE_OPTIONS = [
  'Kiran Border',
  'Kashmiri Aari',
  'Sozni Embroidery',
  'Zari & Gota',
  'Tilla Work',
  'Printed & Embroidered',
] as const;

type SortOption =
  | 'Popularity'
  | 'Price: Low to High'
  | 'Price: High to Low'
  | 'Newest First';

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  embeddedInHomepage = false,
  onOpenSignIn,
  onNavigate,
  onOpenProduct,
  onOpenBagPage,
  selectedCollectionCategory = 'All',
  onSelectCategory,
  bagItems,
  onAddVariantToBag,
  onRemoveBagItem,
  onUpdateBagQuantity,
  wishlistIds,
  onToggleWishlist,
  onToggleHeaderWishlist,
}) => {
  // Filter states — supports all 10 categories and syncs with header category selection
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (
      selectedCollectionCategory &&
      selectedCollectionCategory !== 'All' &&
      selectedCollectionCategory !== 'Custom Designs'
    ) {
      if (selectedCollectionCategory === 'Suits') {
        return ['Kashmiri Embroidered Suits'];
      }
      return [selectedCollectionCategory];
    }
    return embeddedInHomepage ? [] : [];
  });
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<SizeOption[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);

  // Sync external selectedCollectionCategory when user clicks a category in Header / Drawer
  useEffect(() => {
    if (!selectedCollectionCategory || selectedCollectionCategory === 'All') {
      setSelectedCategories([]);
    } else if (selectedCollectionCategory === 'Suits') {
      setSelectedCategories(['Kashmiri Embroidered Suits']);
    } else if (selectedCollectionCategory !== 'Custom Designs') {
      setSelectedCategories([selectedCollectionCategory]);
    }
  }, [selectedCollectionCategory]);

  // Sorting & View Mode
  const [sortBy, setSortBy] = useState<SortOption>('Popularity');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Desktop Filter Accordion open states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    fabric: true,
    size: false,
    colour: false,
    workType: false,
  });

  // Mobile Filter Modal state (compact centred modal)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Prevent background scrolling while mobile centred filter popup is open
  useEffect(() => {
    if (mobileFilterOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileFilterOpen]);

  // Per-card selected colour index and size state
  const [cardColourIdx, setCardColourIdx] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        CATALOG_PRODUCTS.map((p) => [
          p.id,
          p.id === 'women-georgette-kurta-pant-dupatta-set' ? 1 : 0,
        ])
      )
  );
  const [cardSize, setCardSize] = useState<Record<string, SizeOption | null>>(
    () =>
      Object.fromEntries(CATALOG_PRODUCTS.map((p) => [p.id, p.defaultSize]))
  );
  const [cardSizeError, setCardSizeError] = useState<Record<string, string>>(
    {}
  );
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleArrayFilter = <T extends string>(
    list: T[],
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    onSelectCategory?.('All');
    setMaxPrice(5000);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedColours([]);
    setSelectedWorkTypes([]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = CATALOG_PRODUCTS.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }
      if (product.price < 500 || product.price > maxPrice) {
        return false;
      }
      if (
        selectedFabrics.length > 0 &&
        !selectedFabrics.includes(product.fabric)
      ) {
        return false;
      }
      if (selectedSizes.length > 0) {
        const productSizes = new Set(
          product.colours.flatMap((c) => c.availableSizes)
        );
        const matchesSize = selectedSizes.some((s) => productSizes.has(s));
        if (!matchesSize) return false;
      }
      if (selectedColours.length > 0) {
        const matchesColour = product.colours.some((c) =>
          selectedColours.includes(c.filterGroup)
        );
        if (!matchesColour) return false;
      }
      if (
        selectedWorkTypes.length > 0 &&
        !selectedWorkTypes.includes(product.workType)
      ) {
        return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Newest First') return a.newestRank - b.newestRank;
      return a.popularityRank - b.popularityRank;
    });
  }, [
    selectedCategories,
    maxPrice,
    selectedFabrics,
    selectedSizes,
    selectedColours,
    selectedWorkTypes,
    sortBy,
  ]);

  const isUnfiltered =
    selectedCategories.length === 0 &&
    maxPrice === 5000 &&
    selectedFabrics.length === 0 &&
    selectedSizes.length === 0 &&
    selectedColours.length === 0 &&
    selectedWorkTypes.length === 0;

  const handleCardColourSelect = (
    e: React.MouseEvent,
    product: CatalogProduct,
    cIdx: number
  ) => {
    e.stopPropagation();
    setCardColourIdx((prev) => ({ ...prev, [product.id]: cIdx }));
    const variant = product.colours[cIdx];
    const currentSelectedSize = cardSize[product.id];
    if (
      currentSelectedSize &&
      !variant.availableSizes.includes(currentSelectedSize)
    ) {
      setCardSize((prev) => ({
        ...prev,
        [product.id]: variant.availableSizes[0] ?? null,
      }));
    }
  };

  const handleCardSizeSelect = (
    e: React.MouseEvent,
    productId: string,
    size: SizeOption
  ) => {
    e.stopPropagation();
    setCardSize((prev) => ({ ...prev, [productId]: size }));
    setCardSizeError((prev) => ({ ...prev, [productId]: '' }));
  };

  const handleCardAddToBag = (
    e: React.MouseEvent,
    product: CatalogProduct
  ) => {
    e.stopPropagation();
    const cIdx = cardColourIdx[product.id] ?? 0;
    const activeColour = product.colours[cIdx] ?? product.colours[0];
    const selectedSz = cardSize[product.id];

    if (!selectedSz || !activeColour.availableSizes.includes(selectedSz)) {
      setCardSizeError((prev) => ({
        ...prev,
        [product.id]: 'Please select an available size',
      }));
      return;
    }

    onAddVariantToBag(
      product,
      activeColour.name,
      selectedSz,
      1,
      activeColour.image
    );
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedFabrics.length +
    selectedSizes.length +
    selectedColours.length +
    selectedWorkTypes.length +
    (maxPrice < 5000 ? 1 : 0);

  const activeHeadingTitle =
    selectedCategories.length === 1
      ? selectedCategories[0]
      : selectedWorkTypes.length === 1
      ? selectedWorkTypes[0]
      : 'Kiran Border';

  return (
    <div
      id="collection-catalog-section"
      className={`${
        embeddedInHomepage ? '' : 'min-h-screen'
      } w-full bg-[#fcf9f5] flex flex-col justify-between overflow-x-hidden`}
    >
      {/* =====================================================================
          1. SHARED WEBSITE HEADER & CATEGORY HERO BANNER
          (Rendered when on the dedicated Collections page; omitted when
           embedded immediately below the Homepage Hero Banner)
          ===================================================================== */}
      {!embeddedInHomepage && (
        <>
          <div className="w-full bg-[#fcf9f5] border-b border-[#f1e9e0]">
            <Header
              activePage="Collections"
              ecommerceMobileHeader
              onOpenBagPage={onOpenBagPage}
              onNavigate={onNavigate}
              onOpenSignIn={onOpenSignIn}
              onSelectCategory={(cat) => {
                onSelectCategory?.(cat);
                if (cat === 'Custom Designs') {
                  onNavigate('Custom Designs');
                }
              }}
              bagItems={bagItems}
              onRemoveBagItem={onRemoveBagItem}
              onUpdateBagQuantity={onUpdateBagQuantity}
              wishlistIds={wishlistIds}
              wishlistActive={wishlistIds.length > 0}
              onToggleHeaderWishlist={onToggleHeaderWishlist}
              onToggleWishlistItem={onToggleWishlist}
            />
          </div>

          <section
            aria-labelledby="plp-category-hero-heading"
            className="relative w-full bg-[#fdf8f3] border-b border-[#eee4da] overflow-hidden select-none"
          >
            {/* Desktop Full-Width Category Banner */}
            <div className="hidden md:block relative w-full aspect-[922/154] min-h-[180px] max-h-[310px] overflow-hidden bg-[#fdf8f3]">
              <img
                src="/assets/aistudio/plp_hero_clean_banner.png"
                alt="Kurtas, Ethnic Sets — Kashmiri model and Dal Lake landscape"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Left Editorial Text Overlay */}
              <div className="absolute left-[10.4%] top-1/2 -translate-y-1/2 z-20 max-w-[44%]">
                <p className="font-ui text-[clamp(9px,0.75vw,13px)] font-bold uppercase tracking-[0.22em] text-[#f81d5c]">
                  OUR COLLECTIONS
                </p>
                <h1
                  id="plp-category-hero-heading"
                  className="mt-[0.15vw] font-editorial text-[clamp(28px,3.1vw,54px)] font-bold text-[#121829] leading-[1.02] tracking-[-0.015em]"
                >
                  Kurtas, Ethnic Sets
                </h1>
                <p className="font-script text-[clamp(24px,2.45vw,44px)] text-[#f81d5c] leading-[1.05] -mt-0.5">
                  Everyday Elegance
                </p>
                <p className="mt-[0.35vw] font-ui text-[clamp(10px,0.82vw,14.5px)] text-[#262936] leading-[1.48] max-w-md">
                  <span className="block">
                    Beautifully crafted kurtas, suits and ethnic sets in
                    timeless
                  </span>
                  <span className="block">
                    Kashmiri designs — for every occasion, and every you.
                  </span>
                </p>
              </div>
            </div>

            {/* Mobile Category Hero Banner matching Screen 1 */}
            <div className="md:hidden relative w-full min-h-[118px] bg-[#fdf8f3] overflow-hidden flex items-center">
              <img
                src="/assets/aistudio/plp_hero_clean_banner.png"
                alt="Kurtas, Ethnic Sets — Shafiya Kashmiri Designs"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#fdf8f3] via-[#fdf8f3]/92 to-transparent pointer-events-none"
              />
              <div className="relative z-10 py-3.5 pl-4 pr-2 max-w-[64%]">
                <p className="font-ui text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#f81d5c]">
                  OUR COLLECTIONS
                </p>
                <h1 className="mt-0.5 font-editorial text-xl sm:text-2xl font-bold text-[#121829] leading-[1.05]">
                  Kurtas, Ethnic Sets
                </h1>
                <p className="font-script text-xl sm:text-2xl text-[#f81d5c] leading-[1.05]">
                  Everyday Elegance
                </p>
                <p className="mt-1 font-ui text-[10px] text-[#3a3633] leading-snug line-clamp-2">
                  Beautifully crafted kurtas, suits and ethnic sets in timeless
                  Kashmiri designs.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* =====================================================================
          2. BREADCRUMBS, HEADING, SORTING & PRODUCT LISTING BODY
          ===================================================================== */}
      <div className="w-full flex-1 px-3.5 sm:px-6 lg:px-[4.5%] xl:px-[5%] pt-4 sm:pt-5 pb-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-[#726d68] mb-2"
        >
          <button
            type="button"
            onClick={() => onNavigate('Home')}
            className="hover:text-[#f81d5c] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#a8a29d]" />
          <button
            type="button"
            onClick={handleResetFilters}
            className="hover:text-[#f81d5c] transition-colors cursor-pointer"
          >
            Clothing and Ethnic Wear
          </button>
          <ChevronRight className="w-3 h-3 text-[#a8a29d]" />
          <span className="font-medium text-[#2c2826]">
            {selectedCategories.length === 1
              ? selectedCategories[0]
              : selectedCategories.length > 1
              ? selectedCategories.join(', ')
              : 'Kurtas, Ethnic Sets'}
          </span>
        </nav>

        {/* Category Title + Product Count + Sort & Grid/List Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-3.5 border-b border-[#efe7de]">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141416] tracking-[-0.01em]">
              {activeHeadingTitle}
            </h2>
            <span className="font-ui text-[11.5px] sm:text-[13px] text-[#78726d]">
              (Showing 1 – {filteredAndSortedProducts.length} of{' '}
              {CATALOG_PRODUCTS.length} products)
            </span>
          </div>

          {/* Right Controls: Mobile Filter Button + Sort Dropdown + Grid/List View Toggle */}
          <div className="flex items-center justify-between lg:justify-end gap-2">
            {/* Mobile Filter Modal Trigger (< lg) matching Screen 1 pink-outlined pill */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#fff5f8] border border-[#f81d5c]/65 text-xs font-semibold text-[#f81d5c] shadow-2xs cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#f81d5c]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="min-w-[17px] h-[17px] px-1 rounded-full bg-[#f81d5c] text-white text-[10px] font-bold inline-flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2.5">
              {/* Sort By Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  aria-expanded={sortDropdownOpen}
                  aria-haspopup="listbox"
                  className="h-9 sm:h-10 px-3.5 rounded-xl bg-white border border-[#e6ded6] hover:border-[#d5cbc0] text-xs sm:text-[13px] text-[#17171a] inline-flex items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.02)] cursor-pointer"
                >
                  <span className="text-[#78726d]">Sort By</span>
                  <span className="h-3.5 w-[1px] bg-[#e2dad1]" />
                  <span className="font-semibold text-[#141416] min-w-[92px] text-left">
                    {sortBy}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                </button>

                {sortDropdownOpen && (
                  <div
                    role="listbox"
                    className="absolute right-0 mt-1.5 w-52 rounded-2xl bg-white border border-[#eadfd5] shadow-xl p-1.5 z-30"
                  >
                    {(
                      [
                        'Popularity',
                        'Price: Low to High',
                        'Price: High to Low',
                        'Newest First',
                      ] as SortOption[]
                    ).map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={sortBy === option}
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          sortBy === option
                            ? 'bg-[#fdecef] text-[#f81d5c] font-semibold'
                            : 'text-[#262423] hover:bg-[#f7f2ec]'
                        }`}
                      >
                        <span>{option}</span>
                        {sortBy === option && (
                          <Check className="w-3.5 h-3.5 text-[#f81d5c]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid / List View Switcher matching Reference Image 1 */}
              <div
                role="group"
                aria-label="View mode"
                className="inline-flex items-center rounded-xl bg-white border border-[#e6ded6] p-0.5"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#fdecef] text-[#f81d5c] border border-[#f81d5c]/40'
                      : 'text-[#6e6762] hover:text-[#17171a]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 stroke-[2]" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#fdecef] text-[#f81d5c] border border-[#f81d5c]/40'
                      : 'text-[#6e6762] hover:text-[#17171a]'
                  }`}
                >
                  <List className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
             MAIN 2-COLUMN LAYOUT: LEFT FILTER SIDEBAR + RIGHT PRODUCT GRID
            ================================================================= */}
        <div className="mt-5 flex flex-col lg:flex-row items-start gap-6 xl:gap-7">
          {/* LEFT-SIDE FILTER PANEL (Desktop lg:block) */}
          <aside
            aria-label="Product Filters"
            className="hidden lg:block w-[220px] xl:w-[240px] shrink-0 rounded-2xl bg-white border border-[#ece3da] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4"
          >
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f0e8df]">
              <span className="font-ui text-sm font-bold text-[#141824]">
                Filters
              </span>
              <div className="flex items-center gap-2">
                {!isUnfiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] font-semibold text-[#f81d5c] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                <SlidersHorizontal className="w-4 h-4 text-[#57524e]" />
              </div>
            </div>

            {/* 1. Category Filter (All 10 Categories) */}
            <div className="py-3.5 border-b border-[#f0e8df]">
              <button
                type="button"
                onClick={() => toggleSection('category')}
                aria-expanded={openSections.category}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Category</span>
                {openSections.category ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.category && (
                <div className="mt-2.5 space-y-2">
                  {CATEGORY_FILTER_OPTIONS.map((cat) => {
                    const checked = selectedCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className="flex items-center gap-2.5 text-xs text-[#4a4542] hover:text-[#141824] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleArrayFilter(
                              selectedCategories,
                              setSelectedCategories,
                              cat
                            )
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-[4px] border shrink-0 flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-[#f81d5c] border-[#f81d5c] text-white'
                              : 'bg-white border-[#d6cdc4]'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </span>
                        <span
                          className={
                            checked ? 'font-medium text-[#141824]' : ''
                          }
                        >
                          {cat}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Price Range Filter */}
            <div className="py-3.5 border-b border-[#f0e8df]">
              <button
                type="button"
                onClick={() => toggleSection('price')}
                aria-expanded={openSections.price}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Price Range</span>
                {openSections.price ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.price && (
                <div className="mt-3 space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min={500}
                      max={5000}
                      step={100}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      aria-label="Maximum price range"
                      className="w-full h-1.5 bg-[#fce2ea] rounded-lg appearance-none cursor-pointer accent-[#f81d5c]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#68635e] tabular-nums">
                    <span>₹500</span>
                    <span>–</span>
                    <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Fabric Filter */}
            <div className="py-3.5 border-b border-[#f0e8df]">
              <button
                type="button"
                onClick={() => toggleSection('fabric')}
                aria-expanded={openSections.fabric}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Fabric</span>
                {openSections.fabric ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.fabric && (
                <div className="mt-2.5 space-y-2">
                  {FABRIC_FILTER_OPTIONS.map((fab) => {
                    const checked = selectedFabrics.includes(fab);
                    return (
                      <label
                        key={fab}
                        className="flex items-center gap-2.5 text-xs text-[#4a4542] hover:text-[#141824] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleArrayFilter(
                              selectedFabrics,
                              setSelectedFabrics,
                              fab
                            )
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-[#f81d5c] border-[#f81d5c] text-white'
                              : 'bg-white border-[#d6cdc4]'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </span>
                        <span
                          className={
                            checked ? 'font-medium text-[#141824]' : ''
                          }
                        >
                          {fab}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Size Filter */}
            <div className="py-3.5 border-b border-[#f0e8df]">
              <button
                type="button"
                onClick={() => toggleSection('size')}
                aria-expanded={openSections.size}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Size</span>
                {openSections.size ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.size && (
                <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                  {ALL_SIZES.map((sz) => {
                    const active = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(selectedSizes, setSelectedSizes, sz)
                        }
                        className={`h-7 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#f81d5c] text-white border-[#f81d5c]'
                            : 'bg-white text-[#373a47] border-[#dfd7ce] hover:border-[#f81d5c]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Colour Filter */}
            <div className="py-3.5 border-b border-[#f0e8df]">
              <button
                type="button"
                onClick={() => toggleSection('colour')}
                aria-expanded={openSections.colour}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Colour</span>
                {openSections.colour ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.colour && (
                <div className="mt-2.5 space-y-2">
                  {COLOUR_FILTER_OPTIONS.map((col) => {
                    const active = selectedColours.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(
                            selectedColours,
                            setSelectedColours,
                            col.name
                          )
                        }
                        className="w-full flex items-center gap-2.5 text-left text-xs text-[#4a4542] hover:text-[#141824] cursor-pointer"
                      >
                        <span
                          style={{ backgroundColor: col.hex }}
                          className={`w-4 h-4 rounded-full border shrink-0 ${
                            active
                              ? 'ring-2 ring-[#f81d5c] ring-offset-1 border-white'
                              : 'border-black/15'
                          }`}
                        />
                        <span
                          className={
                            active ? 'font-semibold text-[#f81d5c]' : ''
                          }
                        >
                          {col.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 6. Work Type Filter */}
            <div className="pt-3.5">
              <button
                type="button"
                onClick={() => toggleSection('workType')}
                aria-expanded={openSections.workType}
                className="w-full flex items-center justify-between text-left font-ui text-xs font-bold text-[#141824] cursor-pointer"
              >
                <span>Work Type</span>
                {openSections.workType ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#57524e]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#57524e]" />
                )}
              </button>
              {openSections.workType && (
                <div className="mt-2.5 space-y-2">
                  {WORK_TYPE_OPTIONS.map((wt) => {
                    const checked = selectedWorkTypes.includes(wt);
                    return (
                      <label
                        key={wt}
                        className="flex items-center gap-2.5 text-xs text-[#4a4542] hover:text-[#141824] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleArrayFilter(
                              selectedWorkTypes,
                              setSelectedWorkTypes,
                              wt
                            )
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-[#f81d5c] border-[#f81d5c] text-white'
                              : 'bg-white border-[#d6cdc4]'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </span>
                        <span
                          className={
                            checked ? 'font-medium text-[#141824]' : ''
                          }
                        >
                          {wt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT PRODUCT CARDS AREA (2 per row on mobile, 4 per row on desktop in Grid mode) */}
          <div className="flex-1 min-w-0 w-full">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="rounded-3xl bg-white border border-[#ece3da] p-12 text-center space-y-3">
                <p className="font-editorial text-3xl text-[#141824]">
                  No Kashmiri Creations Match Your Filters
                </p>
                <p className="font-ui text-xs sm:text-sm text-[#68635e] max-w-md mx-auto">
                  Try expanding your price range or clearing one of your
                  selected category, fabric, or size filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f81d5c] text-white text-xs font-semibold hover:bg-[#e0154f] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Show All Creations</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredAndSortedProducts.map((product) => {
                  const activeCIdx = cardColourIdx[product.id] ?? 0;
                  const activeVariant =
                    product.colours[activeCIdx] ?? product.colours[0];
                  const selectedSz = cardSize[product.id];
                  const sizeErr = cardSizeError[product.id];
                  const isWishlisted = wishlistIds.includes(product.id);
                  const isJustAdded = justAddedId === product.id;

                  return (
                    <article
                      key={product.id}
                      onClick={() =>
                        onOpenProduct(
                          product.slug,
                          activeCIdx,
                          selectedSz ?? product.defaultSize
                        )
                      }
                      className={`group rounded-[20px] bg-white border border-[#ede4db] shadow-[0_4px_20px_rgba(24,24,27,0.04)] hover:shadow-[0_12px_30px_rgba(24,24,27,0.09)] transition-all duration-300 overflow-hidden cursor-pointer ${
                        viewMode === 'list'
                          ? 'flex flex-col sm:flex-row items-stretch'
                          : 'flex flex-col justify-between'
                      }`}
                    >
                      {/* Product Image Container */}
                      <div
                        className={`relative overflow-hidden bg-[#f4ede6] ${
                          viewMode === 'list'
                            ? 'w-full sm:w-64 shrink-0 aspect-[163/189]'
                            : 'w-full aspect-[163/189]'
                        }`}
                      >
                        <img
                          src={activeVariant.image}
                          alt={`${product.name} — ${activeVariant.name}`}
                          referrerPolicy="no-referrer"
                          style={{
                            filter: activeVariant.imageFilter ?? 'none',
                          }}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-104"
                        />

                        {/* Top-Right Wishlist Heart Icon */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          aria-label={
                            isWishlisted
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          aria-pressed={isWishlisted}
                          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white shadow-sm flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.9] transition-colors ${
                              isWishlisted
                                ? 'fill-[#f81d5c] text-[#f81d5c]'
                                : 'text-[#262423]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Brand Name + Right Low Stock / Availability Label */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-ui text-[10.5px] sm:text-xs text-[#8a837c] font-medium truncate">
                              {product.brand}
                            </span>
                            {product.lowStockLabel && (
                              <span className="font-ui text-[10px] sm:text-[11px] font-bold text-[#e11d48] whitespace-nowrap">
                                {product.lowStockLabel}
                              </span>
                            )}
                          </div>

                          {/* Product Title + Optional Assured Badge */}
                          <div className="mt-0.5 flex items-start justify-between gap-1.5">
                            <h3 className="font-ui text-xs sm:text-[14px] font-semibold text-[#171821] group-hover:text-[#f81d5c] transition-colors leading-[1.35] line-clamp-2">
                              {product.name}
                            </h3>
                            {product.assuredBadge && (
                              <span
                                title="Shafiya Assured Quality"
                                className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#eef4ff] border border-[#c7dcff] text-[#1d4ed8] text-[9.5px] font-bold italic"
                              >
                                <ShieldCheck className="w-3 h-3 fill-[#1d4ed8] text-white shrink-0" />
                                <span>Assured</span>
                              </span>
                            )}
                          </div>

                          {/* Price, Original Price & Discount Row */}
                          <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                            <span className="font-ui text-sm sm:text-[17px] font-extrabold text-[#121829] tabular-nums">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="font-ui text-[11px] sm:text-xs text-[#9a948e] line-through tabular-nums">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="font-ui text-[11px] sm:text-xs font-bold text-[#15803d]">
                              {product.discountPercent}% off
                            </span>
                          </div>

                          {/* Clickable Colour Swatches Row */}
                          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                            {product.colours.map((col, idx) => {
                              const isSelectedColour = idx === activeCIdx;
                              return (
                                <button
                                  key={col.name}
                                  type="button"
                                  onClick={(e) =>
                                    handleCardColourSelect(e, product, idx)
                                  }
                                  title={`Colour: ${col.name}`}
                                  aria-label={`Select colour ${col.name}`}
                                  aria-pressed={isSelectedColour}
                                  style={{ backgroundColor: col.hex }}
                                  className={`w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full transition-transform cursor-pointer ${
                                    isSelectedColour
                                      ? 'ring-2 ring-[#f81d5c] ring-offset-1 scale-105'
                                      : 'border border-black/15 hover:scale-105'
                                  }`}
                                />
                              );
                            })}
                            {product.extraColourCount > 0 && (
                              <span className="text-[10.5px] sm:text-[11px] font-medium text-[#78726d] ml-0.5">
                                +{product.extraColourCount}
                              </span>
                            )}
                          </div>

                          {/* Size Selector inside Card */}
                          <div className="mt-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-ui text-[10.5px] sm:text-[11px] font-medium text-[#57524e]">
                                Select Size
                              </span>
                              {sizeErr && (
                                <span className="text-[10px] font-semibold text-[#e11d48]">
                                  {sizeErr}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-6 gap-1">
                              {ALL_SIZES.map((sz) => {
                                const isAvailable =
                                  activeVariant.availableSizes.includes(sz);
                                const isSelected =
                                  selectedSz === sz && isAvailable;
                                return (
                                  <button
                                    key={sz}
                                    type="button"
                                    disabled={!isAvailable}
                                    onClick={(e) =>
                                      handleCardSizeSelect(e, product.id, sz)
                                    }
                                    aria-label={`Size ${sz}${
                                      !isAvailable ? ' (Unavailable)' : ''
                                    }`}
                                    aria-pressed={isSelected}
                                    className={`h-6 sm:h-7 rounded-[6px] font-ui text-[10px] sm:text-[11px] font-semibold border transition-all ${
                                      !isAvailable
                                        ? 'bg-[#f7f4f0] text-[#c2bbb4] border-[#ebe5de] line-through cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-[#f81d5c] text-white border-[#f81d5c] shadow-2xs cursor-pointer'
                                        : 'bg-white text-[#262423] border-[#e2dad1] hover:border-[#f81d5c] cursor-pointer'
                                    }`}
                                  >
                                    {sz}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Full-Width Add to Bag Button inside Card */}
                        <button
                          type="button"
                          onClick={(e) => handleCardAddToBag(e, product)}
                          className={`mt-3 w-full h-9 sm:h-10 rounded-full font-ui text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#15803d] text-white shadow-xs'
                              : 'bg-gradient-to-r from-[#f81d5c] to-[#ff2e6c] hover:from-[#e0144f] hover:to-[#eb1e5c] text-white shadow-[0_4px_14px_rgba(248,29,92,0.26)]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.3]" />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. SCREEN 2 — MOBILE CENTRED FILTER POPUP
          (Small, centred modal with visible margins, horizontal touch-scrolling
           rows with NO visible scrollbars)
          ===================================================================== */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          onClick={() => setMobileFilterOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-36px)] max-w-[352px] max-h-[min(78dvh,600px)] rounded-[28px] bg-[#fcf9f5] border border-[#eadfd5] shadow-[0_20px_50px_rgba(0,0,0,0.28)] flex flex-col overflow-hidden"
          >
            {/* Popup Header with Decorative Pink Floral Artwork matching Screen 2 */}
            <div className="relative px-5 py-3.5 bg-white border-b border-[#efe6dd] flex items-center justify-between shrink-0 overflow-hidden">
              <img
                src="/assets/aistudio/collections_flower_right.png"
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute -top-2 right-8 w-20 h-auto object-contain opacity-65 pointer-events-none select-none"
              />
              <h3 className="relative z-10 font-editorial text-2xl font-bold text-[#141824]">
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#3a3633] hover:bg-[#f4ece4] cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* Internally Scrollable Popup Content */}
            <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
              {/* 1. Category — HORIZONTAL TOUCH-SCROLLING ROW (NO VISIBLE SCROLLBAR) */}
              <div>
                <p className="font-ui text-xs font-bold text-[#141824] mb-2">
                  Category
                </p>
                <div
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1"
                >
                  {CATEGORY_FILTER_OPTIONS.map((cat) => {
                    const active = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(
                            selectedCategories,
                            setSelectedCategories,
                            cat
                          )
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#f81d5c] text-white border-[#f81d5c] shadow-2xs'
                            : 'bg-white text-[#262423] border-[#e2dad1]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-ui text-xs font-bold text-[#141824]">
                    Price Range
                  </span>
                  <ChevronUp className="w-3.5 h-3.5 text-[#78726d]" />
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Maximum price"
                  className="w-full h-1.5 bg-[#fce2ea] rounded-lg appearance-none cursor-pointer accent-[#f81d5c]"
                />
                <div className="mt-1 flex items-center justify-between font-ui text-[11px] font-medium text-[#6e6862] tabular-nums">
                  <span>₹500</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* 3. Fabric — HORIZONTAL TOUCH-SCROLLING ROW (NO VISIBLE SCROLLBAR) */}
              <div>
                <p className="font-ui text-xs font-bold text-[#141824] mb-2">
                  Fabric
                </p>
                <div
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1"
                >
                  {FABRIC_FILTER_OPTIONS.map((fab) => {
                    const active = selectedFabrics.includes(fab);
                    return (
                      <button
                        key={fab}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(
                            selectedFabrics,
                            setSelectedFabrics,
                            fab
                          )
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#f81d5c] text-white border-[#f81d5c] shadow-2xs'
                            : 'bg-white text-[#262423] border-[#e2dad1]'
                        }`}
                      >
                        {fab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Size */}
              <div>
                <p className="font-ui text-xs font-bold text-[#141824] mb-2">
                  Size
                </p>
                <div className="grid grid-cols-6 gap-1.5">
                  {ALL_SIZES.map((sz) => {
                    const active = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(selectedSizes, setSelectedSizes, sz)
                        }
                        className={`h-8 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#f81d5c] text-white border-[#f81d5c]'
                            : 'bg-white text-[#262423] border-[#e2dad1]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Colour — HORIZONTALLY SCROLLABLE SWATCH ROW (NO VISIBLE SCROLLBAR) */}
              <div>
                <p className="font-ui text-xs font-bold text-[#141824] mb-2">
                  Colour
                </p>
                <div
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex items-center gap-2.5 overflow-x-auto no-scrollbar flex-nowrap py-1 px-0.5"
                >
                  {COLOUR_FILTER_OPTIONS.map((col) => {
                    const active = selectedColours.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(
                            selectedColours,
                            setSelectedColours,
                            col.name
                          )
                        }
                        title={col.name}
                        aria-label={`Filter by colour ${col.name}`}
                        aria-pressed={active}
                        style={{ backgroundColor: col.hex }}
                        className={`w-7 h-7 rounded-full shrink-0 transition-transform cursor-pointer ${
                          active
                            ? 'ring-2 ring-[#f81d5c] ring-offset-2 ring-offset-[#fcf9f5] scale-105'
                            : 'border border-black/15'
                        }`}
                      />
                    );
                  })}
                  <span className="w-7 h-7 rounded-full bg-white border border-[#e2dad1] text-[10.5px] font-semibold text-[#57524e] flex items-center justify-center shrink-0">
                    +3
                  </span>
                </div>
              </div>

              {/* 6. Work Type — HORIZONTAL TOUCH-SCROLLING ROW (NO VISIBLE SCROLLBAR) */}
              <div>
                <p className="font-ui text-xs font-bold text-[#141824] mb-2">
                  Work Type
                </p>
                <div
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1"
                >
                  {WORK_TYPE_OPTIONS.map((wt) => {
                    const active = selectedWorkTypes.includes(wt);
                    return (
                      <button
                        key={wt}
                        type="button"
                        onClick={() =>
                          toggleArrayFilter(
                            selectedWorkTypes,
                            setSelectedWorkTypes,
                            wt
                          )
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#f81d5c] border-[#f81d5c] text-white shadow-2xs'
                            : 'bg-white border-[#e2dad1] text-[#262423]'
                        }`}
                      >
                        {wt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fixed Bottom Footer: Reset & Apply Filters Buttons matching Screen 2 */}
            <div className="px-4 py-3.5 bg-white border-t border-[#efe6dd] flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 h-10 rounded-full bg-white border border-[#f81d5c]/65 text-xs font-semibold text-[#f81d5c] hover:bg-[#fff2f6] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[1.35] h-10 rounded-full bg-gradient-to-r from-[#f81d5c] to-[#ff2e6c] hover:from-[#e0144f] hover:to-[#eb1e5c] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Apply Filters ({filteredAndSortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. SHARED WEBSITE FOOTER
          ===================================================================== */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
