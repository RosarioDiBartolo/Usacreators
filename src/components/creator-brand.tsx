import { motion } from "framer-motion";

function CreatorsBrands() {
  return (
    <section className="w-full max-w-[1200px] mx-auto font-poppins">
      <div className="flex flex-col lg:flex-row rounded-t-[60px] lg:rounded-t-[100px] overflow-hidden min-h-[500px] lg:min-h-[903px]">
        {/* Brand Section - Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 relative flex items-end"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/050e42f4e21e456fc1a5945bd70aa563b85a0b4f?width=1280"
              alt="Brand collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#454444]" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 pb-12 lg:pb-20 w-full">
            <div className="max-w-[571px] space-y-8 lg:space-y-12">
              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.076] lg:leading-[107.67%]">
                <span className="text-white">You're a </span>
                <span className="bg-gradient-to-b from-white to-[#960CFF] bg-clip-text text-transparent">
                  Brand
                </span>
                <span className="text-[#E9E9E9]"> looking for content Creators</span>
              </h2>

              {/* Description */}
              <p className="text-[#E9E9E9] text-xl font-normal leading-normal tracking-[1.6px] max-w-[571px]">
                Connect with verified creators who understand your brand vision and can produce authentic content that resonates.
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[rgba(239,221,254,0.48)] text-white text-2xl font-black px-10 sm:px-14 py-3 rounded-[18px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all duration-300"
              >
                Explour our Catalog
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Creator Section - Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 relative flex items-end"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/20cf6364b91e0975383ef2014ac5c8180c4e4baf?width=1280"
              alt="Creator collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#454444]" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 pb-12 lg:pb-20 w-full flex flex-col items-end text-right">
            <div className="max-w-full space-y-8 lg:space-y-12">
              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.076] lg:leading-[107.67%]">
                <span className="text-white">You're a </span>
                <span className="bg-gradient-to-b from-white via-white to-[#FE7F30] bg-clip-text text-transparent">
                  Creator
                </span>
                <span className="text-[#E9E9E9]"> looking for collaborations</span>
              </h2>

              {/* Description */}
              <p className="text-[#E9E9E9] text-xl font-normal leading-normal tracking-[1.6px]">
                We've already onboarded top creators ready to deliver on-brand content for your business purposes.
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E2B69B] text-white text-2xl font-black px-10 sm:px-14 py-3 rounded-[18px] transition-all duration-300"
              >
                Apply as a Creator
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CreatorsBrands;
