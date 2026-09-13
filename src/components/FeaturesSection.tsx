"use client";

import { motion, useReducedMotion } from "motion/react";
import { FeatureIcon, type TFeatureIconName } from "@/components/icons";
import { useI18n } from "@/components/LocaleProvider";
import type { TFeatureItem } from "@/types/site";

type TFeaturesSectionProps = {
  items: TFeatureItem[];
  /** Background token — homepage uses paper; why-choose-us can stay light. */
  backgroundClassName?: string;
};

/**
 * Four quiet feature tiles — small icon, strong type, lots of air.
 */
export function FeaturesSection({
  items,
  backgroundClassName = "bg-jv-paper",
}: TFeaturesSectionProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const copy = {
    guarantee: { title: t.features.guaranteeTitle, description: t.features.guaranteeBody },
    pension: { title: t.features.pensionTitle, description: t.features.pensionBody },
    lab: { title: t.features.labTitle, description: t.features.labBody },
    medical: { title: t.features.medicalTitle, description: t.features.medicalBody },
  };

  return (
    <section className={`w-full py-20 sm:py-24 ${backgroundClassName}`}>
      <div className="jv-container">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#fdfcfb] px-6 py-10 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 items-center justify-center text-jv-accent">
                <FeatureIcon
                  name={item.icon as TFeatureIconName}
                  className="text-[3rem] leading-none"
                />
              </div>
              <h3 className="mb-3 font-heading text-[1.35rem] font-medium text-jv-ink">
                {copy[item.id].title}
              </h3>
              <p className="text-[15px] font-light leading-7 text-jv-text">
                {copy[item.id].description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
