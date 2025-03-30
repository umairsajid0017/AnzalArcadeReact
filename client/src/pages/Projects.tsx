import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@shared/schema";

export default function Projects() {
  // State for filtering projects
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch projects from the API
  const { data: projectsData, isLoading } = useQuery<{ success: boolean; data: Project[] }>({
    queryKey: ['/api/projects'],
  });
  
  // Get unique categories from projects for filter buttons
  const categories = projectsData?.data 
    ? Array.from(new Set(projectsData.data.map(project => project.category))) 
    : [];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projectsData?.data.filter(project => project.category === selectedCategory)
    : projectsData?.data;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Projects</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our portfolio of successful construction projects across various sectors
              </p>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="mb-2"
              >
                All Projects
              </Button>
              
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-8 w-3/4 mt-4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                ))}
              </div>
            ) : filteredProjects?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative aspect-[16/9]">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary/90">
                        {project.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.location}
                        {project.completionDate && ` • Completed: ${project.completionDate}`}
                      </p>
                      <p className="mt-3">{project.description}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button asChild variant="outline" size="sm">
                        <a href={`/projects/${project.id}`}>View Details</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium">No projects found</h3>
                <p className="text-muted-foreground mt-2">
                  {selectedCategory 
                    ? `No projects found in the "${selectedCategory}" category.` 
                    : "No projects have been added yet."}
                </p>
                {selectedCategory && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCategory(null)}
                    className="mt-4"
                  >
                    View All Projects
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* Custom Project Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Have a Custom Project in Mind?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We specialize in bringing unique construction visions to life. Let's discuss your specific requirements and how we can create a custom solution for you.
                </p>
                <Button asChild>
                  <a href="/contact">Contact Our Team</a>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop" 
                  alt="Custom projects" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}