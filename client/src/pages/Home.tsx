import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Project, Service } from "@shared/schema";
import { ArrowRight, CheckCircle, Building, Building2, Factory, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function Home() {
  const { trackPageView } = useAnalytics();
  
  // Fetch featured projects and services
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery<{ success: boolean; data: Project[] }>({
    queryKey: ['/api/projects/featured'],
  });
  
  const { data: featuredServices, isLoading: servicesLoading } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ['/api/services/featured'],
  });
  
  useEffect(() => {
    // Track page view when component mounts
    trackPageView('home');
  }, [trackPageView]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Mouse Reactive */}
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          {/* Lansdowne Bridge Background Image */}
          <div 
            id="parallax-hero-bg" 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out scale-105"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1532989029401-51516a1e9ae3?q=80&w=2071&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0"></div>
          
          {/* Content */}
          <div className="container px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 transition-transform duration-300 ease-out" id="parallax-hero-title">
                Building Excellence in Every Project
              </h1>
              <p className="mt-4 text-xl text-white/90 max-w-3xl transition-transform duration-300 ease-out" id="parallax-hero-text">
                Anzal Arcade Construction delivers quality, innovative construction solutions for power plants, renewable energy, and oil & gas projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/projects">Explore Our Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Add mouse movement effect script */}
          <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const bg = document.getElementById('parallax-hero-bg');
              const title = document.getElementById('parallax-hero-title');
              const text = document.getElementById('parallax-hero-text');
              
              document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                // Subtle background movement
                bg.style.transform = \`scale(1.05) translate(\${-x * 20}px, \${-y * 20}px)\`;
                
                // Even more subtle text movement in opposite direction for depth
                title.style.transform = \`translate(\${x * 10}px, \${y * 10}px)\`;
                text.style.transform = \`translate(\${x * 5}px, \${y * 5}px)\`;
              });
            });
          `}} />
        </section>
        
        {/* Stats Section */}
        <section className="py-12 border-y">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">150+</p>
                <p className="text-muted-foreground mt-1">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">15+</p>
                <p className="text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">45+</p>
                <p className="text-muted-foreground mt-1">Expert Team Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
                <p className="text-muted-foreground mt-1">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Services Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Construction Services</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We provide comprehensive construction solutions tailored to meet your specific needs, delivering quality results on time and within budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicesLoading ? (
                // Skeleton loading for services
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="h-[300px]">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <Skeleton className="h-12 w-12 rounded-full mb-6" />
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                  </Card>
                ))
              ) : featuredServices?.data && featuredServices.data.length > 0 ? (
                // Actual services from API
                featuredServices.data.slice(0, 3).map((service) => (
                  <Card key={service.id} className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="mb-6 bg-primary/10 p-3 rounded-full">
                        {service.iconName === "Building" && <Building className="h-8 w-8 text-primary" />}
                        {service.iconName === "Building2" && <Building2 className="h-8 w-8 text-primary" />}
                        {service.iconName === "Factory" && <Factory className="h-8 w-8 text-primary" />}
                        {service.iconName === "ShieldCheck" && <ShieldCheck className="h-8 w-8 text-primary" />}
                        {service.iconName === "Clock" && <Clock className="h-8 w-8 text-primary" />}
                        {service.iconName === "Sparkles" && <Sparkles className="h-8 w-8 text-primary" />}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <Button variant="outline" asChild className="mt-auto" size="sm">
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Fallback services if none are found
                <>
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="mb-6 bg-primary/10 p-3 rounded-full">
                        <Building className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Residential Construction</h3>
                      <p className="text-muted-foreground mb-6">
                        Custom home building, renovations, and additions for beautiful and functional living spaces.
                      </p>
                      <Button variant="outline" asChild className="mt-auto" size="sm">
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="mb-6 bg-primary/10 p-3 rounded-full">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Commercial Construction</h3>
                      <p className="text-muted-foreground mb-6">
                        Retail, office, and hospitality spaces designed and built to enhance business operations.
                      </p>
                      <Button variant="outline" asChild className="mt-auto" size="sm">
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="mb-6 bg-primary/10 p-3 rounded-full">
                        <Factory className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Industrial Construction</h3>
                      <p className="text-muted-foreground mb-6">
                        Factories, warehouses, and manufacturing facilities built for efficiency and safety.
                      </p>
                      <Button variant="outline" asChild className="mt-auto" size="sm">
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Anzal Arcade?</h2>
                <p className="text-muted-foreground mb-8">
                  With over 15 years of experience and a commitment to excellence, we bring unparalleled expertise to every project.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Quality Craftsmanship</h3>
                      <p className="text-muted-foreground">We maintain the highest standards in every project, using premium materials and expert techniques.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Timely Completion</h3>
                      <p className="text-muted-foreground">We understand the importance of deadlines and work efficiently to deliver projects on schedule.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Transparent Pricing</h3>
                      <p className="text-muted-foreground">No hidden costs or surprises. We provide detailed quotes and keep you informed throughout the project.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Customer Satisfaction</h3>
                      <p className="text-muted-foreground">Our clients' vision and satisfaction are our top priorities, which is reflected in our 98% satisfaction rate.</p>
                    </div>
                  </div>
                </div>
                
                <Button asChild className="mt-8">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1603969072881-b0fc7f3d6d7a?q=80&w=2070&auto=format&fit=crop" 
                  alt="Construction team at work" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Explore some of our best work across various construction sectors
              </p>
            </div>
            
            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-64 w-full rounded-t-lg" />
                    <div className="p-6 bg-card border rounded-b-lg border-t-0">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredProjects?.data && featuredProjects.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProjects.data.slice(0, 3).map((project) => (
                  <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                      <Badge className="absolute top-2 right-2 bg-primary/90">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 w-full p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-white/80 line-clamp-2 mb-4">{project.description}</p>
                      <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                        <Link href={`/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Fallback projects */}
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
                      alt="Luxury Residence" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Residential
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Luxury Residence</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">Modern luxury home with sustainable features and smart home integration.</p>
                    <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" 
                      alt="Office Complex" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Commercial
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Office Complex</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">State-of-the-art office building with collaborative spaces and energy-efficient design.</p>
                    <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2031&auto=format&fit=crop" 
                      alt="Warehouse Facility" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Industrial
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Warehouse Facility</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">Modern distribution center with advanced logistics systems and sustainable features.</p>
                    <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/projects">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Industries We Serve - Animated Section */}
        <section className="py-12 md:py-24 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                With 15 years of expertise, we specialize in construction solutions for these key sectors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Industry Card 1 - Renewable Energy */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60"
                    alt="Renewable Energy" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Renewable Energy</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Building sustainable future with solar plants, wind farms, and hydropower facilities that reduce environmental impact.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Industry Card 2 - Power Plants */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop&q=60"
                    alt="Power Plants" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Power Plants</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Construction and maintenance of power generation facilities with a focus on efficiency and safety standards.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Industry Card 3 - Oil & Gas */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1610459621008-63f40d6bc722?w=800&auto=format&fit=crop&q=60"
                    alt="Oil & Gas" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Oil & Gas</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Specialized construction for refineries, pipelines, and processing facilities that meet strict industry regulations.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Industry Card 4 - Medical & Healthcare */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60"
                    alt="Medical & Healthcare" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Medical & Healthcare</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Construction of hospitals, clinics, and healthcare facilities with precision attention to specialized requirements.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Industry Card 5 - Infrastructure */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1545630478-cf5a6202f885?w=800&auto=format&fit=crop&q=60"
                    alt="Infrastructure" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Infrastructure</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Development of roads, bridges, and public facilities that connect communities and support economic growth.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Industry Card 6 - Commercial Buildings */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=60"
                    alt="Commercial Buildings" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Commercial Buildings</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Creating functional and attractive office spaces, retail centers, and multi-use commercial properties.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Clients Section with Animation */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Trusted Clients</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Proud to work with these organizations on impactful construction projects
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110">
                <img 
                  src="https://placehold.co/200x200/e2e8f0/64748b?text=Regional+Blood+Centre" 
                  alt="Regional Blood Centre Sukkur" 
                  className="max-w-full max-h-full"
                />
              </div>
              
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110">
                <img 
                  src="https://placehold.co/200x200/e2e8f0/64748b?text=Matrix" 
                  alt="Matrix Management – Lahore" 
                  className="max-w-full max-h-full"
                />
              </div>
              
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110">
                <img 
                  src="https://placehold.co/200x200/e2e8f0/64748b?text=UNDP" 
                  alt="UNDP" 
                  className="max-w-full max-h-full"
                />
              </div>
              
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110">
                <img 
                  src="https://placehold.co/200x200/e2e8f0/64748b?text=Client+4" 
                  alt="Client 4" 
                  className="max-w-full max-h-full"
                />
              </div>
              
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110">
                <img 
                  src="https://placehold.co/200x200/e2e8f0/64748b?text=Client+5" 
                  alt="Client 5" 
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Construction Project?</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Contact us today for a free consultation and quote. Let's build something great together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
