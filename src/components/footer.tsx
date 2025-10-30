import { motion } from "framer-motion"; 
import { Mail  } from "lucide-react";
import logo from "../assets/logo.png";
import { officialEmail } from "@/lib/constants";
import { IconBrandTiktok } from "@tabler/icons-react";

function Footer() {
  return (
    <footer className=" section  bg-gradient-to-b from-[var(--creator-brand-overlay-dark)] to-stone-800 lg:mb-30 font-poppins lg:rounded-b-[80px]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Left - Logo + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full overflow-hidden p-2 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Miami Creators Logo"
                  className="w-12 sm:w-14 lg:w-16 aspect-square"
                />
              </div>
              <h2 className="text-white text-3xl sm:text-4xl font-bold">
                Miami Creators
              </h2>
            </div>

            <a
              href="mailto:contact@miamicreators.com"
              className="flex items-center gap-2 text-white text-sm sm:text-base hover:text-primary transition-colors"
            >
              <Mail size={18} />
              {officialEmail}
            </a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/creators"
                className="inline-block bg-gradient-to-t from-primary to-tertiary text-white font-semibold text-lg px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                Get Started
             </a>
            </motion.div>

          </div>

          {/* Middle - Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {["Home", "Features", "Creators", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/70 text-sm uppercase tracking-[2px] hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl font-semibold">Legal</h3>
            <nav className="flex flex-col gap-3">
              {["Terms and conditions", "Privacy Policy", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href={`${link.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-white/70 text-sm uppercase tracking-[2px] hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-white/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} Miami Creators. All rights reserved.
          </p>
          
            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              {[IconBrandTiktok].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
