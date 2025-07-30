"use client"

import React, { Suspense } from "react";
import { Tabs } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import Image from "next/image";

declare global {
  interface Window {
    TEMPORARILY_DISABLE_TABS?: boolean;
    NAVIGATION_IN_PROGRESS?: boolean;
    FORCE_DISABLE_SCROLL_LOCK?: boolean;
  }
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className: string;
}

interface ServiceItem {
  text: string;
}

interface ServiceTab {
  title: string;
  description: string;
  subtitle: string;
  services: ServiceItem[];
  buttonText: string;
  images?: string[];
}

const VideoCarousel = dynamic(() => import("./Videos"), {
  loading: () => <div className="animate-pulse bg-gray-900 h-64 rounded-lg"></div>,
  ssr: false
});

const GRADIENT_BG = "bg-gradient-to-br from-[#3c1700] via-[#220d00] to-[#000000]";
const BUTTON_GRADIENT = "bg-gradient-to-b from-[#e47143] to-[#e9915f]";
const BUTTON_HOVER = "hover:from-[#d1633a] hover:to-[#b8572e]";
const BUTTON_BASE = `${BUTTON_GRADIENT} py-2 px-6 sm:py-4 sm:px-8 md:py-2 md:px-8 rounded-[80px] font-bold cursor-pointer ${BUTTON_HOVER} transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-20 text-sm sm:text-base md:text-lg`;

