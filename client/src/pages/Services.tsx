import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@shared/schema";
import * as LucideIcons from "lucide-react";

export default function Services() {
  // Fetch services from the API
  const { data: servicesData, isLoading } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ['/api/services'],
  });

  // Dynamic icon component based on iconName from database
  const DynamicIcon = ({ iconName }: { iconName: string }) => {
    // Type assertion for looking up icons by name
    const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
    const IconComponent = iconMap[iconName] || LucideIcons.HelpCircle;
    return <IconComponent className="h-10 w-10 text-primary" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Services</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive construction solutions for all your building needs
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">What We Offer</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                From concept to completion, we provide end-to-end construction services tailored to your specific needs
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-72">
                    <CardHeader>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-6 w-3/4 mt-4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4 mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData?.data.length ? (
                  servicesData.data.map((service) => (
                    <Card key={service.id} className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <DynamicIcon iconName={service.iconName} />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <>
                    {/* Default services when none are available from the API */}
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.BuildingIcon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Residential Construction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Building custom homes that reflect your personal style and meet your family's needs, from concept to completion.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.Building2Icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Commercial Construction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Creating functional and attractive commercial spaces that help businesses thrive and make a lasting impression.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.FactoryIcon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Industrial Construction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Developing robust industrial facilities that prioritize functionality, safety, and efficiency.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.PaintbrushIcon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Renovation & Remodeling</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Transforming existing spaces with expert renovations that modernize, enhance functionality, and add value.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.PencilRulerIcon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Design-Build</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Streamlining your project with integrated design and construction services for a seamless experience.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4">
                          <LucideIcons.HardHatIcon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>Construction Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          Expert oversight of your construction project, ensuring it stays on schedule, within budget, and meets quality standards.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Process</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We follow a systematic approach to ensure your project is completed efficiently and to your satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-card rounded-lg p-6 shadow-sm text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <div className="mt-4">
                  <LucideIcons.ClipboardListIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Consultation</h3>
                  <p className="text-muted-foreground">
                    We meet to discuss your vision, requirements, and budget constraints.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-card rounded-lg p-6 shadow-sm text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <div className="mt-4">
                  <LucideIcons.PencilRulerIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Design & Planning</h3>
                  <p className="text-muted-foreground">
                    Our experts create detailed plans and designs tailored to your needs.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-card rounded-lg p-6 shadow-sm text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                <div className="mt-4">
                  <LucideIcons.HammerIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Construction</h3>
                  <p className="text-muted-foreground">
                    We execute the construction with precision, quality, and attention to detail.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="bg-card rounded-lg p-6 shadow-sm text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                <div className="mt-4">
                  <LucideIcons.CheckCircleIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Completion & Handover</h3>
                  <p className="text-muted-foreground">
                    We deliver your project and provide ongoing support and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 shadow-lg">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-lg mb-8">
                  Contact us today to discuss how we can bring your construction vision to life.
                </p>
                <a href="/contact" className="inline-block bg-background text-foreground hover:bg-muted px-6 py-3 rounded-md font-medium transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}