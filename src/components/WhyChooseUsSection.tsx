import {
  Award,
  CalendarClock,
  Compass,
  Dumbbell,
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig, type WhyChooseUsItem } from '../config/siteConfig';

const ICON_MAP: Record<WhyChooseUsItem['iconName'], typeof Award> = {
  Award,
  SlidersHorizontal,
  Dumbbell,
  Compass,
  CalendarClock,
  TrendingUp,
};

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="bg-[#F5F5F3] py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-300/70">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500">
              04 · THE STANDARD
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111215] leading-[1.04] text-balance">
              WHY ATHLETES &amp; BUSY
              <br />
              PROFESSIONALS CHOOSE US.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#D49B38] mt-5" />
          </div>
          <p className="max-w-sm text-sm sm:text-base text-neutral-600 leading-relaxed">
            Built around deliberate coaching, disciplined programming, and zero commercial gym clutter.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-300/80">
          {siteConfig.whyChooseUs.map((item, idx) => {
            const Icon = ICON_MAP[item.iconName];
            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 bg-[#F5F5F3] hover:bg-white border-r border-b border-neutral-300/80 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-500 tabular-nums">
                    {item.index}
                  </span>
                  <span className="w-9 h-9 rounded-[4px] bg-white group-hover:bg-[#111215] border border-neutral-300/80 group-hover:border-[#111215] flex items-center justify-center text-[#111215] group-hover:text-[#D49B38] transition-colors duration-200">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-[#111215] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
