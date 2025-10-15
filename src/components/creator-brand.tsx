import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import CreatorsSectionThumbnail from "@/assets/good-faces-T4p72-fc2_A-unsplash.jpg";
import BrandSectionThumnail from "@/assets/oleg-laptev-QRKJwE6yfJo-unsplash.jpg";
function Creators() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex-1 relative flex items-end overflow-hidden 
      
      rounded-[8rem] bg-gradient-to-br  "
    >
      {/* Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={CreatorsSectionThumbnail}
          alt="Creators collaboration"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      {/* Image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black">
        
        </div>
      {/* Content */}
      <div className="relative z-10 text-white 
      p-8  space-y-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4 py-2 text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>For Creators</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="
          font-bold text-5xl lg:text-6xl
          
          
          leading-14"
        >
          Or a{" "}
          <span className="  bg-gradient-to-br from-primary   to-pink-500 bg-clip-text text-transparent">
            Creator
          </span>{" "}
          looking for collaborations
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className=" text-  
           max-w-2xl leading-6"
        >
          We've already onboarded top creators ready to deliver on-brand content
          for your business purposes.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-primary/70"
        >
          Join as Creator
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex   border-t border-white/20"
        >
          <div className=" px-8 py-6">
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-sm text-gray-300">Active Creators</p>
          </div>
          <div className=" px-8 py-6">
            <p className="text-3xl font-bold text-primary">10k+</p>
            <p className="text-sm text-gray-300">Projects Completed</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Brands() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex-1  h-[90vh]  relative flex items-end overflow-hidden 
      
      rounded-[6rem] "
    >
      {/* Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={BrandSectionThumnail}
          alt="Brand collaboration"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      {/* Image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D5B532] to-44% to-black/22">
        
        </div>
      {/* Content */}
      <div className="relative z-10 text-white 
      
      px-8 py-4  space-y-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4 py-2 text-sm font-medium"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span>For Brands</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-bold text-5xl lg:text-6xl
          
          leading-14"
        >
          You're a{" "}
          <span className="  bg-gradient-to-br from-primary   to-pink-500 bg-clip-text text-transparent">
            Brand
          </span>{" "}
          looking for creators
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className=" text-  
           max-w-2xl leading-6"
        >
          Connect with verified creators who understand your brand vision and
          can produce authentic content that resonates.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-secondary/50 hover:shadow-secondary/70"
        >
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex   border-t border-white/20"
        >
          <div className=" px-8 py-6">
            <p className="text-3xl font-bold text-secondary">200+</p>
            <p className="text-sm text-gray-300">Partner Brands</p>
          </div>
          <div className="px-8 py-6">
            <p className="text-3xl font-bold text-secondary">95%</p>
            <p className="text-sm text-gray-300">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const Circles = () => {
  return (
    <div className=" absolute inset-0 "> 
    <div className=" relative z-[1000] h-full opacity-[.60]">
      <svg
        className=" absolute -left-9 top-14  rotate-[2.18deg]"
        width="361"
        height="364"
        viewBox="0 0 361 364"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M338.015 87.7915C349.07 88.2116 358.371 79.591 358.791 68.5369C359.212 57.4827 350.591 48.1809 339.537 47.7608C328.483 47.3406 319.181 55.9612 318.761 67.0153C318.341 78.0695 326.961 87.3713 338.015 87.7915Z"
            fill="url(#paint0_linear_2_29)"
          />
          <path
            d="M164.695 167.696C198.215 168.97 226.422 142.829 227.696 109.309C228.97 75.7878 202.829 47.581 169.308 46.307C135.788 45.0329 107.581 71.1739 106.307 104.695C105.033 138.215 131.174 166.422 164.695 167.696Z"
            fill="url(#paint1_linear_2_29)"
          />
          <path
            d="M266.099 88.5675C287.87 89.395 306.19 72.4168 307.017 50.6456C307.845 28.8745 290.867 10.5546 269.095 9.72711C247.324 8.89961 229.004 25.8778 228.177 47.649C227.349 69.4202 244.328 87.7401 266.099 88.5675Z"
            fill="url(#paint2_linear_2_29)"
          />
          <path
            d="M89.4777 353.356C138.895 355.234 180.478 316.697 182.356 267.279C184.235 217.862 145.697 176.279 96.2795 174.401C46.8624 172.523 5.27923 211.06 3.40094 260.478C1.52266 309.895 40.0605 351.478 89.4777 353.356Z"
            fill="url(#paint3_linear_2_29)"
          />
          <path
            d="M89.4777 353.356C138.895 355.234 180.478 316.697 182.356 267.279C184.235 217.862 145.697 176.279 96.2795 174.401C46.8624 172.523 5.27923 211.06 3.40094 260.478C1.52266 309.895 40.0605 351.478 89.4777 353.356Z"
            fill="url(#paint4_linear_2_29)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2_29"
            x1="338.015"
            y1="87.7909"
            x2="339.536"
            y2="47.7613"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_29"
            x1="164.693"
            y1="167.695"
            x2="169.307"
            y2="46.3085"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2_29"
            x1="266.098"
            y1="88.5665"
            x2="269.094"
            y2="9.72808"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2_29"
            x1="89.4755"
            y1="353.354"
            x2="96.2772"
            y2="174.403"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_2_29"
            x1="89.4755"
            y1="353.354"
            x2="96.2772"
            y2="174.403"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="422"
        className="absolute bottom-11 -right-2        rotate-[33deg]"
        height="501"
        viewBox="0 0 422 501"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M121.551 446.621C135.015 455.457 153.094 451.705 161.93 438.241C170.767 424.776 167.015 406.698 153.55 397.861C140.086 389.025 122.007 392.777 113.171 406.241C104.334 419.706 108.086 437.784 121.551 446.621Z"
            fill="url(#paint0_linear_2_9)"
          />
          <path
            d="M61.3351 434.422C68.6999 439.255 78.5883 437.203 83.4215 429.838C88.2548 422.473 86.2026 412.585 78.8378 407.751C71.4731 402.918 61.5846 404.97 56.7514 412.335C51.9181 419.7 53.9703 429.588 61.3351 434.422Z"
            fill="url(#paint1_linear_2_9)"
          />
          <path
            d="M196.643 360.741C219.037 375.437 249.105 369.197 263.802 346.803C278.498 324.409 272.258 294.341 249.864 279.645C227.47 264.948 197.402 271.188 182.706 293.583C168.009 315.977 174.249 346.044 196.643 360.741Z"
            fill="url(#paint2_linear_2_9)"
          />
          <path
            d="M234.137 214.302C278.694 243.544 338.519 231.128 367.761 186.571C397.002 142.013 384.586 82.1877 340.029 52.9463C295.472 23.7049 235.646 36.1208 206.405 80.678C177.163 125.235 189.579 185.061 234.137 214.302Z"
            fill="url(#paint3_linear_2_9)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2_9"
            x1="121.551"
            y1="446.62"
            x2="153.549"
            y2="397.861"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#242424" />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_9"
            x1="61.335"
            y1="434.421"
            x2="78.8373"
            y2="407.751"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#242424" />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2_9"
            x1="196.643"
            y1="360.739"
            x2="249.862"
            y2="279.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#242424" />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2_9"
            x1="234.136"
            y1="214.299"
            x2="340.026"
            y2="52.947"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#242424" />
            <stop offset="1" stop-color="#F5F5F5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    </div>
  );
};
function CreatorsBrands() {
  return (
    <div className="bg-gradient-to-t from-muted via-secondary to-secondary min-h-screen py-20 px-4 lg:px-10 relative">
      <div className="container  mx-auto max-w-7xl relative">
        <Circles />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-t from-stone-300 to-stone-500 bg-clip-text text-transparent">
            Choose Your <span className=" 
            bg-clip-text text-transparent
            bg-gradient-to-tr from-amber-400 via-amber-100 to-amber-400
            "> Path.</span>
          </h1>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Whether you're looking to create or collaborate, we've got you
            covered
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="rounded-3xl  backdrop-blur-3xl  flex flex-col md:flex-row     gap-4 lg:gap-6 p-4 lg:p-6    border border-border/50">
          <Brands />
          <Creators />
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Users,
              title: "Verified Community",
              desc: "All creators and brands are thoroughly vetted",
            },
            {
              icon: Zap,
              title: "Fast Matching",
              desc: "Get matched with the perfect partner in minutes",
            },
            {
              icon: Sparkles,
              title: "Quality Guaranteed",
              desc: "High-quality content delivery every time",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-background/80  shadow backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default CreatorsBrands;
