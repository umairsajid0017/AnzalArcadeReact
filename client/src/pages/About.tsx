import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building, Users, Lightbulb, Shield } from "lucide-react";
import { CompanyInfo } from "@shared/schema";

export default function About() {
  // Fetch about page information from the API
  const { data: aboutInfo, isLoading: aboutLoading } = useQuery<{ success: boolean; data: CompanyInfo }>({
    queryKey: ['/api/company-info/about'],
  });
  
  const { data: missionInfo, isLoading: missionLoading } = useQuery<{ success: boolean; data: CompanyInfo }>({
    queryKey: ['/api/company-info/mission'],
  });
  
  const { data: visionInfo, isLoading: visionLoading } = useQuery<{ success: boolean; data: CompanyInfo }>({
    queryKey: ['/api/company-info/vision'],
  });
  
  const { data: valuesInfo, isLoading: valuesLoading } = useQuery<{ success: boolean; data: CompanyInfo }>({
    queryKey: ['/api/company-info/values'],
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About Us</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Building the future through quality construction and exceptional service
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                {aboutLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {aboutInfo?.data ? (
                      <div dangerouslySetInnerHTML={{ __html: aboutInfo.data.content }} />
                    ) : (
                      <>
                        <p className="text-muted-foreground mb-4">
                          Founded in 2010, Anzal Arcade Construction began as a small family business with a vision to transform the construction industry through quality, innovation, and exceptional service.
                        </p>
                        <p className="text-muted-foreground mb-4">
                          Over the past decade, we have grown into a full-service construction company with a reputation for excellence in residential, commercial, and industrial projects. Our team of skilled professionals brings decades of combined experience to every project.
                        </p>
                        <p className="text-muted-foreground">
                          Today, we continue to build on our foundation of integrity and craftsmanship, embracing new technologies and sustainable building practices to deliver construction solutions that stand the test of time.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-tl-2xl z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-br-2xl z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2070&auto=format&fit=crop" 
                  alt="Construction team" 
                  className="rounded-lg shadow-xl relative z-10" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission, Vision and Values Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission, Vision & Values</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                The principles that guide our work and define our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission Card */}
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-6 bg-primary/10 p-3 rounded-full">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  {missionLoading ? (
                    <div className="space-y-3 w-full">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3 mx-auto" />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {missionInfo?.data ? missionInfo.data.content : "To deliver exceptional construction services that transform our clients' visions into reality through quality craftsmanship, innovative solutions, and unwavering integrity."}
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Vision Card */}
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-6 bg-primary/10 p-3 rounded-full">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  {visionLoading ? (
                    <div className="space-y-3 w-full">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3 mx-auto" />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {visionInfo?.data ? visionInfo.data.content : "To be recognized as the premier construction company, setting the standard for excellence through sustainable practices, technological innovation, and customer-focused service."}
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Values Card */}
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-6 bg-primary/10 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Values</h3>
                  {valuesLoading ? (
                    <div className="space-y-3 w-full">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    <ul className="text-left text-muted-foreground space-y-2">
                      {valuesInfo?.data ? (
                        <div dangerouslySetInnerHTML={{ __html: valuesInfo.data.content }} />
                      ) : (
                        <>
                          <li>• Integrity in all business relationships</li>
                          <li>• Excellence in craftsmanship and service</li>
                          <li>• Innovation in construction methods</li>
                          <li>• Safety as our top priority</li>
                          <li>• Sustainability in our practices</li>
                        </>
                      )}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet the experienced professionals who guide our company
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="aspect-square relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                    alt="John Anderson" 
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">John Anderson</h3>
                <p className="text-primary font-medium mb-2">CEO & Founder</p>
                <p className="text-muted-foreground">
                  With 25 years in construction, John brings vision and leadership to every project.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="aspect-square relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                    alt="Sarah Johnson" 
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-2">Chief Operations Officer</p>
                <p className="text-muted-foreground">
                  Sarah ensures projects run smoothly from planning through completion.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="aspect-square relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" 
                    alt="Michael Lee" 
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Michael Lee</h3>
                <p className="text-primary font-medium mb-2">Head Architect</p>
                <p className="text-muted-foreground">
                  Michael's innovative designs have won multiple industry awards.
                </p>
              </div>
              
              {/* Team Member 4 */}
              <div className="text-center">
                <div className="aspect-square relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                    alt="Emily Rodriguez" 
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Emily Rodriguez</h3>
                <p className="text-primary font-medium mb-2">Project Manager</p>
                <p className="text-muted-foreground">
                  Emily's attention to detail ensures client satisfaction on every project.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Recognition of our commitment to excellence in construction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Achievement 1 */}
              <Card className="overflow-hidden">
                <div className="h-40 bg-primary/80 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary-foreground" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Best Employer Award 2023</h3>
                  <p className="text-muted-foreground">
                    Recognized for our commitment to employee development, safety, and workplace culture.
                  </p>
                </CardContent>
              </Card>
              
              {/* Achievement 2 */}
              <Card className="overflow-hidden">
                <div className="h-40 bg-primary/80 flex items-center justify-center">
                  <Building className="h-16 w-16 text-primary-foreground" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Construction Excellence Award</h3>
                  <p className="text-muted-foreground">
                    Honored for outstanding quality and innovation in commercial construction projects.
                  </p>
                </CardContent>
              </Card>
              
              {/* Achievement 3 */}
              <Card className="overflow-hidden">
                <div className="h-40 bg-primary/80 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-primary-foreground" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Safety Recognition Award</h3>
                  <p className="text-muted-foreground">
                    Five consecutive years of exceptional workplace safety standards and practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                  <p className="text-primary-foreground/80 mb-6">
                    Let's work together to bring your construction vision to life. Our team of experts is ready to help you every step of the way.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="secondary">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                      <Link href="/services">Our Services</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1590859908151-5e42f41a3118?q=80&w=2070&auto=format&fit=crop" 
                    alt="Construction project" 
                    className="rounded-lg shadow-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}