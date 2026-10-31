/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HeroBanner } from './components/HeroBanner';
import { OurStoryPage } from './components/OurStoryPage';
import { ContactPage } from './components/ContactPage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ShoppingBagCheckoutFlow } from './components/ShoppingBagCheckoutFlow';
import { SignInModal } from './components/SignInModal';
import { NavItemKey } from './components/Header';
import { BagItem } from './data/heroSlides';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  SizeOption,
} from './data/productsData';

type AppView =
  | NavItemKey
  | 'ProductDetails'
  | 'Bag'
  | 'Checkout'
  | 'OrderConfirmation';

const BAG_STORAGE_KEY = 'shafiya_bag_items_v1';
const WISHLIST_STORAGE_KEY = 'shafiya_wishlist_ids_v1';

// Default initial bag items matching Screen 8 (Subtotal ₹2,556 across 3 items)
const INITIAL_REFERENCE_BAG_ITEMS: BagItem[] = [
  {
    id: `${CATALOG_PRODUCTS[0].id}__Black__M`,
    productId: CATALOG_PRODUCTS[0].id,
    name: CATALOG_PRODUCTS[0].name,
    variant: 'Black | M',
    price: `₹${CATALOG_PRODUCTS[0].price.toLocaleString('en-IN')}`,
    numericPrice: CATALOG_PRODUCTS[0].price,
    originalNumericPrice: CATALOG_PRODUCTS[0].originalPrice,
    stockQuantity: CATALOG_PRODUCTS[0].stockQuantity,
    size: 'M',
    colour: 'Black',
    productSlug: CATALOG_PRODUCTS[0].slug,
    quantity: 1,
    image: CATALOG_PRODUCTS[0].colours[0].image,
  },
  {
    id: `${CATALOG_PRODUCTS[1].id}__Rose Pink__S`,
    productId: CATALOG_PRODUCTS[1].id,
    name: CATALOG_PRODUCTS[1].name,
    variant: 'Pink | S',
    price: `₹${CATALOG_PRODUCTS[1].price.toLocaleString('en-IN')}`,
    numericPrice: CATALOG_PRODUCTS[1].price,
    originalNumericPrice: CATALOG_PRODUCTS[1].originalPrice,
    stockQuantity: CATALOG_PRODUCTS[1].stockQuantity,
    size: 'S',
    colour: 'Pink',
    productSlug: CATALOG_PRODUCTS[1].slug,
    quantity: 1,
    image: CATALOG_PRODUCTS[1].colours[0].image,
  },
  {
    id: `${CATALOG_PRODUCTS[2].id}__Antique Gold__L`,
    productId: CATALOG_PRODUCTS[2].id,
    name: CATALOG_PRODUCTS[2].name,
    variant: 'Beige | L',
    price: `₹${CATALOG_PRODUCTS[2].price.toLocaleString('en-IN')}`,
    numericPrice: CATALOG_PRODUCTS[2].price,
    originalNumericPrice: CATALOG_PRODUCTS[2].originalPrice,
    stockQuantity: CATALOG_PRODUCTS[2].stockQuantity,
    size: 'L',
    colour: 'Beige',
    productSlug: CATALOG_PRODUCTS[2].slug,
    quantity: 1,
    image: CATALOG_PRODUCTS[2].colours[0].image,
  },
];

function parseRouteFromLocation(): {
  page: AppView;
  productSlug?: string;
} {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  let path = window.location.pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const route = cleanPath || hash;

  if (route === 'our-story' || route.startsWith('our-story')) {
    return { page: 'Our Story' };
  }
  if (route === 'custom-designs' || route.startsWith('custom-designs')) {
    return { page: 'Custom Designs' };
  }
  if (
    route === 'contact' ||
    route === 'contact-us' ||
    route.startsWith('contact')
  ) {
    return { page: 'Contact' };
  }
  if (route === 'collections' || route.startsWith('collections')) {
    return { page: 'Collections' };
  }
  if (route === 'bag' || route === 'cart') {
    return { page: 'Bag' };
  }
  if (route === 'checkout') {
    return { page: 'Checkout' };
  }
  if (route.startsWith('product/')) {
    const slug = route.replace('product/', '');
    return { page: 'ProductDetails', productSlug: slug };
  }
  return { page: 'Home' };
}

function getPathForPage(page: AppView, productSlug?: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  let subpath = '';
  switch (page) {
    case 'Our Story':
      subpath = '/our-story';
      break;
    case 'Custom Designs':
      subpath = '/custom-designs';
      break;
    case 'Contact':
      subpath = '/contact';
      break;
    case 'Collections':
      subpath = '/collections';
      break;
    case 'Bag':
      subpath = '/bag';
      break;
    case 'Checkout':
      subpath = '/checkout';
      break;
    case 'OrderConfirmation':
      subpath = '/checkout';
      break;
    case 'ProductDetails':
      subpath = productSlug ? `/product/${productSlug}` : '/collections';
      break;
    case 'Home':
    default:
      subpath = '/';
      break;
  }
  return `${base}${subpath}` || '/';
}

