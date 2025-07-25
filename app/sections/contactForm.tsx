import ContactFromUi from "@/components/contact-form";
import React from "react";

const ContactForm = () => {
  return (
    <div className="sm:px-5 lg:px-0 pb-6 sm:pb-9 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4 w-full max-w-7xl mx-auto min-h-auto bg-[#f9fbfb]">
      <div className="gap-1 flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2">
        <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
          Let&apos;s create together
        </h1>
        <h1 className="pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-b from-[#e57647] to-[#e89c67] bg-clip-text text-transparent leading-tight">
          Ready to elevate <br className="hidden sm:block" /> your brand?
        </h1>
        <h1 className="text-xs sm:text-sm md:text-base text-gray-500 font-bold leading-relaxed max-w-md mx-auto lg:mx-0">
          Contact us to explore how Crux Creations <br className="hidden sm:block" />
          can power your next project
        </h1>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <ContactFromUi />
      </div>
    </div>
  );
};

export default ContactForm;
