'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Illustrations() {
  return (
    <motion.div
      className="flex items-center justify-center gap-48"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Image
          src="/engineer.svg"
          alt="Documents"
          priority
          height={320}
          width={320}
          className="dark:hidden"
        />

        <Image
          src="/engineer-dark.svg"
          alt="Documents"
          priority
          height={320}
          width={320}
          className="hidden dark:block"
        />
      </div>

      <div className="hidden lg:block">
        <Image
          src="/work-from-home.svg"
          alt="Documents"
          priority
          height={360}
          width={360}
          className="dark:hidden"
        />

        <Image
          src="/work-from-home-dark.svg"
          alt="Documents"
          priority
          height={360}
          width={360}
          className="hidden dark:block"
        />
      </div>
    </motion.div>
  );
}
