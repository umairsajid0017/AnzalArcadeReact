import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAnalytics } from "@/hooks/useAnalytics";
import PageLayout, { PageItem } from "@/components/PageLayout";
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
    <PageLayout>
      {/* Hero Section - Mouse Reactive */}
      <PageItem>
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          {/* Lansdowne Bridge Background Image */}
          <div 
            id="parallax-hero-bg" 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out scale-105"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1464&auto=format&fit=crop')",
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
      </PageItem>
      
      {/* Stats Section */}
      <PageItem>
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
      </PageItem>
      
      {/* Main Services Section */}
      <PageItem>
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
      </PageItem>
      
      {/* Why Choose Us Section */}
      <PageItem>
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
      </PageItem>
      
      {/* Featured Projects Section */}
      <PageItem>
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
              // Fallback projects if none are found
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1590274853742-d52658302025?q=80&w=2080&auto=format&fit=crop" 
                      alt="Industrial Plant Project" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Industrial
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Karachi Power Plant</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">Power generation facility with 500MW capacity, featuring advanced turbine technology and safety systems.</p>
                    <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1579847188804-2a9c3bc330e4?q=80&w=2069&auto=format&fit=crop" 
                      alt="Solar Farm Project" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Renewable Energy
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Lahore Solar Farm</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">18MW solar installation with 50,000 panels, providing clean energy to over 5,000 homes.</p>
                    <Button size="sm" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1584546727740-613232349e40?q=80&w=2070&auto=format&fit=crop" 
                      alt="Medical Facility Project" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <Badge className="absolute top-2 right-2 bg-primary/90">
                      Healthcare
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Regional Blood Centre Sukkur</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">State-of-the-art blood banking facility with specialized climate control and backup power systems.</p>
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
      </PageItem>
      
      {/* CTA Section */}
      <PageItem>
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
      </PageItem>
    </PageLayout>
  );
}