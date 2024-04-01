'use client';

import { motion } from 'framer-motion';
import TypeIt from 'typeit-react';

export function Heading() {
  return (
    <div className="max-w-[790px] mx-auto space-y-6  sm:space-y-7">
      <motion.h1
        className="text-4xl sm:text-5xl text-center font-bold font-title"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Suas Ideias, Documentos, & <br /> Planos. Unificados. <br /> Bem-vindo ao{' '}
        <span className="text-primary underline underline-offset-8">NoteHub.</span>
      </motion.h1>

      <TypeIt
        options={{ speed: 60 }}
        as="h2"
        className="max-w-[520px] mx-auto text-lg sm:text-xl font-medium text-center"
      >
        O NoteHub é o lugar onde tudo acontece de maneira mais organizada, rápida e eficiente!
      </TypeIt>
    </div>
  );
}
