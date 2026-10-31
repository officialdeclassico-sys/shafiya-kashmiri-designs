import React from 'react';
import { NavItemKey } from './Header';

interface FooterProps {
  onNavigate?: (page: NavItemKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: NavItemKey,
    targetId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
      window.setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
    }
  };

  return (
    <footer
      id="contact"
      className="w-full bg-[#f7f1ea] border-t border-[#eadfd4] pt-12 pb-10 px-4 sm:px-6 lg:px-[4%]"
    >
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#e5d9cd]">
        <div>
          <p className="font-editorial text-3xl font-medium text-[#141416]">
            Shafiya
          </p>
          <p className="font-ui text-[9px] font-semibold uppercase tracking-[0.36em] text-[#222226] mt-1">
            KASHMIRI DESIGNS
          </p>
          <p className="font-ui text-xs text-[#57524e] mt-2.5 max-w-sm">
            Handcrafted Kashmiri designs reimagined for the modern woman — where heritage meets your everyday story.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-12 text-xs text-[#3a3532]">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#141416] mb-2">
              Srinagar Flagship Atelier
            </p>
            <p>Boulevard Road, Dal Lake</p>
            <p>Srinagar, Kashmir 190001</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#141416] mb-2">
              Contact &amp; Inquiries
            </p>
            <p>atelier@shafiyakashmir.com</p>
            <p>+91 (194) 245-8910 · Mon–Sat</p>
          </div>
        </div>
      </div>

      <div className="w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6e6762]">
        <p>
          © {new Date().getFullYear()} Shafiya Kashmiri Designs. Curated with love from Kashmir to you.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'Home', 'home')}
            className="hover:text-[#f83a6b] transition-colors"
          >
            Home
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#collections"
            onClick={(e) => handleLinkClick(e, 'Collections', 'collections')}
            className="hover:text-[#f83a6b] transition-colors"
          >
            Collections
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#custom-designs"
            onClick={(e) => handleLinkClick(e, 'Custom Designs', 'contact-enquiry')}
            className="hover:text-[#f83a6b] transition-colors"
          >
            Custom Designs
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#our-story"
            onClick={(e) => handleLinkClick(e, 'Our Story', 'our-story')}
            className="hover:text-[#f83a6b] transition-colors"
          >
            Our Story
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'Contact', 'contact')}
            className="hover:text-[#f83a6b] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
