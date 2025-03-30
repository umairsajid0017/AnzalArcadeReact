import { ArrowRight, Award, BookOpen, Briefcase, Building, CheckCircle, Landmark, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Engineer() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView("engineer");
  }, [trackPageView]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-primary/5 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tighter mb-4">
                  Muhammad Waqar Rana
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Lead Civil Engineer
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    15+ Years Experience
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    Industrial Construction
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    PEC Member
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-8">
                  A seasoned civil engineer specializing in power plants, renewable energy projects, and oil & gas infrastructure. With extensive expertise in international codes and best practices, Muhammad has worked across all phases of construction, delivering exceptional results.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/contact">Contact Muhammad <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/projects">View Projects</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
                  alt="Muhammad Waqar Rana"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Expertise and Experience Tabs */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="expertise" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-2xl grid-cols-3">
                  <TabsTrigger value="expertise">Expertise</TabsTrigger>
                  <TabsTrigger value="credentials">Credentials</TabsTrigger>
                  <TabsTrigger value="projects">Key Projects</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="expertise" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Industrial Construction</h3>
                          <p className="text-muted-foreground">
                            Specialized expertise in power plants, renewable energy, and oil & gas infrastructure projects.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Quality Assurance & Control</h3>
                          <p className="text-muted-foreground">
                            Comprehensive QA/QC management for civil engineering activities across all project phases.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Landmark className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">International Standards</h3>
                          <p className="text-muted-foreground">
                            In-depth knowledge of international codes and construction best practices.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Project Management</h3>
                          <p className="text-muted-foreground">
                            Certified Google Project Manager with experience in complex construction project coordination.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Global Experience</h3>
                          <p className="text-muted-foreground">
                            Worked on major national and international projects across different geographies and environments.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Technical Expertise</h3>
                          <p className="text-muted-foreground">
                            Advanced IT tools implementation and technical documentation for engineering projects.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="credentials" className="space-y-6">
                <div className="max-w-3xl mx-auto">
                  <div className="rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Professional Certifications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Member, Pakistan Engineering Council</p>
                          <p className="text-muted-foreground">Registration No. Civil/29500</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Registered Professional Engineer</p>
                          <p className="text-muted-foreground">Sindh Building Control Authority</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Certified Google Project Manager</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg border p-6 shadow-sm mt-8">
                    <h3 className="text-xl font-bold mb-4">Industry Experience</h3>
                    <p className="text-muted-foreground mb-4">
                      Throughout his career, Muhammad Waqar Rana has contributed to major national and international projects, working with renowned organizations such as:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>HUBCO</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>DESCON</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>Pakistan State Oil (PSO)</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>Power China Huadong Engineering Corporation</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>United Nations Development Programme (UNDP)</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p>China Petroleum Engineering Corporation</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-center mb-6">Notable Projects</h3>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">30 MW & 50 MW Wind Power Projects</h4>
                        <p className="text-sm text-muted-foreground mb-2">Jhimpir, Sindh, Pakistan</p>
                        <p className="text-muted-foreground">
                          Oversaw quality control and assurance for civil engineering aspects of these renewable energy projects, ensuring compliance with international standards.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">330 MW Thar Energy (TEL) Coal Power Project</h4>
                        <p className="text-muted-foreground">
                          Managed civil engineering quality control for this major power generation facility, supervising construction phases and implementing quality standards.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">330 MW Thal Nova (TN) Coal Power Project</h4>
                        <p className="text-muted-foreground">
                          Led civil engineering quality assurance, ensuring structural integrity and compliance with project specifications.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">Renovation of 20 ART Centres in Sindh</h4>
                        <p className="text-sm text-muted-foreground mb-2">Independent Consultant to UNDP</p>
                        <p className="text-muted-foreground">
                          Provided expert consultation on renovation and construction quality for healthcare facilities across the region.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">50 MW Solar PV Plant</h4>
                        <p className="text-sm text-muted-foreground mb-2">Sukkur, Pakistan</p>
                        <p className="text-muted-foreground">
                          Supervised civil engineering quality for this renewable energy installation, ensuring foundation and structural elements met project requirements.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">1,400 KM Crude Oil Pipeline Project</h4>
                        <p className="text-sm text-muted-foreground mb-2">Tanzania, Africa (EACOP)</p>
                        <p className="text-muted-foreground">
                          Managed quality control for civil engineering aspects of this extensive international infrastructure project.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">PSO New Depot Construction</h4>
                        <p className="text-sm text-muted-foreground mb-2">Faisalabad</p>
                        <p className="text-muted-foreground">
                          Oversaw construction of Loading/Unloading Gantries, Pump Shed, Pipe Racks, and Checking Bays, ensuring quality standards were met.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-2">765/500/220/132 kV Grid Station</h4>
                        <p className="text-muted-foreground">
                          Led civil engineering quality assurance for the design, supply, installation & commissioning of this complex power distribution facility.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Work with Muhammad Waqar Rana</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you need expert consultation, quality assurance for your construction project, or professional civil engineering services, Muhammad brings 15 years of industry expertise to deliver exceptional results.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get in Touch Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}