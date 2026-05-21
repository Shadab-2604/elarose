"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import aboutData from "@/json/about.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const { story, mission, vision, process, timeline } = aboutData;

  return (
    <>
      {/* Story Section */}
      <section className="pt-28 pb-16 md:pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="order-2 lg:order-1"
            >
              <p className="section-eyebrow">{story.eyebrow}</p>
              <h1 className="section-heading mb-5">{story.headline}</h1>
              <p className="text-text-muted text-base leading-relaxed">{story.body}</p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[mission, vision].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ivory rounded-xl p-8 border border-blush-200"
            >
              <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center mb-4 text-gold-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <h2 className="font-semibold text-text text-xl mb-3" style={{fontFamily:"'Playfair Display',serif"}}>
                {item.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Crafting Process */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow">{process.eyebrow}</p>
            <h2 className="section-heading">{process.headline}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-xl p-6 border border-blush-200"
              >
                <span className="text-3xl font-light text-gold-300 block mb-3" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                  {step.number}
                </span>
                <h3 className="font-semibold text-text text-lg mb-2" style={{fontFamily:"'Playfair Display',serif"}}>
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow">{timeline.eyebrow}</p>
            <h2 className="section-heading">{timeline.headline}</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blush-200 -translate-x-1/2 hidden sm:block" />

            <div className="space-y-8">
              {timeline.events.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex sm:items-center gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold-400 border-2 border-white z-10" />

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />

                  {/* Card */}
                  <div className={`flex-1 bg-ivory rounded-xl p-5 border border-blush-200 ${i % 2 === 0 ? "sm:mr-8" : "sm:ml-8"}`}>
                    <span className="text-xs text-gold-500 font-medium tracking-wider" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                      {event.year}
                    </span>
                    <h3 className="font-semibold text-text text-base mt-1 mb-1.5" style={{fontFamily:"'Playfair Display',serif"}}>
                      {event.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
