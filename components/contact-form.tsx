"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import emailjs from '@emailjs/browser';

import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ContactFromUi() {
  const form = useRef<HTMLFormElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Force animation restart on mount and form submit
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  // Additional animation restart mechanism
  useEffect(() => {
    if (animationRef.current) {
      // Force reflow to ensure animation starts
      animationRef.current.style.animation = 'none';
      animationRef.current.offsetHeight; // Trigger reflow
      animationRef.current.style.animation = 'glowSlide 2s linear infinite';
    }
  }, [animationKey]);

  const animationStyles = useMemo(() => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    padding: '2px',
    background: 'linear-gradient(90deg, transparent 0%, #ff6b35 50%, transparent 100%)',
    backgroundSize: '200% 100%',
    animation: 'glowSlide 2s linear infinite',
    animationFillMode: 'both' as const,
    animationPlayState: 'running' as const,
    WebkitAnimation: 'glowSlide 2s linear infinite',
    MozAnimation: 'glowSlide 2s linear infinite',
    zIndex: 1
  }), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // setMessage(null);

    try {
      if (form.current) {
        const formData = new FormData(form.current);
        const data = {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
        };

        const result = await toast.promise(
          emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
            data,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
          ),
          {
            loading: "Sending message...",
            success: "Message sent",
            error: "An error has occurred"
          }
        );

        if (result.text === 'OK') {
          // setMessage({ type: 'success', text: 'Message sent successfully!' });
          form.current.reset();
          // Restart animation after form submit
          setAnimationKey(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      // setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="shadow-input w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 relative overflow-hidden m-4 md:m-0"
      style={{
        background: 'white',
        position: 'relative'
      }}
    >
      {/* Animated orange glowing border */}
      <div
        key={animationKey}
        ref={animationRef}
        style={animationStyles}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: 'inherit'
          }}
        />
      </div>

      {/* Content wrapper with higher z-index */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="text-black font-bold text-3xl">Connect with us!</h1>

        <form ref={form} className="my-4" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4 text-white">
            <Input 
              id="name" 
              name="name"
              placeholder="Name" 
              type="text" 
              required
            />
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-4 text-white">
            <Input 
              id="email" 
              name="email"
              placeholder="Email Address" 
              type="email" 
              required
            />
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-4 text-white">
            <Input 
              id="phone" 
              name="phone"
              placeholder="Phone number" 
              type="text"
            />
          </LabelInputContainer>

          <button
            className='group/btn relative block h-10 w-full rounded-2xl mt-4 sm:mt-8 md:mt-10 lg:mt-12 bg-gradient-to-b from-[#e47143] to-[#e9915f] py-2 px-6 sm:py-4 sm:px-8 md:py-2 md:px-8 rounded-[80px] font-bold cursor-pointer hover:from-[#d1633a] hover:to-[#b8572e] transition-all duration-300 hover:scale-102 hover:shadow-lg relative z-20 text-sm sm:text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed'
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Submit'} &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-[#f1c1a3] to-transparent dark:via-[#e6a57e]" />
        </form>
      </div>

      {/* Enhanced CSS with browser prefixes for better compatibility */}
      <style jsx>{`
        @-webkit-keyframes glowSlide {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @-moz-keyframes glowSlide {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes glowSlide {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};