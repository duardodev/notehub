'use client';

import { motion } from 'framer-motion';

export function Heading() {
  return (
    <div className="max-w-[790px] mx-auto space-y-6  sm:space-y-7">
      <motion.h1
        className="text-4xl sm:text-5xl text-center font-bold font-title"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ideias, Documentos & Planos. <br className="hidden sm:block" /> Todos em um só lugar. <br />{' '}
        Bem-vindo ao <span className="text-primary underline underline-offset-4">NoteHub!</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto text-lg sm:text-xl font-medium text-center"
      >
        O espaço ideal para organizar e otimizar sua produtividade. Com o NoteHub, você pode
        gerenciar tudo de forma eficiente, em um só lugar!
      </motion.h2>
    </div>
  );
}
