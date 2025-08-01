"use client"
import { BackgroundBeams } from '@/components/ui/background-beams';
import logo from "../../assets/logo2.svg"
import React from 'react'
import Image from 'next/image';

const Footer = () => {
  const contactItems = [
    {
      title: "Call Anytime",
      value: "+91 94459 46491",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      )
    },
    {
      title: "Send Email",
      value: "Contactus@Cruxcreations.Com",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      title: "Visit Office",
      value: "Chennai | Serving Globally",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    }
  ];

  // Click handlers
  const handleWhyUsClick = () => {
    console.log('Why Us clicked');
    // Add your navigation logic here
  };

  const handleServicesClick = () => {
    console.log('Services clicked');
    // Add your navigation logic here
  };

  const handleContactClick = () => {
    console.log('Contact clicked');
    // Add your navigation logic here
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
    if(platform === "Instagram"){
      window.open("https://www.Instagram.com/crux.creations", "_blank")

    } 
    if(platform === "LinkedIn"){
      window.open("https://www.Instagram.com/crux.creations", "_blank")

    }
    if(platform === "Facebook"){
      window.open("https://www.Instagram.com/crux.creations", "_blank")

    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
<div className="h-auto max-h-[65vh] sm:h-[60vh] md:h-[70vh] lg:h-[45vh] lg:min-h-[45vh] lg:max-h-[45vh] w-full rounded-md bg-neutral-950 relative flex flex-col antialiased py-8 sm:py-0 justify-between ">
        {/* Header Section */}
        <div className='h-[6vh] flex flex-row w-full items-center justify-between px-4 pt-3 sm:px-6 lg:px-8 sm:top-6'>
            {/* Logo on the left */}
            <div className='flex justify-start'>
                <Image src={logo}
                alt="" 
                width={80}
                height={80}
                className='sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]'
                />
            </div>

            {/* Buttons aligned horizontally next to logo */}
            <div className='flex flex-row items-center gap-2 sm:gap-4 lg:gap-6'>
                <button
                  onClick={handleWhyUsClick}
                  className="text-white hover:text-orange-400 transition-colors cursor-pointer z-2 text-xs sm:text-sm lg:text-base"
                  type="button"
                >
                  Why Us
                </button>
                <button
                  onClick={handleServicesClick}
                  className="text-white hover:text-orange-400 transition-colors cursor-pointer z-2 text-xs sm:text-sm lg:text-base"
                  type="button"
                >
                  Services
                </button>
                <button
                  onClick={handleContactClick}
                  className="text-black bg-white px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-[40px] sm:rounded-[80px] font-bold hover:bg-gray-200 transition-colors cursor-pointer z-2 text-xs sm:text-sm lg:text-base"
                  type="button"
                >
                  Contact Us
                </button>
            </div>
        </div>

        {/* Main Content Section */}
        <div className='flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex-1 lg:flex-row lg:justify-center lg:space-x-8 lg:items-center mx-auto '>
            {contactItems.map((item, index) => (
                <div key={index} className='flex flex-row items-center gap-4 sm:gap-6 px-0 py-3 sm:py-4 w-full lg:w-auto justify-center lg:justify-start'
                     style={{ cursor: 'pointer' }}>
                    <div className='bg-gradient-to-b from-[#e47143] to-[#e9915f] p-3 sm:p-4 rounded-xl group-hover:from-[#e47143] group-hover:to-[#e57740] transition-colors flex-shrink-0'>
                        {item.icon}
                    </div>
                    <div className='flex flex-col min-w-0 flex-1'>
                        {/* <h3 className='text-white text-base sm:text-lg lg:text-xl font-semibold mb-1'>{item.title}</h3> */}
                        <p className='text-orange-400 text-sm sm:text-base break-words'>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Bottom Section */}
        <div className='w-full px-4 sm:px-6 lg:px-8 border-t-2 border-[#e47143]'>
            <div className='flex flex-col sm:flex-row justify-between items-center w-full py-4 sm:py-6 gap-4 sm:gap-0 max-w-6xl mx-auto'>
                {/* Social Media Icons - Center aligned */}
                <div className='flex flex-row gap-3 sm:gap-4 order-2 sm:order-1 justify-center w-full sm:w-auto'>
                    {/* Facebook */}
                    <button
                      onClick={() => handleSocialClick('Facebook')}
                      className='text-orange-400 hover:text-orange-500 cursor-pointer z-2 transition-colors'
                      style={{ cursor: 'pointer' }}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </button>
                    {/* LinkedIn */}
                    <button
                      onClick={() => handleSocialClick('LinkedIn')}
                      className='text-orange-400 hover:text-orange-500 cursor-pointer z-2 transition-colors'
                      style={{ cursor: 'pointer' }}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </button>
                    {/* Instagram */}
                    <button
                      onClick={() => handleSocialClick('Instagram')}
                      className='text-orange-400 hover:text-orange-500 cursor-pointer z-2 transition-colors'
                      style={{ cursor: 'pointer' }}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </button>
                </div>

                {/* Copyright */}
                <div className='text-orange-400 text-xs sm:text-sm text-center order-1 sm:order-2 flex-shrink-0'>
                    ©2025, Crux Creation. All Rights Reserved.
                </div>

                {/* Back to Top */}
                <button
                  onClick={handleBackToTop}
                  className='flex items-center gap-2 text-white cursor-pointer z-2 hover:text-orange-400 transition-colors group order-3 flex-shrink-0'
                  style={{ cursor: 'pointer' }}
                >
                    <span className='font-semibold text-xs sm:text-sm'>Back to Top</span>
                    <div className='bg-gradient-to-b from-[#e47143] to-[#e9915f] p-1.5 sm:p-2 rounded-lg group-hover:bg-orange-600 transition-colors'>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                        </svg>
                    </div>
                </button>
            </div>
        </div>

        <BackgroundBeams/>
    </div>
  )
}

export default Footer;