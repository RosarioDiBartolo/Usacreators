import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import CreatorsSectionThumbnail from "@/assets/good-faces-T4p72-fc2_A-unsplash.jpg";

function Creators() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex-1 relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm"
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

      {/* Content */}
      <div className="relative z-10 text-white p-8 space-y-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
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
          className="font-bold text-5xl lg:text-6xl leading-tight"
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
          className="font-light text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed"
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
          className="flex gap-8 pt-4 border-t border-white/20"
        >
          <div>
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-sm text-gray-300">Active Creators</p>
          </div>
          <div>
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
      className="group flex-1 relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm"
    >
      {/* Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={CreatorsSectionThumbnail}
          alt="Brand collaboration"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white p-8 space-y-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
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
          className="font-bold text-5xl lg:text-7xl leading-tight"
        >
          You're either a{" "}
          <span className="  bg-gradient-to-br from-primary   to-pink-500 bg-clip-text text-transparent">
            Brand
          </span>{" "}
          looking for content creators
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-light text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed"
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
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-primary/70"
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
          className="flex gap-8 pt-4 border-t border-white/20"
        >
          <div>
            <p className="text-3xl font-bold text-primary">200+</p>
            <p className="text-sm text-gray-300">Partner Brands</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="text-sm text-gray-300">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CreatorsBrands() {
  return (
    <div className="bg-gradient-to-b from-muted via-muted/50 to-background min-h-screen py-20 px-4 lg:px-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary via-primary  to-pink-500 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to create or collaborate, we've got you covered
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="rounded-3xl flex flex-col lg:flex-row bg-background/50 backdrop-blur-sm gap-4 lg:gap-6 p-4 lg:p-6 shadow-2xl border border-border/50">
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