import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MenuIcon, XIcon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="w-full border-b bg-background z-50 sticky top-0">
      <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl">Anzal Arcade</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <Link href="/">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/70'}`}>
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-foreground/70'}`}>
                About Us
              </a>
            </Link>
            <Link href="/services">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/services') ? 'text-primary' : 'text-foreground/70'}`}>
                Services
              </a>
            </Link>
            <Link href="/projects">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/projects') ? 'text-primary' : 'text-foreground/70'}`}>
                Projects
              </a>
            </Link>
            <Link href="/engineer">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/engineer') ? 'text-primary' : 'text-foreground/70'}`}>
                Lead Engineer
              </a>
            </Link>
            <Link href="/contact">
              <Button size="sm">Contact Us</Button>
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <div className={`fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: '65px' }}>
          <nav className="flex flex-col p-6 space-y-6">
            <Link href="/" onClick={closeMenu}>
              <a className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/70'}`}>
                Home
              </a>
            </Link>
            <Link href="/about" onClick={closeMenu}>
              <a className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-foreground/70'}`}>
                About Us
              </a>
            </Link>
            <Link href="/services" onClick={closeMenu}>
              <a className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/services') ? 'text-primary' : 'text-foreground/70'}`}>
                Services
              </a>
            </Link>
            <Link href="/projects" onClick={closeMenu}>
              <a className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/projects') ? 'text-primary' : 'text-foreground/70'}`}>
                Projects
              </a>
            </Link>
            <Link href="/engineer" onClick={closeMenu}>
              <a className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/engineer') ? 'text-primary' : 'text-foreground/70'}`}>
                Lead Engineer
              </a>
            </Link>
            <Link href="/contact" onClick={closeMenu}>
              <Button className="w-full" size="lg">Contact Us</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}