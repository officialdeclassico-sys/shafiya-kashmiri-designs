import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES, BagItem } from '../data/heroSlides';
import { getAssetUrl } from '../utils/assetPath';
import { Header, NavItemKey } from './Header';

interface HeroBannerProps {
  activePage?: NavItemKey;
  onNavigate?: (page: NavItemKey) => void;
  onOpenSignIn: () => void;
  onSelectCategory?: (categoryId: string) => void;
  bagItems?: BagItem[];
  onAddSampleBagItem?: () => void;
  onRemoveBagItem?: (id: string) => void;
  onOpenBagPage?: () => void;
  wishlistIds?: string[];
  wishlistActive?: boolean;
  onToggleHeaderWishlist?: () => void;
  onToggleWishlistItem?: (id: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activePage,
  onNavigate,
  onOpenSignIn,
  onSelectCategory,
  bagItems,
  onAddSampleBagItem,
  onRemoveBagItem,
  onOpenBagPage,
  wishlistIds,
  wishlistActive,
  onToggleHeaderWishlist,
  onToggleWishlistItem,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scriptImgError, setScriptImgError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = HERO_SLIDES.length;
  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handleSelectSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // 5-second automatic slide transition with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, currentSlide, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Subtle filter variations on the background canvas for slides 2 & 3 while keeping slide 1 100% original
  const canvasFilterStyle =
    currentSlide === 0
      ? 'none'
      : currentSlide === 1
      ? 'saturate(1.06) contrast(1.02)'
      : 'hue-rotate(-4deg) saturate(1.05)';

  return (
    <section
      id="home"
      aria-label="Shafiya Kashmiri Designs Hero Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#fcf8f3] overflow-hidden select-none"
    >
      {/* =====================================================================
          DESKTOP COMPOSITION (lg and up) — Exact 1918:820 Reference Proportions
          ===================================================================== */}
      <div className="hidden lg:block relative w-full aspect-[1918/820] max-w-[2560px] mx-auto overflow-hidden bg-[#fcf8f3]">
        {/* Reference Visual Canvas Layer (Central Model, Pink Circle, Floral Line Art, Brush Strokes & Right Collage) */}
        <motion.img
          key={`canvas-${currentSlide}`}
          src={getAssetUrl('assets/aistudio/hero_clean_canvas.png')}
          alt="Joyful woman wearing handcrafted floral embroidered Kashmiri ensemble beside Kashmir embroidery and Dal Lake collage"
          referrerPolicy="no-referrer"
          initial={{ opacity: 0.92, scale: 1.008 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: canvasFilterStyle }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Accessible semantic markers for Right Collage images (visually rendered in the reference canvas at exact positions) */}
        <div
          aria-label={slide.embroideryCaption}
          title={slide.embroideryCaption}
          className="
            absolute left-[79.8%] top-[14.6%] w-[11.8%] h-[48.2%]
            rounded-[2.2vw] pointer-events-auto
          "
        />
        <div
          aria-label={slide.landscapeCaption}
          title={slide.landscapeCaption}
          className="
            absolute left-[83.2%] top-[49.4%] w-[13.9%] h-[37.6%]
            rounded-[2.2vw] pointer-events-auto
          "
        />

        {/* Top Header Overlay seamlessly integrated into the Hero top band */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <Header
            activePage={activePage}
            onNavigate={onNavigate}
            onOpenSignIn={onOpenSignIn}
            onSelectCollectionSlide={handleSelectSlide}
            onSelectCategory={onSelectCategory}
            bagItems={bagItems}
            onAddSampleBagItem={onAddSampleBagItem}
            onRemoveBagItem={onRemoveBagItem}
            wishlistIds={wishlistIds}
            wishlistActive={wishlistActive}
            onToggleHeaderWishlist={onToggleHeaderWishlist}
            onToggleWishlistItem={onToggleWishlistItem}
            onOpenBagPage={onOpenBagPage}
          />
        </div>

        {/* Left Editorial Content Block */}
        <div className="absolute left-[5.26%] top-[19.1%] z-20 w-[28%] pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-content-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Small uppercase eyebrow */}
              <p className="font-ui text-[clamp(9.5px,0.75vw,14.5px)] font-medium uppercase tracking-[0.29em] text-[#f43f70] leading-[1.68]">
                <span className="block whitespace-nowrap">
                  {slide.eyebrowLine1}
                </span>
                <span className="block whitespace-nowrap">
                  {slide.eyebrowLine2}
                </span>
              </p>

              {/* Large Editorial Serif Headline + Handwritten Pink Script Overlay */}
              <div className="relative mt-[1.1vw]">
                <h1 className="font-editorial text-[clamp(44px,4.85vw,93px)] font-normal text-[#141416] leading-[0.97] tracking-[-0.02em]">
                  <span className="block whitespace-nowrap">
                    {slide.headlineLine1}
                  </span>
                  <span className="block whitespace-nowrap">
                    {slide.headlineLine2}
                  </span>
                  <span className="block whitespace-nowrap">
                    {slide.headlineLine3}
                  </span>
                </h1>

                {/* Handwritten Pink Script positioned across the headline exactly as in reference */}
                {slide.useReferenceScriptAsset && !scriptImgError ? (
                  <div className="pointer-events-none select-none">
                    <span className="sr-only">{slide.scriptWord}</span>
                    <img
                      src={getAssetUrl('assets/aistudio/script_beautiful.png')}
                      alt=""
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      onError={() => setScriptImgError(true)}
                      className="absolute left-[47.5%] top-[28.5%] w-[48.5%] max-w-none h-auto object-contain"
                    />
                  </div>
                ) : (
                  <span
                    className="font-script text-[#f83a6b] text-[clamp(48px,5.2vw,100px)] leading-none absolute left-[48%] top-[33%] -rotate-[14deg] whitespace-nowrap pointer-events-none select-none drop-shadow-[0_1px_1px_rgba(252,248,243,0.6)]"
                  >
                    {slide.scriptWord}
                  </span>
                )}
              </div>

              {/* Description (No CTA button below description) */}
              <p className="mt-[2.15vw] font-ui text-[clamp(11px,0.9vw,17.2px)] font-normal text-[#262423] leading-[1.62] tracking-[0.005em]">
                {slide.description.map((line, i) => (
                  <span key={i} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right-Side Text Panel: COLOURS / CULTURE / CRAFTSMANSHIP / CONTEMPORARY / STYLE */}
        <div className="absolute left-[93.0%] top-[25.3%] z-20 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`pillars-${slide.id}`}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col"
            >
              {slide.pillars.map((word) => (
                <span
                  key={word}
                  className="font-ui text-[clamp(7.5px,0.54vw,10.5px)] font-semibold uppercase tracking-[0.21em] text-[#1e1e22] leading-[2.15] whitespace-nowrap"
                >
                  {word}
                </span>
              ))}
              <span
                aria-hidden="true"
                className="mt-[0.75vw] w-[clamp(20px,1.75vw,34px)] h-[1.5px] bg-[#2e7d32] block"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom-Left: Three overlapping circular fashion thumbnails + CURATED WITH LOVE FROM KASHMIR TO YOU */}
        <div className="absolute left-[5.05%] bottom-[6.2%] z-20 flex items-center gap-[1.15vw] pointer-events-auto">
          <div className="flex items-center -space-x-[0.75vw]">
            {[
              getAssetUrl('assets/aistudio/avatar_1.png'),
              getAssetUrl('assets/aistudio/avatar_2.png'),
              getAssetUrl('assets/aistudio/avatar_3.png'),
            ].map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => handleSelectSlide(idx)}
                aria-label={`Preview Kashmiri Look 0${idx + 1}`}
                className={`relative w-[clamp(38px,3.05vw,58px)] h-[clamp(38px,3.05vw,58px)] rounded-full overflow-hidden border-[2px] border-white shadow-sm transition-transform duration-200 hover:scale-105 hover:z-10 cursor-pointer ${
                  currentSlide === idx ? 'ring-2 ring-[#f83a6b]/50' : ''
                }`}
              >
                <img
                  src={src}
                  alt={`Kashmiri design thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`curated-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-ui text-[clamp(8px,0.52vw,10px)] font-semibold uppercase tracking-[0.22em] text-[#222020] leading-[1.85]"
            >
              <span className="block whitespace-nowrap">
                {slide.curatedLine1}
              </span>
              <span className="block whitespace-nowrap">
                {slide.curatedLine2}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom-Right: Functional Hero Carousel Controls (Prev arrow, 01 02 03 indicators, Next arrow) */}
        <div
          aria-label="Hero Carousel Controls"
          className="absolute right-[3.1%] bottom-[3.6%] z-20 flex items-center gap-[1.2vw] pointer-events-auto"
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-[clamp(32px,2.2vw,42px)] h-[clamp(32px,2.2vw,42px)] rounded-full border border-[#1e1e22] text-[#1e1e22] hover:bg-[#1e1e22] hover:text-white active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft className="w-[42%] h-[42%] stroke-[1.7]" />
          </button>

          <div
            role="tablist"
            aria-label="Hero Slides"
            className="relative flex items-center"
          >
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.numberLabel}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${s.numberLabel}`}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative px-[0.65vw] pb-[0.45vw] pt-[0.2vw] font-ui text-[clamp(10px,0.68vw,13px)] tracking-[0.08em] tabular-nums transition-colors cursor-pointer ${
                    isActive
                      ? 'font-bold text-[#17171a]'
                      : 'font-semibold text-[#c2bdb7] hover:text-[#6e6762]'
                  }`}
                >
                  {s.numberLabel}
                  {/* Continuous baseline track + active pink indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 bottom-0 h-[2px] transition-colors ${
                      isActive ? 'bg-[#f83a6b]' : 'bg-[#ebe5de]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="w-[clamp(32px,2.2vw,42px)] h-[clamp(32px,2.2vw,42px)] rounded-full border border-[#1e1e22] text-[#1e1e22] hover:bg-[#1e1e22] hover:text-white active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowRight className="w-[42%] h-[42%] stroke-[1.7]" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          TABLET & MOBILE COMPOSITION (< lg) — Horizontal Landscape Composition
          ===================================================================== */}
      <div className="lg:hidden relative w-full bg-[#fcf8f3] overflow-hidden">
        {/* Top Mobile Header (Logo + Search Icon + Hamburger; Expandable Search; Slide-Out Drawer) */}
        <Header
          activePage={activePage}
          onNavigate={onNavigate}
          onOpenSignIn={onOpenSignIn}
          onSelectCollectionSlide={handleSelectSlide}
          onSelectCategory={onSelectCategory}
          bagItems={bagItems}
          onAddSampleBagItem={onAddSampleBagItem}
          onRemoveBagItem={onRemoveBagItem}
          wishlistIds={wishlistIds}
          wishlistActive={wishlistActive}
          onToggleHeaderWishlist={onToggleHeaderWishlist}
          onToggleWishlistItem={onToggleWishlistItem}
          onOpenBagPage={onOpenBagPage}
        />

        {/* Compact Horizontal Landscape Banner for Mobile & Tablet */}
        <div className="relative w-full aspect-[16/6.2] sm:aspect-[16/5.5] md:aspect-[1918/820] max-h-[400px] overflow-hidden bg-[#fcf8f3] select-none">
          {/* Reference Visual Canvas Layer */}
          <motion.img
            key={`mobile-canvas-${currentSlide}`}
            src={getAssetUrl('assets/aistudio/hero_clean_canvas.png')}
            alt="Joyful woman wearing handcrafted floral embroidered Kashmiri ensemble beside Kashmir embroidery and Dal Lake collage"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0.92, scale: 1.008 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: canvasFilterStyle }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Left Editorial Content Block */}
          <div className="absolute left-[4.8%] top-[11%] sm:top-[15%] md:top-[18%] z-20 w-[46%] sm:w-[38%] md:w-[32%] pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-left-${slide.id}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Small uppercase eyebrow */}
                <p className="font-ui text-[clamp(6.5px,1.8vw,11.5px)] font-semibold uppercase tracking-[0.24em] text-[#f43f70] leading-[1.3]">
                  <span className="block whitespace-nowrap">{slide.eyebrowLine1}</span>
                  <span className="block whitespace-nowrap">{slide.eyebrowLine2}</span>
                </p>

                {/* Large Editorial Serif Headline + Handwritten Pink Script Overlay */}
                <div className="relative mt-[0.5vw]">
                  <h1 className="font-editorial text-[clamp(17px,4.5vw,42px)] font-normal text-[#141416] leading-[0.96] tracking-[-0.02em]">
                    <span className="block whitespace-nowrap">{slide.headlineLine1}</span>
                    <span className="block whitespace-nowrap">{slide.headlineLine2}</span>
                    <span className="block whitespace-nowrap">{slide.headlineLine3}</span>
                  </h1>

                  {/* Handwritten Pink Script */}
                  {slide.useReferenceScriptAsset && !scriptImgError ? (
                    <div className="pointer-events-none select-none">
                      <span className="sr-only">{slide.scriptWord}</span>
                      <img
                        src={getAssetUrl('assets/aistudio/script_beautiful.png')}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        onError={() => setScriptImgError(true)}
                        className="absolute left-[44%] top-[24%] w-[48%] max-w-[90px] sm:max-w-[130px] md:max-w-[160px] h-auto object-contain"
                      />
                    </div>
                  ) : (
                    <span className="font-script text-[#f83a6b] text-[clamp(18px,4.8vw,46px)] leading-none absolute left-[45%] top-[28%] -rotate-[14deg] whitespace-nowrap pointer-events-none select-none drop-shadow-xs">
                      {slide.scriptWord}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-[0.6vw] sm:mt-[1vw] font-ui text-[clamp(7.5px,1.6vw,12.5px)] font-normal text-[#262423] leading-[1.4] tracking-[0.005em] line-clamp-2 max-w-[280px]">
                  {slide.description.join(' ')}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right-Side Text Pillars (Tablet md screens) */}
          <div className="hidden md:flex absolute left-[92.5%] top-[22%] z-20 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-pillars-${slide.id}`}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col"
              >
                {slide.pillars.map((word) => (
                  <span
                    key={`mob-pillar-${word}`}
                    className="font-ui text-[7px] font-semibold uppercase tracking-[0.2em] text-[#1e1e22] leading-[1.9] whitespace-nowrap"
                  >
                    {word}
                  </span>
                ))}
                <span aria-hidden="true" className="mt-1 w-4 h-[1px] bg-[#2e7d32] block" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom-Left: Three overlapping circular thumbnails + CURATED WITH LOVE (tablet & larger mobile) */}
          <div className="hidden sm:flex absolute left-[4.8%] bottom-[5%] z-20 items-center gap-[1vw] pointer-events-auto">
            <div className="flex items-center -space-x-[0.6vw]">
              {[
                getAssetUrl('assets/aistudio/avatar_1.png'),
                getAssetUrl('assets/aistudio/avatar_2.png'),
                getAssetUrl('assets/aistudio/avatar_3.png'),
              ].map((src, idx) => (
                <button
                  key={`mob-thumb-${src}`}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={`Preview Kashmiri Look 0${idx + 1}`}
                  className={`relative w-[clamp(22px,3vw,38px)] h-[clamp(22px,3vw,38px)] rounded-full overflow-hidden border-[1.5px] border-white shadow-xs transition-transform duration-200 hover:scale-105 hover:z-10 cursor-pointer ${
                    currentSlide === idx ? 'ring-1.5 ring-[#f83a6b]/50' : ''
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="font-ui text-[clamp(6.5px,1vw,8.5px)] font-semibold uppercase tracking-[0.2em] text-[#222020] leading-tight">
              <span className="block whitespace-nowrap">{slide.curatedLine1}</span>
              <span className="block whitespace-nowrap">{slide.curatedLine2}</span>
            </div>
          </div>

          {/* Bottom-Right: Hero Carousel Controls (Prev arrow, 01 02 03 indicators, Next arrow) */}
          <div
            aria-label="Hero Carousel Controls"
            className="absolute right-[2.8%] bottom-[5%] z-20 flex items-center gap-[0.8vw] pointer-events-auto"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-[clamp(22px,3vw,34px)] h-[clamp(22px,3vw,34px)] rounded-full border border-[#1e1e22]/80 bg-white/70 backdrop-blur-xs text-[#1e1e22] hover:bg-[#1e1e22] hover:text-white active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-[42%] h-[42%] stroke-[2]" />
            </button>

            <div
              role="tablist"
              aria-label="Hero Slides"
              className="relative flex items-center"
            >
              {HERO_SLIDES.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={`mob-ind-${s.numberLabel}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${s.numberLabel}`}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative px-[0.5vw] sm:px-[0.6vw] pb-[0.3vw] pt-[0.15vw] font-ui text-[clamp(8.5px,1.4vw,11.5px)] tracking-[0.06em] tabular-nums transition-colors cursor-pointer ${
                      isActive
                        ? 'font-bold text-[#17171a]'
                        : 'font-semibold text-[#8a847e] hover:text-[#17171a]'
                    }`}
                  >
                    {s.numberLabel}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 bottom-0 h-[1.5px] sm:h-[2px] transition-colors ${
                        isActive ? 'bg-[#f83a6b]' : 'bg-[#ebe5de]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-[clamp(22px,3vw,34px)] h-[clamp(22px,3vw,34px)] rounded-full border border-[#1e1e22]/80 bg-white/70 backdrop-blur-xs text-[#1e1e22] hover:bg-[#1e1e22] hover:text-white active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <ArrowRight className="w-[42%] h-[42%] stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
