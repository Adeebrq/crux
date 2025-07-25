"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const originalTabs = useRef(propTabs); // Prevent re-render on every scroll
  const [tabs, setTabs] = useState<Tab[]>(originalTabs.current);
  const [active, setActive] = useState<Tab>(tabs[0]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  // const [isFullyVisible, setIsFullyVisible] = useState(false);
  // const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [hasExitedUp, setHasExitedUp] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const fadeInDivRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const isChangingTab = useRef(false);
  const lastScrollTime = useRef(0);
  const scrollThrottle = 1200; // ms
  const scrollPositionWhenLocked = useRef(0);
  const initialScrollY = useRef<number | null>(null);

  const tabContentRefs = useRef<(React.RefObject<HTMLDivElement | null>)[]>(
    propTabs.map(() => useRef<HTMLDivElement | null>(null))
  );

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileInitialized, setIsMobileInitialized] = useState(false);
  const [TAB_SWITCH_START, setTAB_SWITCH_START] = useState(1600);
  const [TAB_SWITCH_END, setTAB_SWITCH_END] = useState(1800);

  // Mobile auto-scroll state - UPDATED
  const [isAutoScrolling, setIsAutoScrolling] = useState(false); // Changed from true to false
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  
  // NEW: Add state to track if tabs section is visible
  const [isTabsSectionVisible, setIsTabsSectionVisible] = useState(false);

  // Mobile detection with resize listener - Initialize synchronously
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setTAB_SWITCH_START(mobile ? 2100 : 1600);
      setTAB_SWITCH_END(mobile ? 2300 : 1800);
      setIsMobileInitialized(true);
      console.log("📱 Mobile check:", mobile, "TAB_SWITCH_START:", mobile ? 2100 : 1600);
    };

    checkMobile(); // Check on mount synchronously
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile auto-scroll functionality - UPDATED
  useEffect(() => {
    if (!isMobile || !isMobileInitialized) return;

    const startAutoScroll = () => {
      console.log("🚀 Starting mobile auto-scroll");
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        if (!isUserInteracting && mobileTabsRef.current && isTabsSectionVisible) { // Added isTabsSectionVisible check
          const nextIndex = (currentTabIndex + 1) % originalTabs.current.length;
          setCurrentTabIndex(nextIndex);
          moveSelectedTabToTop(nextIndex);
          
          // Scroll the tab container to show the active tab
          const tabElement = mobileTabsRef.current.children[nextIndex] as HTMLElement;
          if (tabElement) {
            tabElement.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }, 3000); // Change tab every 3 seconds
    };

    const stopAutoScroll = () => {
      console.log("🛑 Stopping mobile auto-scroll");
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    // Only start auto-scroll if tabs section is visible and auto-scrolling is enabled
    if (isAutoScrolling && isTabsSectionVisible) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [isMobile, isMobileInitialized, isAutoScrolling, isUserInteracting, currentTabIndex, isTabsSectionVisible]);

  // NEW: Add intersection observer to detect when tabs section is visible
  useEffect(() => {
    if (!isMobile || !isMobileInitialized) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.intersectionRatio > 0.3; // Tabs section is 30% visible
        console.log("👁️ Tabs section visibility:", isVisible, "Ratio:", entry.intersectionRatio);
        
        setIsTabsSectionVisible(isVisible);
        
        // Enable auto-scroll when tabs section becomes visible
        if (isVisible && !isUserInteracting) {
          console.log("✅ Enabling auto-scroll - tabs section is visible");
          setIsAutoScrolling(true);
        } else if (!isVisible) {
          console.log("🚫 Disabling auto-scroll - tabs section not visible");
          setIsAutoScrolling(false);
        }
      },
      { 
        threshold: [0, 0.3, 0.7, 1.0], // Multiple thresholds for better detection
        rootMargin: '0px 0px -100px 0px' // Start detecting a bit before the element is fully visible
      }
    );

    if (fadeInDivRef.current) {
      observer.observe(fadeInDivRef.current);
    }

    return () => {
      if (fadeInDivRef.current) {
        observer.unobserve(fadeInDivRef.current);
      }
    };
  }, [isMobile, isMobileInitialized, isUserInteracting]);

  // Handle page load scroll restoration - DESKTOP ONLY
  useEffect(() => {
    // Wait for mobile detection to complete before running any scroll logic
    if (!isMobileInitialized || isMobile) return;
    
    const handleLoad = () => {
      // Reset any locked state on page load
      if (window.scrollY > TAB_SWITCH_END) {
        console.log("🚀 Page loaded with high scroll position, initializing...");
        setIsScrollLocked(false);
        setIsInitialized(true);
        lastScrollY.current = window.scrollY;
        initialScrollY.current = window.scrollY;
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [isMobile, isMobileInitialized, TAB_SWITCH_END]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // const entry = entries[0];
        // setIntersectionRatio(entry.intersectionRatio);
        // setIsFullyVisible(entry.intersectionRatio >= 0.3);
      },
      { threshold: 0.99 }
    );

    if (fadeInDivRef.current) observer.observe(fadeInDivRef.current);
    return () => {
      if (fadeInDivRef.current) observer.unobserve(fadeInDivRef.current);
    };
  }, []);

  // ✨ Scroll lock fix - Updated to respect FORCE_DISABLE_SCROLL_LOCK - DESKTOP ONLY
  useEffect(() => {
    // Skip scroll lock entirely on mobile or until mobile detection is complete
    if (!isMobileInitialized || isMobile) return;
    
    // Check if navigation is forcing scroll unlock
    if ((window as any).FORCE_DISABLE_SCROLL_LOCK) {
      console.log("🚫 FORCE_DISABLE_SCROLL_LOCK active, unlocking scroll");
      setIsScrollLocked(false);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      return;
    }
    
    if (isScrollLocked) {
      console.log("🔐 Locking Scroll at:", scrollPositionWhenLocked.current);
      scrollPositionWhenLocked.current = lastScrollY.current;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionWhenLocked.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollTop = scrollPositionWhenLocked.current;
      console.log("🔓 Unlocking Scroll, restoring to:", scrollTop);

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Only restore scroll position if not in navigation mode
      if (!(window as any).NAVIGATION_IN_PROGRESS && !(window as any).FORCE_DISABLE_SCROLL_LOCK) {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollTop);
        });
      }
    }

    return () => {
      if (!(window as any).FORCE_DISABLE_SCROLL_LOCK) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
      }
    };
  }, [isScrollLocked, isMobile, isMobileInitialized]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...originalTabs.current];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  // Mobile tab click handler - UPDATED
  const handleMobileTabClick = (tabIndex: number) => {
    if (isMobile) {
      console.log("📱 Mobile tab clicked:", tabIndex);
      setIsUserInteracting(true);
      setIsAutoScrolling(false); // Stop auto-scroll when user interacts
      setCurrentTabIndex(tabIndex);
      moveSelectedTabToTop(tabIndex);
      
      // Resume auto-scroll after 10 seconds of no interaction, but only if tabs are visible
      setTimeout(() => {
        console.log("⏰ Resuming auto-scroll after user interaction timeout");
        setIsUserInteracting(false);
        if (isTabsSectionVisible) {
          setIsAutoScrolling(true);
        }
      }, 10000);
    }
  };

  // Touch handlers for mobile - UPDATED
  const handleTouchStart = () => {
    if (isMobile) {
      console.log("👆 Touch start - pausing auto-scroll");
      setIsUserInteracting(true);
      setIsAutoScrolling(false);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      console.log("👆 Touch end - will resume auto-scroll after delay");
      // Resume auto-scroll after 5 seconds of no interaction, but only if tabs are visible
      setTimeout(() => {
        console.log("⏰ Resuming auto-scroll after touch timeout");
        setIsUserInteracting(false);
        if (isTabsSectionVisible) {
          setIsAutoScrolling(true);
        }
      }, 5000);
    }
  };
  
  // 📦 Scroll Watcher - DESKTOP ONLY
  useEffect(() => {
    // Skip entirely on mobile or until mobile detection is complete
    if (!isMobileInitialized || isMobile) return;
    
    const unsubscribe = scrollY.on("change", (latest) => {
      console.log("📜 Scroll Position:", latest);
      console.log("🔒 Is Scroll Locked:", isScrollLocked);
      console.log("🪟 window.scrollY:", window.scrollY);
      console.log("🚩TAB_SWITCH_START:", TAB_SWITCH_START);

      if (latest < TAB_SWITCH_START) {
        console.log("🔓 At top of page, unlocking scroll");
        setIsScrollLocked(false);
        return;
      }

      // Initialize on first scroll event
      if (!isInitialized) {
        initialScrollY.current = latest;
        lastScrollY.current = latest;
        setIsInitialized(true);
        
        // If we're starting below the tab switch zone, don't trigger tab logic
        if (latest > TAB_SWITCH_END) {
          console.log("🚀 Starting below tab zone, skipping tab logic initialization");
          return;
        }
      }

      // Enhanced navigation check - exit early if any navigation flag is active
      if ((window as any).NAVIGATION_IN_PROGRESS || 
          (window as any).TEMPORARILY_DISABLE_TABS || 
          (window as any).FORCE_DISABLE_SCROLL_LOCK) {
        console.log("🚫 Navigation in progress, disabling tab switching");
        if (isScrollLocked) {
          console.log("🔓 Force unlocking due to navigation");
          setIsScrollLocked(false);
        }
        return;
      }

      // Don't process tab switching if we started outside the tab zone
      if (initialScrollY.current !== null && initialScrollY.current > TAB_SWITCH_END && latest > TAB_SWITCH_END) {
        console.log("🚀 Scrolling outside tab zone, skipping tab logic");
        return;
      }

      if (latest > TAB_SWITCH_END && !isScrollLocked) return;

      const scrollDirection = latest > lastScrollY.current ? "down" : "up";
      lastScrollY.current = latest;

      const now = Date.now();
      if (isChangingTab.current || now - lastScrollTime.current < scrollThrottle) return;

      const currentActiveTab = tabs[0];
      const currentIndex = originalTabs.current.findIndex(tab => tab.value === currentActiveTab.value);

      // SCROLL ZONE LOGIC
      if (latest >= TAB_SWITCH_START && scrollDirection === "down" && !isScrollLocked && currentIndex === 0) {
        isChangingTab.current = true;
        setIsScrollLocked(true);
        setHasExitedUp(false);
        setCurrentTabIndex(1);
        moveSelectedTabToTop(1);
        lastScrollTime.current = now;
        setTimeout(() => (isChangingTab.current = false), scrollThrottle);
        return;
      }

      if (latest <= TAB_SWITCH_END - 190 && scrollDirection === "up" && !isScrollLocked && !hasExitedUp) {
        isChangingTab.current = true;
        setIsScrollLocked(true);
        const startTabIndex = Math.min(
          Math.floor(((latest - TAB_SWITCH_START) / (TAB_SWITCH_END - TAB_SWITCH_START)) * tabs.length),
          tabs.length - 1
        );
        setCurrentTabIndex(startTabIndex);
        moveSelectedTabToTop(startTabIndex);
        lastScrollTime.current = now;
        setTimeout(() => (isChangingTab.current = false), scrollThrottle);
        return;
      }

      if (!isScrollLocked) return;

      if (scrollDirection === "up" && currentIndex === 0) {
        setIsScrollLocked(false);
        setHasExitedUp(true);
        return;
      }

      if (scrollDirection === "down" && currentIndex === tabs.length - 1) {
        setIsScrollLocked(false);
        return;
      }

      let newIndex = scrollDirection === "down"
        ? Math.min(currentIndex + 1, tabs.length - 1)
        : Math.max(currentIndex - 1, 0);

      if (newIndex !== currentIndex) {
        isChangingTab.current = true;
        lastScrollTime.current = now;
        setCurrentTabIndex(newIndex);
        moveSelectedTabToTop(newIndex);
        setTimeout(() => (isChangingTab.current = false), scrollThrottle);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isMobile, isMobileInitialized, isScrollLocked, isInitialized, hasExitedUp, tabs, TAB_SWITCH_START, TAB_SWITCH_END]);

  // 🖱️ Wheel Handler - DESKTOP ONLY
  useEffect(() => {
    // Skip wheel handling on mobile or until mobile detection is complete
    if (!isMobileInitialized || isMobile) return;
    
    const handleWheel = (e: WheelEvent) => {
      // Enhanced navigation check
      if ((window as any).NAVIGATION_IN_PROGRESS || 
          (window as any).TEMPORARILY_DISABLE_TABS ||
          (window as any).FORCE_DISABLE_SCROLL_LOCK) {
        console.log("🚫 Wheel event blocked due to navigation");
        if (isScrollLocked) {
          console.log("🔓 Force unlocking due to navigation");
          setIsScrollLocked(false);
        }
        return;
      }

      if (!isScrollLocked || isChangingTab.current) return;

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastScrollTime.current < scrollThrottle) return;

      const currentIndex = originalTabs.current.findIndex(tab => tab.value === tabs[0].value);
      let newIndex = e.deltaY > 0
        ? Math.min(currentIndex + 1, tabs.length - 1)
        : Math.max(currentIndex - 1, 0);

      if (e.deltaY < 0 && currentIndex === 0) {
        setIsScrollLocked(false);
        setHasExitedUp(true);
        return;
      }

      if (e.deltaY > 0 && currentIndex === tabs.length - 1) {
        setIsScrollLocked(false);
        return;
      }

      if (newIndex !== currentIndex) {
        isChangingTab.current = true;
        lastScrollTime.current = now;
        setCurrentTabIndex(newIndex);
        moveSelectedTabToTop(newIndex);
        setTimeout(() => (isChangingTab.current = false), scrollThrottle);
      }
    };

    const handleScroll = (e: Event) => {
      // Don't prevent scroll during navigation
      if ((window as any).NAVIGATION_IN_PROGRESS || 
          (window as any).FORCE_DISABLE_SCROLL_LOCK) {
        return;
      }
      
      if (isScrollLocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isScrollLocked && !(window as any).FORCE_DISABLE_SCROLL_LOCK) {
      document.addEventListener("wheel", handleWheel, { passive: false });
      document.addEventListener("scroll", handleScroll, { passive: false });
      document.addEventListener("touchmove", handleScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchmove", handleScroll);
    };
  }, [isScrollLocked, tabs, isMobile, isMobileInitialized]);

  return (
    <div className="w-full">
      {/* Mobile Tab Carousel */}
      {isMobile && isMobileInitialized && (
        <div className="fixed top-20 left-0 w-full z-50 bg-gradient-to-r from-[#3a1701] to-[#020000] backdrop-blur-sm border-b border-[#703821]">
          <div 
            ref={mobileTabsRef}
            className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollBehavior: 'smooth'
            }}
          >
            {originalTabs.current.map((tab, idx) => (
              <button
                key={tab.value}
                onClick={() => handleMobileTabClick(idx)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  currentTabIndex === idx
                    ? "bg-red text-[#e57b4b] font-extrabold shadow-md border border-[#301201]"
                    : " bg-[#634431] text-[#e57b4b] hover:bg-gray-200",
                  tabClassName
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Desktop Tab Container (hidden on mobile) */}
      {!isMobile && isMobileInitialized && (
        <div
          className={cn(
            "flex flex-row items-center justify-start [perspective:1000px] overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
            containerClassName
          )}
        />
      )}
      
      <FadeInDiv
        ref={fadeInDivRef}
        key={active.value}
        tabs={tabs}
        active={active}
        className={cn(isMobile ? "mt-32 pt-16" : "mt-32", contentClassName)}
        tabContentRefs={tabContentRefs}
        isMobile={isMobile}
      />
    </div>
  );
};

export const FadeInDiv = React.forwardRef<HTMLDivElement, {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  tabContentRefs: React.MutableRefObject<(React.RefObject<HTMLDivElement | null>)[]>;
  isMobile?: boolean;
}>(({ className, tabs, active, tabContentRefs, isMobile }, ref) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className="w-full h-full relative" ref={ref}>
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          ref={tabContentRefs.current[idx]}
          initial={{ opacity: idx === 0 ? 1 : 0 }}
          animate={{ 
            opacity: isMobile ? (idx === 0 ? 1 : 0) : (idx < 3 ? 1 - idx * 0.1 : 0), 
            y: 0 
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            scale: isMobile ? 1 : 1 - idx * 0.05,
            top: isMobile ? 0 : idx * -30,
            zIndex: isActive(tab) ? 10 : -idx,
            pointerEvents: isActive(tab) ? "auto" : "none",
          }}
          className={cn("absolute top-0 left-0 w-full h-full", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
});

FadeInDiv.displayName = "FadeInDiv";