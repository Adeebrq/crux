"use client"
import { BackgroundBeams} from '@/components/ui/background-beams'
import { FlipWords } from "@/components/ui/flip-words";
import React from 'react'

declare global {
  interface Window {
    TEMPORARILY_DISABLE_TABS?: boolean;
    NAVIGATION_IN_PROGRESS?: boolean;
    FORCE_DISABLE_SCROLL_LOCK?: boolean;
  }
}

const HeroSection = () => {
  return (
    <div className="h-[40rem] md:min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased px-4 py-8 md:py-16">
      <FlipWordsUI/>
      <BackgroundBeams/>
      <CustomButton/>
    </div>
  )
}


function FlipWordsUI() {
  const words = ["CREATIVE,", "DIGITAL,", "MARKETING."];


  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 lg:space-y-0 max-w-6xl mx-auto lg:mb-10">
      <div className='text-center'>
        <h1 className='text-center text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] bg-[#454545] font-bold rounded-[80px] py-2 px-3 sm:px-4 inline-block lg:mb-2'
        >#1 BEST DIGITAL MARKETING</h1>
      </div>
      
      <h1 className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-200 text-center font-sans font-bold leading-tight">
        BOOST YOUR BRAND
      </h1>
      
      <div className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-200 text-center font-sans font-bold leading-tight">
        <span className="block sm:inline">WITH END TO END </span>
        <FlipWords words={words} className="inline-block" />
      </div>
      
      <p className="text-neutral-300 w-full text-xs xs:text-sm sm:text-base md:text-lg font-medium text-center relative z-10 leading-relaxed px-2">
        From ideas to execution – Crux Creations is your all-in-one creative and marketing partner.
      </p>
    </div>
  );
}


function CustomButton(){
  return (
    <button
    onClick={handleContactNavigation}
      className='mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-gradient-to-b from-[#e47143] to-[#e9915f] py-2 px-6 sm:py-4 sm:px-8 md:py-2 md:px-8 rounded-[80px] font-bold cursor-pointer hover:from-[#d1633a] hover:to-[#b8572e] transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-20 text-sm sm:text-base md:text-lg'
    >
      Let&apos;s Create Now!
    </button>
  )
}


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



export default HeroSection
