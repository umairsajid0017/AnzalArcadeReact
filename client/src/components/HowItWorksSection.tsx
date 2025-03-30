import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Join our waitlist today and be among the first to access QuantumLeap when we launch."
  },
  {
    number: 2,
    title: "Get Early Access",
    description: "We'll send you an invitation to be part of our exclusive beta testing program."
  },
  {
    number: 3,
    title: "Transform Your Workflow",
    description: "Experience the future of team productivity with our innovative platform."
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How QuantumLeap Works</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Our simple three-step process gets you up and running in minutes, not days.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-200 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative md:ml-0 mb-12 md:mb-0 mt-12 first:mt-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-8 items-center">
                {index % 2 === 0 ? (
                  <>
                    <div className="md:col-span-3 md:text-right order-2 md:order-1">
                      <div className="bg-white rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold mb-2">{step.number}. {step.title}</h3>
                        <p className="text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center md:col-span-1 order-1 md:order-2">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-xl font-bold shadow-md">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:col-span-3 order-3"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block md:col-span-3 order-1"></div>
                    
                    <div className="flex justify-center md:col-span-1 order-1 md:order-2">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-xl font-bold shadow-md">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="md:col-span-3 order-2 md:order-3">
                      <div className="bg-white rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold mb-2">{step.number}. {step.title}</h3>
                        <p className="text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#waitlist">
            <Button className="text-base shadow-[0_4px_6px_-1px_rgba(59,130,246,0.3)]" size="lg">
              Get Started Now
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
