import Footer from "./layout/footer";
import { NavbarDemo } from "./layout/header";
import ContactForm from "./sections/contactForm";
import HeroSection from "./sections/heroSection"
import OurServices from "./sections/ourServices";
import WhyUs from "./sections/whyUs";

import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Toaster position="top-right"/>
      <NavbarDemo/>
      <HeroSection/>
      <WhyUs/>
      <OurServices/>
        <div id="contact" className="bg-[#f9fbfb]">
        <ContactForm/>
        </div>
      <Footer/>
    </div>
  );
}
