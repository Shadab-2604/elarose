
"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  heading: string;
  subheading: string;
  steps: Step[];
}

export default function HowItWorksSection({ heading, subheading, steps }: HowItWorksSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="section-eyebrow">How To Order</p>

          <h2 className="section-heading">
            {heading}
          </h2>

          <p className="section-subheading mt-3 max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-blush-200" />

          {/* Mobile = Vertical | Desktop = Horizontal */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4">

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="relative text-center flex-1"
              >
                {/* Number Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-ivory border-2 border-blush-200 flex items-center justify-center mx-auto mb-5">
                  <span
                    className="text-gold-400 font-semibold text-lg"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-semibold text-text text-lg mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
