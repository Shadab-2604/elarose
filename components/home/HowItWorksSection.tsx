"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

export default function HowItWorksSection({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading: string;
  steps: Step[];
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Process</p>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-subheading mt-3 max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-blush-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-ivory border-2 border-blush-200 flex items-center justify-center mx-auto mb-5">
                <span className="text-gold-400 font-semibold text-lg" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                  {step.number}
                </span>
              </div>
              <h3 className="font-semibold text-text text-lg mb-2" style={{fontFamily:"'Playfair Display',serif"}}>
                {step.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
