"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

declare global {
  interface Window {
    TEMPORARILY_DISABLE_TABS?: boolean;
    NAVIGATION_IN_PROGRESS?: boolean;
    FORCE_DISABLE_SCROLL_LOCK?: boolean;
  }
}

export function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "Why us",
      link: "#whyus",
    },
    {
      name: "Our Services",
      link: "#ourServices",
    },
  ];


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleContactNavigation = () => {
    console.log("🎯 CONTACT NAVIGATION - FORCE UNLOCK ALL RESTRICTIONS");
    
    // 1. IMMEDIATE FLAGS - More comprehensive
    window.TEMPORARILY_DISABLE_TABS = true;
    window.NAVIGATION_IN_PROGRESS = true;
    window.FORCE_DISABLE_SCROLL_LOCK = true;
    
    // 2. FORCE UNLOCK ALL SCROLL RESTRICTIONS - NUCLEAR APPROACH
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.touchAction = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    
    // 3. FORCE RESET SCROLL POSITION LOCKS
    window.onscroll = null;
    
    // 4. DISABLE ALL SCROLL EVENT LISTENERS TEMPORARILY
    const originalAddEventListener = document.addEventListener;
    
    // Temporarily override addEventListener to prevent new scroll listeners
    document.addEventListener = function(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) {
      if (type === 'scroll' || type === 'wheel' || type === 'touchmove') {
        console.log("🚫 Blocking scroll listener during navigation");
        return;
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    // 5. IMMEDIATE NAVIGATION - No delays
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const targetPosition = contactElement.offsetTop;
        console.log("🎯 Immediate scroll to:", targetPosition);
        
        // Use requestAnimationFrame for smoother navigation
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Backup method
          contactElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        });
      }
    }, 50); // Small delay to ensure all flags are set
    
    // 6. Restore addEventListener after navigation
    setTimeout(() => {
      document.addEventListener = originalAddEventListener;
      window.NAVIGATION_IN_PROGRESS = false;
      window.FORCE_DISABLE_SCROLL_LOCK = false;
      console.log("🎯 Navigation completed, addEventListener restored");
    }, 3000);
    
    // 7. Extended disable period for tabs
    setTimeout(() => {
      window.TEMPORARILY_DISABLE_TABS = false;
      console.log("🎯 Tab system re-enabled");
    }, 5000);
  };
  


  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton 
              variant="primary"
              onClick={handleContactNavigation}
            >
              Contact us
            </NavbarButton>
          </div>
        </NavBody>


        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>


          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            // onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={handleContactNavigation}
                variant="primary"
                className="w-full"
              >
                Contact us
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
