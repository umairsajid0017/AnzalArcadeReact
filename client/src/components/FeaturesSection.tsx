import { motion } from "framer-motion";
import { Zap, Users, Shield, Check } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lightning Fast",
    description: "Optimized workflows that decrease project completion time by up to 70%."
  },
  {
    icon: <Users className="h-6 w-6 text-purple-500" />,
    title: "Seamless Collaboration",
    description: "Real-time teamwork capabilities that bring your team together, no matter where they are."
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and security protocols to keep your data safe at all times."
  }
];

const analyticsFeatures = [
  "Visualize project progress with interactive charts",
  "Track team performance metrics in real-time",
  "AI-powered insights and recommendations"
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose QuantumLeap?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Our platform offers a revolutionary approach to productivity, designed for modern teams with modern challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="rounded-xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="QuantumLeap features showcase" 
              className="w-full h-auto"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold">Advanced Analytics Dashboard</h3>
            <p className="text-slate-500">
              Our intuitive analytics dashboard provides real-time insights into your team's productivity and project status.
            </p>
            <ul className="space-y-3">
              {analyticsFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="inline-flex items-center text-primary font-medium">
              Learn more about our analytics
              <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
