import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4,
};

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const [currentKey, setCurrentKey] = useState(location);

  useEffect(() => {
    // Update the key when location changes to trigger animation
    setCurrentKey(location);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}