import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="w-full max-w-[1200px] mx-auto bg-gradient-to-b from-[#454444] to-[#2C2C2C] font-poppins">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          {/* Left Section - Logo, Email, CTA */}
          <div className="flex flex-col gap-8 max-w-xl">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <img
                  src="/src/assets/logo-no-text.png"
                  alt="Miami Creators Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                />
              </div>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Miami Creators
              </h2>
            </div>

            {/* Email */}
            <a
              href="mailto:Porcodio@diocane.com"
              className="text-white text-lg sm:text-xl tracking-wider hover:text-primary transition-colors"
            >
              Porcodio@diocane.com
            </a>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white text-xl sm:text-2xl font-bold px-10 sm:px-12 py-3 rounded-[18px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all duration-300 w-fit"
            >
              Get Started
            </motion.button>
          </div>

          {/* Right Section - Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[#E9E9E9] text-2xl font-bold leading-5">
              Quick links
            </h3>
            <nav className="flex flex-col gap-4">
              {["About", "Growers", "Merchants", "Partners", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-[#E9E9E9] text-sm font-bold tracking-[2.4px] uppercase opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white my-10 sm:my-12" />

        {/* Copyright */}
        <p className="text-[#E9E9E9] text-xs opacity-65">
          © 2020 Lift Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
