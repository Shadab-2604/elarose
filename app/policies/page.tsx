"use client";

import { motion } from "framer-motion";
import policyData from "@/json/policy.json";
import PolicyAccordion from "@/components/PolicyAccordion";

export default function PoliciesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="section-eyebrow">The Fine Print</p>
          <h1 className="section-heading mb-4">Our Policies</h1>
          <p className="section-subheading">
            Crafted carefully — just like everything we make. Read at your leisure.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-ivory">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <PolicyAccordion items={policyData} />
        </motion.div>
      </section>
    </>
  );
}
