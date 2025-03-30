import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
}

// Animation variants for page elements
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export const PageItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.div
    variants={itemVariants}
    className={className}
  >
    {children}
  </motion.div>
);

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}