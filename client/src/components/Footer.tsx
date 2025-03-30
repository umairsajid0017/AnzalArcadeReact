import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-xl">Anzal Arcade</span>
            </div>
            <p className="text-muted-foreground">
              Building excellence in every project since 2010. Quality construction solutions for residential, commercial, and industrial needs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Residential Construction
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Commercial Construction
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Industrial Construction
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Renovation & Remodeling
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Construction Management
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Construction Avenue, Building District, City, State 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@anzalarcade.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@anzalarcade.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Anzal Arcade Construction. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about">
              <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}