import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-xl">Anzal Arcade</span>
            </div>
            <p className="text-gray-300">
              Building excellence in every project since 2010. Quality construction solutions for renewable energy, power plants, and oil & gas projects.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-primary"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-primary"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-primary"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Quality Assurance & Quality Control
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Inspections
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Audits
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Project Management
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">
                    Renewable Energy Solutions
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Pakistan Engineering Council Office, Sindh Building Control Authority
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+923000000000" className="text-gray-300 hover:text-primary transition-colors">
                  +92 300 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@anzalarcade.com" className="text-gray-300 hover:text-primary transition-colors">
                  info@anzalarcade.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Anzal Arcade Construction. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about">
              <a className="text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-gray-400 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}