export default function App() {
  const initialRoute = parseRouteFromLocation();
  const [currentPage, setCurrentPage] = useState<AppView>(initialRoute.page);
  const [signInOpen, setSignInOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return [CATALOG_PRODUCTS[0].id, CATALOG_PRODUCTS[1].id];
  });

  const [bagItems, setBagItems] = useState<BagItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(BAG_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return INITIAL_REFERENCE_BAG_ITEMS;
  });

  // Persist bag and wishlist changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // ignore storage errors
    }
  }, [bagItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistIds)
      );
    } catch {
      // ignore storage errors
    }
  }, [wishlistIds]);

  // Active Product Details Page state
  const [activeProductSlug, setActiveProductSlug] = useState<string>(
    initialRoute.productSlug || CATALOG_PRODUCTS[0].slug
  );
  const [activeProductColourIdx, setActiveProductColourIdx] =
    useState<number>(0);
  const [activeProductSize, setActiveProductSize] = useState<
    SizeOption | undefined
  >(CATALOG_PRODUCTS[0].defaultSize);

  // Synchronize route on browser back/forward and hash changes
  useEffect(() => {
    const handlePopState = () => {
      const current = parseRouteFromLocation();
      setCurrentPage(current.page);
      if (current.productSlug) {
        setActiveProductSlug(current.productSlug);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleHeaderWishlist = () => {
    setWishlistIds((prev) =>
      prev.length > 0 ? [] : [CATALOG_PRODUCTS[0].id]
    );
  };

  const handleAddVariantToBag = (
    product: CatalogProduct,
    colourName: string,
    size: SizeOption,
    quantity: number,
    variantImage: string
  ) => {
    const compositeId = `${product.id}__${colourName}__${size}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? {
                ...item,
                quantity: Math.min(
                  product.stockQuantity,
                  item.quantity + quantity
                ),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          productId: product.id,
          name: product.name,
          variant: `${colourName} | ${size}`,
          price: `₹${product.price.toLocaleString('en-IN')}`,
          numericPrice: product.price,
          originalNumericPrice: product.originalPrice,
          stockQuantity: product.stockQuantity,
          size,
          colour: colourName,
          productSlug: product.slug,
          quantity,
          image: variantImage,
        },
      ];
    });
  };

  const handleUpdateBagQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const maxStock = item.stockQuantity ?? 99;
          const nextQty = Math.min(maxStock, item.quantity + delta);
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddSampleBagItem = () => {
    const defaultProd = CATALOG_PRODUCTS[0];
    handleAddVariantToBag(
      defaultProd,
      defaultProd.colours[0].name,
      defaultProd.defaultSize,
      1,
      defaultProd.colours[0].image
    );
  };

  const handleRemoveBagItem = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllBag = () => {
    setBagItems([]);
  };

  const handleNavigate = (page: NavItemKey) => {
    setCurrentPage(page);
    const newPath = getPathForPage(page);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBagPage = () => {
    setCurrentPage('Bag');
    const newPath = getPathForPage('Bag');
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckoutPage = () => {
    setCurrentPage('Checkout');
    const newPath = getPathForPage('Checkout');
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (
    productSlug: string,
    colourIdx = 0,
    size?: SizeOption
  ) => {
    setActiveProductSlug(productSlug);
    setActiveProductColourIdx(colourIdx);
    setActiveProductSize(size);
    setCurrentPage('ProductDetails');
    const newPath = getPathForPage('ProductDetails', productSlug);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-[#fcfaf6] overflow-x-clip">
      {currentPage === 'Bag' ||
      currentPage === 'Checkout' ||
      currentPage === 'OrderConfirmation' ? (
        <ShoppingBagCheckoutFlow
          initialStage={
            currentPage === 'Checkout'
              ? 'checkout'
              : currentPage === 'OrderConfirmation'
              ? 'confirmation'
              : 'bag'
          }
          bagItems={bagItems}
          onUpdateBagQuantity={handleUpdateBagQuantity}
          onRemoveBagItem={handleRemoveBagItem}
          onClearAllBag={handleClearAllBag}
          onAddSampleBagItem={handleAddSampleBagItem}
          onOpenProduct={(slug) => handleOpenProduct(slug)}
          onContinueShopping={() => {
            handleNavigate('Collections');
          }}
          onNavigate={handleNavigate}
          onOpenSignIn={() => setSignInOpen(true)}
          wishlistIds={wishlistIds}
          onToggleHeaderWishlist={handleToggleHeaderWishlist}
          onToggleWishlistItem={handleToggleWishlist}
        />
      ) : currentPage === 'Contact' || currentPage === 'Custom Designs' ? (
        <ContactPage
          isCustomDesigns={currentPage === 'Custom Designs'}
          onOpenSignIn={() => setSignInOpen(true)}
          onNavigate={handleNavigate}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'Custom Designs') {
              handleNavigate('Custom Designs');
            } else {
              handleNavigate('Collections');
            }
          }}
          bagItems={bagItems}
          onAddSampleBagItem={handleAddSampleBagItem}
          onRemoveBagItem={handleRemoveBagItem}
          onOpenBagPage={handleOpenBagPage}
          wishlistIds={wishlistIds}
          wishlistActive={wishlistIds.length > 0}
          onToggleHeaderWishlist={handleToggleHeaderWishlist}
          onToggleWishlistItem={handleToggleWishlist}
          initialEnquiryType={
            currentPage === 'Custom Designs' ? 'Custom Design Enquiry' : ''
          }
        />
      ) : currentPage === 'Our Story' ? (
        <OurStoryPage
          onOpenSignIn={() => setSignInOpen(true)}
          onNavigate={handleNavigate}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'Custom Designs') {
              handleNavigate('Custom Designs');
            } else {
              handleNavigate('Collections');
            }
          }}
          bagItems={bagItems}
          onAddSampleBagItem={handleAddSampleBagItem}
          onRemoveBagItem={handleRemoveBagItem}
          onOpenBagPage={handleOpenBagPage}
          wishlistIds={wishlistIds}
          wishlistActive={wishlistIds.length > 0}
          onToggleHeaderWishlist={handleToggleHeaderWishlist}
          onToggleWishlistItem={handleToggleWishlist}
        />
      ) : currentPage === 'Collections' ? (
        <ProductListingPage
          onOpenSignIn={() => setSignInOpen(true)}
          onNavigate={handleNavigate}
          onOpenProduct={handleOpenProduct}
          selectedCollectionCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          bagItems={bagItems}
          onAddVariantToBag={handleAddVariantToBag}
          onRemoveBagItem={handleRemoveBagItem}
          onUpdateBagQuantity={handleUpdateBagQuantity}
          onOpenBagPage={handleOpenBagPage}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onToggleHeaderWishlist={handleToggleHeaderWishlist}
        />
      ) : currentPage === 'ProductDetails' ? (
        <ProductDetailsPage
          productSlug={activeProductSlug}
          initialColourIdx={activeProductColourIdx}
          initialSize={activeProductSize}
          onOpenSignIn={() => setSignInOpen(true)}
          onNavigate={handleNavigate}
          onBackToListing={(cat) => {
            if (cat) setSelectedCategory(cat);
            handleNavigate('Collections');
          }}
          onOpenProduct={handleOpenProduct}
          onSelectCategory={setSelectedCategory}
          bagItems={bagItems}
          onAddVariantToBag={handleAddVariantToBag}
          onRemoveBagItem={handleRemoveBagItem}
          onUpdateBagQuantity={handleUpdateBagQuantity}
          onOpenBagPage={handleOpenBagPage}
          onBuyNowProceedToCheckout={handleOpenCheckoutPage}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onToggleHeaderWishlist={handleToggleHeaderWishlist}
        />
      ) : (
        <>
          {/* Section 1: Existing Homepage Hero Banner */}
          <HeroBanner
            activePage="Home"
            onNavigate={handleNavigate}
            onOpenSignIn={() => setSignInOpen(true)}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat === 'Custom Designs') {
                handleNavigate('Custom Designs');
              } else {
                document
                  .getElementById('collection-catalog-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            bagItems={bagItems}
            onAddSampleBagItem={handleAddSampleBagItem}
            onRemoveBagItem={handleRemoveBagItem}
            onOpenBagPage={handleOpenBagPage}
            wishlistIds={wishlistIds}
            wishlistActive={wishlistIds.length > 0}
            onToggleHeaderWishlist={handleToggleHeaderWishlist}
            onToggleWishlistItem={handleToggleWishlist}
          />

          {/* Section 2: Product Collection Listing (Shared with Collections Page) + Shared Footer */}
          <ProductListingPage
            embeddedInHomepage={true}
            onOpenSignIn={() => setSignInOpen(true)}
            onNavigate={handleNavigate}
            onOpenProduct={handleOpenProduct}
            selectedCollectionCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            bagItems={bagItems}
            onAddVariantToBag={handleAddVariantToBag}
            onRemoveBagItem={handleRemoveBagItem}
            onUpdateBagQuantity={handleUpdateBagQuantity}
            onOpenBagPage={handleOpenBagPage}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onToggleHeaderWishlist={handleToggleHeaderWishlist}
          />
        </>
      )}

      {/* Sign In Modal */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </main>
  );
}
