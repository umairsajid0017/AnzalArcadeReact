import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-primary rounded-full text-sm font-medium">
              Coming Soon
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Revolutionize Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Workflow</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl mb-8 max-w-lg">
              QuantumLeap is the next-generation productivity platform that helps teams collaborate seamlessly and deliver projects faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#waitlist">
                <Button className="w-full sm:w-auto text-base shadow-[0_4px_6px_-1px_rgba(59,130,246,0.3)]" size="lg">
                  Join the Waitlist
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="w-full sm:w-auto text-base" size="lg">
                  Learn More
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              <span className="inline-flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                <span>No credit card required</span>
              </span>
              <span className="inline-flex items-center ml-4">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                <span>Early access to beta</span>
              </span>
            </p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-3xl transform rotate-3"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="QuantumLeap dashboard preview" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-green-100 text-green-500">
                  <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">300% Faster</p>
                  <p className="text-xs text-slate-500">workflow completion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
