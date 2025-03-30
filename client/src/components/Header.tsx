import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" aria-label="QuantumLeap">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-500 hover:text-primary font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-500 hover:text-primary font-medium transition-colors">
              How it Works
            </a>
            <a href="#waitlist" className="text-slate-500 hover:text-primary font-medium transition-colors">
              Join Waitlist
            </a>
          </nav>
          
          <div className="flex items-center">
            <a href="#waitlist" className="hidden md:inline-flex">
              <Button className="shadow-[0_4px_6px_-1px_rgba(59,130,246,0.3)]">
                Get Early Access
              </Button>
            </a>
            <button 
              type="button" 
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary" 
              aria-label="Main menu" 
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-b border-slate-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a 
            href="#features" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-500 hover:text-primary hover:bg-slate-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-500 hover:text-primary hover:bg-slate-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How it Works
          </a>
          <a 
            href="#waitlist" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-500 hover:text-primary hover:bg-slate-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
