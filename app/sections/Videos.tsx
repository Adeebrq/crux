"use client"

import React, { useState, useEffect } from 'react';

const VideoCarousel = () => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videos = [
    { id: 1, title: "Fiesta Campaign", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179512/fiesta_plplac.mp4" },
    { id: 2, title: "Bugman Production", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179976/Bugman_gsgsrf.mp4" },
    { id: 3, title: "Fiesta Teaser", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179882/fiestaTeaser_ttzqat.mp4" },
    { id: 4, title: "Happy Moments", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179984/happyVideo_t4gstv.mp4" },
    { id: 5, title: "EVA Inauguration", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179916/EVAInaug_lbk2rz.mp4" },
    { id: 6, title: "Chess Pivot", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753180045/chessPivot_j0nnyq.mp4" },
    { id: 7, title: "Coverton Logo", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753180065/covertonLogo_cidxug.mp4" },
    { id: 8, title: "ITS Business", src: "https://res.cloudinary.com/dbk52ax5q/video/upload/v1753179990/ITSBusiness_bzwmlr.mp4" }
  ];

  const totalVideos = videos.length * 2;
  const duplicatedVideos = [...videos, ...videos, ...videos];

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isClient || isHovered || isDragging) return;

    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, [isClient, isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    setRotation(startRotation + deltaX * 0.5);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    setRotation(startRotation + deltaX * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  const roundToFixed = (num: number, decimals: number = 3) => {
    return Number(num.toFixed(decimals));
  };

  return (
    <div className={`relative w-full ${isMobile ? 'h-[500px]' : 'h-[600px] -mt-12'} bg-black overflow-hidden mt-14`}>
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/90 to-transparent ${isMobile ? 'pt-4 pb-8' : 'pt-8 pb-12'} mt-5`}>
        <div className={`inline-block bg-[#454545] text-white ${isMobile ? 'px-4 py-1.5 text-xs' : 'px-6 py-2 text-sm'} rounded-full mb-6`}>
          Our Videos
        </div>
        <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-6'}`}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'} font-bold text-white text-center mb-4`}>
            LIGHTS. CAMERA. BRAND IMPACT.
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-300 text-center max-w-4xl mx-auto`}>
            From Extensive Shoots To Brand Stories, We Produce High-Quality Videos That Captivate,
            Connect, And Convert.
          </p>
        </div>
      </div>

      {/* Circular Video Carousel */}
      <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'h-[200px]' : 'h-[300px]'} flex items-center justify-center`}>
        <div 
          className="relative w-full max-w-5xl overflow-hidden"
          style={{ height: isMobile ? '200px' : '300px', perspective: isMobile ? '800px' : '1200px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isClient && duplicatedVideos.map((video, index) => {
            const anglePerVideo = 360 / totalVideos;
            const currentAngle = (index * anglePerVideo + rotation) % 360;
            const angleInRadians = (currentAngle * Math.PI) / 180;
            const radius = isMobile ? 150 : 250;
            const x = roundToFixed(Math.sin(angleInRadians) * radius);
            const z = roundToFixed(Math.cos(angleInRadians) * radius);
            const normalizedZ = (z + radius) / (radius * 2);
            const scale = roundToFixed(0.5 + normalizedZ * 0.5);
            const opacity = roundToFixed(0.4 + normalizedZ * 0.6);
            const blur = roundToFixed((1 - normalizedZ) * 1.5);
            const zIndex = Math.round(z + radius);

            return (
              <div
                key={`${video.id}-${index}`}
                className="absolute"
                style={{
                  transform: `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${z}px) scale(${scale})`,
                  transformStyle: 'preserve-3d',
                  left: '50%',
                  top: '50%',
                  opacity: opacity,
                  zIndex: zIndex,
                  filter: `blur(${blur}px)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              >
                <div 
                  className='relative overflow-hidden inline-block transition-transform duration-300 hover:scale-105'
                  style={{ cursor: isHovered ? 'grab' : 'default' }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={video.src}
                    className="block object-cover"
                    style={{
                      width: isMobile ? '280px' : '600px',
                      height: isMobile ? '120px' : '220px',
                      border: isMobile ? "5px solid black" : "10px solid black"
                    }}
                  />
                </div>
              </div>
            );
          })}

          {!isClient && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white">Loading carousel...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;