const handleContactNavigation = () => {
  console.log("🎯 CONTACT NAVIGATION - FORCE UNLOCK ALL RESTRICTIONS");
  
  // Set flags
  Object.assign(window, {
    TEMPORARILY_DISABLE_TABS: true,
    NAVIGATION_IN_PROGRESS: true,
    FORCE_DISABLE_SCROLL_LOCK: true
  });
  
  // Reset scroll styles
  const resetStyles = { position: '', top: '', left: '', right: '', width: '', overflow: '', height: '', touchAction: '' };
  Object.assign(document.body.style, resetStyles);
  Object.assign(document.documentElement.style, { overflow: '', height: '' });
  
  window.onscroll = null;
  
  // Navigate
  setTimeout(() => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      requestAnimationFrame(() => {
        const offset= 100
        window.scrollTo({ top: contactElement.offsetTop - offset, behavior: 'smooth' });
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, 50);
  
  // Cleanup
  setTimeout(() => { window.NAVIGATION_IN_PROGRESS = false; }, 3000);
  setTimeout(() => { window.TEMPORARILY_DISABLE_TABS = false; }, 5000);
};

// Optimized Image component
const OptimizedImage = ({ src, alt, className }: OptimizedImageProps) => (
  <div className={`relative ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover rounded-md"
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyrmrZ3VsHqWnWchP8Ab//Z"
    />
  </div>
);

// Service icon component
const ServiceIcon = () => (
  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

// Service list component
const ServiceList = ({ services }: { services: ServiceItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 text-left">
    {[0, 1].map(colIndex => (
      <div key={colIndex} className="flex flex-col">
        <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300">
          {services.slice(colIndex * 3, (colIndex + 1) * 3).map((service, idx) => (
            <li key={idx} className="flex items-start">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-orange-400 rounded-full mr-2 sm:mr-3 mt-1 sm:mt-1.5 flex-shrink-0"></span>
              <span className="leading-5 sm:leading-6 text-xs sm:text-sm md:text-base">{service.text}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// Image grid component
const ImageGrid = ({ images = [] }: { images?: string[] }) => (
  <div className="flex flex-row w-full sm:w-[80vw] md:w-[60vw] lg:w-[44vw] bg-gray gap-1">
    {[0, 1].map(colIndex => (
      <div key={colIndex} className="w-[50%] gap-1">
        {[0, 1].map(rowIndex => {
          const imageIndex = colIndex * 2 + rowIndex;
          const height = (colIndex === 0 ? rowIndex === 0 : rowIndex === 1) ? "h-[65%]" : "h-[35%]";
          
          return (
            <div key={rowIndex} className={`${height} bg-gray-100 flex items-center justify-center text-gray-500 my-1 rounded-md relative min-h-[60px] sm:min-h-[80px] md:min-h-[100px]`}>
              {images[imageIndex] ? (
                <OptimizedImage 
                  src={images[imageIndex]} 
                  alt={`Service image ${imageIndex + 1}`} 
                  className="w-full h-full" 
                />
              ) : (
                images.length === 0 ? <span className="text-xs sm:text-sm">{['ONE', 'TWO', 'THREE', 'FOUR'][imageIndex]}</span> : null
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

// Tab content component
const TabContent = ({ service }: { service: ServiceTab }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-2 ${GRADIENT_BG} w-full p-4 sm:p-6 md:p-8 lg:p-2 py-6 sm:py-8 lg:py-8 rounded-lg`}>
    <div className="lg:col-span-1">
      <div className="flex items-center mb-4 sm:mb-6 text-left">
        <ServiceIcon />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{service.title}</h2>
      </div>
      
      <p className="text-gray-300 mb-4 sm:mb-6 text-left text-sm sm:text-base">{service.description}</p>
      <p className="text-gray-300 mb-6 sm:mb-8 text-left text-sm sm:text-base">{service.subtitle}</p>
      
      <ServiceList services={service.services} />
      
      <div className="mt-8 sm:mt-6 md:mt-8 lg:mt-12 text-center lg:text-left">
        <button onClick={handleContactNavigation} className={`${BUTTON_BASE} w-full sm:w-auto`}>
          {service.buttonText}
        </button>
      </div>
    </div>
    
    <ImageGrid images={service.images} />
  </div>
);

export function TabsDemo() {
  // Service data - moved outside component to reduce re-creation
  const serviceData: ServiceTab[] = [
    {
      title: "Creative Services",
      description: "Bring Your Brand To Life Through Compelling Visuals And High-Impact Storytelling.",
      subtitle: "From Logo Design To Ad Campaigns And Promotional Materials, Our Creative Services Help You Stand Out And Stay Remembered.",
      buttonText: "Book a Creative Consult",
      images: ["/1creatives.jpg", "/2creatives.jpg", "/3creatives.jpg", "/4creative.jpeg"],
      services: [
        { text: "Brand Identity Design" },
        { text: "Logo Design" },
        { text: "Marketing Collaterals" },
        { text: "Product Packaging" },
        { text: "Photography & Video" },
        { text: "Website Design" }
      ]
    },
    {
      title: "Digital Marketing Services",
      description: "Accelerate Your Digital Growth With Our Performance-Driven Marketing Strategies.",
      subtitle: "From SEO To Social Media, Our Digital Marketing Services Are Designed To Boost Your Online Presence And Drive Results.",
      buttonText: "Boost Your Reach",
      images: ["/4digital.webp", "/2digital.webp", "/3digital.jpg", "/1digital.jpg" ],
      services: [
        { text: "Social Media Marketing" },
        { text: "Google Ads & PPC" },
        { text: "Content Marketing" },
        { text: "SEO & Performance Marketing" },
        { text: "Email Marketing" },
        { text: "Analytics & Reporting" }
      ]
    },
    {
      title: "Web Development & Digital Solutions",
      description: "Build Strong Digital Foundations With Our Web Development And Digital Solutions Services.",
      subtitle: "From Custom Websites To E-Commerce Solutions, We Create Digital Experiences That Drive Business Growth.",
      buttonText: "Start Your Website",
      images: ["/1webdev.webp",  "/4webdev.webp", "/3webdev.webp", "/2webdev.webp"],
      services: [
        { text: "Website Development" },
        { text: "E-Commerce Solutions" },
        { text: "Custom Web Applications" },
        { text: "CMS Development" },
        { text: "Mobile App Development" },
        { text: "API Integration" }
      ]
    },
    {
      title: "Print & Publication Services",
      description: "Bring Your Stories To Print With Our Quality Print Solutions And Publishing Services.",
      subtitle: "From Magazines To Books, We Offer Complete Print Solutions With High-Quality Output And Professional Results.",
      buttonText: "Request A Quote",
      images: ["/1print.png", "/2print.jpeg", "/3print.jpg", "/4print.jpg"],
      services: [
        { text: "Magazine Publishing" },
        { text: "Book Publishing" },
        { text: "Editorial Design" },
        { text: "Offset Printing" },
        { text: "Digital Publishing" },
        { text: "Distribution & Logistics" }
      ]
    },
    {
      title: "Event Management Services",
      description: "Create Unforgettable Events Experiences With Our End-To-End Event Management Solutions.",
      subtitle: "From Corporate Events To Weddings, We Handle Everything From Planning To Execution And Post-Event Management.",
      buttonText: "Plan Your Event",
      images: ["/1event.jpg", "/2event.JPG", "/3event.jpg", "/4event.jpg"],
      services: [
        { text: "Corporate Events" },
        { text: "Product Launches" },
        { text: "Conference & Seminars" },
        { text: "Weddings & Personal Events" },
        { text: "Trade Shows" },
        { text: "Event Marketing" }
      ]
    }
  ];

  const tabs = serviceData.map((service, index) => ({
    title: ["Creatives", "Digital marketing", "Web development & digital solutions", "Print & publication", "Event management"][index],
    value: ["product", "services", "playground", "content", "random"][index],
    content: <TabContent service={service} />
  }));

  return (
    <div className=" h-auto min-h-[50rem] sm:h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start px-2 sm:px-4">
      <Tabs tabs={tabs} />
    </div>
  );
}

const OurServices = () => {
  return (
    <div id="ourServices" className="bg-[#f8fbfb] min-h-screen p-4 sm:p-6 md:p-8 ">
      <div className="bg-black text-white rounded-xl sm:rounded-2xl md:rounded-3xl py-8 sm:py-10 md:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-0 sm:mb-14 md:mb-16 px-0 sm:px-6 md:px-8">
          <div className="inline-block bg-[#454545] text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm mb-6 sm:mb-8">
            Our Services
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
            YOUR PATH TO DIGITAL EXCELLENCE
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-4xl mx-auto px-2">
            At Crux Creations, We Offer Full-Spectrum Creative, Digital, And
            Strategic Solutions Tailored To Elevate Your Brand Across All Fronts
          </p>
          <TabsDemo />
          <div className="mt-0 sm:mt-24 md:mt-32">
            <Suspense fallback={<div className="animate-pulse bg-gray-700 h-48 sm:h-56 md:h-64 rounded-lg"></div>}>
              <VideoCarousel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
