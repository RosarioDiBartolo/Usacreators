import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo-no-text.png";
function Footer() {
  return (
    <footer className="w-full   lg:rounded-b-[100px] max-w-[1200px] mx-auto bg-gradient-to-b from-[#454444] to-[#2C2C2C] font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 lg:gap-16">
          {/* Left Section - Logo, Email, CTA */}
          <div className="flex flex-col gap-6 sm:gap-8 max-w-xl">
            {/* Logo and Brand Name */}
            <div className="flex items-center sm:items-end gap-4 sm:gap-6">
              <div className="overflow-hidden rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <img
                  src={logo}
                  alt="Miami Creators Logo"
                  className="w-10 sm:w-12 lg:w-16 aspect-square"
                />
              </div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Miami Creators
              </h2>
            </div>

            {/* Email */}
            <a
              href="mailto:Porcodio@diocane.com"
              className="text-white text-sm sm:text-base lg:text-lg tracking-wide hover:text-primary transition-colors break-all"
            >
              Porcodio@diocane.com
            </a>

            <Link to={"/creators"}>
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white text-base sm:text-lg lg:text-xl font-bold px-6 sm:px-10 lg:px-12 py-2 sm:py-3 rounded-2xl sm:rounded-[18px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-fit"
            >
              Get Started
            </motion.button>
            </Link>
          </div>

          {/* Right Section - Quick Links */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <h3 className="text-[#E9E9E9] text-lg sm:text-xl lg:text-2xl font-bold">
              Quick links
            </h3>
            <nav className="flex flex-col gap-3 sm:gap-4">
              {["About", "Growers", "Merchants", "Partners", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-[#E9E9E9] text-xs sm:text-sm font-bold tracking-wide sm:tracking-[2.4px] uppercase opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white my-8 sm:my-10 lg:my-12" />

        {/* Copyright */}
        <p className="text-[#E9E9E9] text-xs opacity-65">
          © 2020 Lift Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
