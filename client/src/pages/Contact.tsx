import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";

// Extend the schema with additional validations
const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must not exceed 1000 characters")
});

// Infer the type from the schema
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  // Define the form with react-hook-form and zodResolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });
  
  // Define the mutation for form submission
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      } as RequestInit);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We have received your message and will contact you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  function onSubmit(data: ContactFormValues) {
    mutate(data);
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Contact Us</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Get in touch with our team to discuss your construction project
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Info and Form */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Reach Out to Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our services or want to discuss your construction project? Our team is here to help you. Feel free to contact us using any of the methods below.
                </p>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-1">Our Location</CardTitle>
                        <CardDescription className="text-base">
                          123 Construction Avenue, Building District, City, State 12345
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-1">Phone</CardTitle>
                        <CardDescription className="text-base">
                          <a href="tel:+1234567890" className="hover:text-primary">
                            (123) 456-7890
                          </a>
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <MailIcon className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-1">Email</CardTitle>
                        <CardDescription className="text-base">
                          <a href="mailto:info@anzalarcade.com" className="hover:text-primary">
                            info@anzalarcade.com
                          </a>
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <ClockIcon className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-1">Business Hours</CardTitle>
                        <CardDescription className="text-base">
                          Monday to Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Closed
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <Card className="border-2 border-muted">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="Subject of your message" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Your message" 
                                  rows={5}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Please provide details about your project or inquiry.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isPending}>
                          {isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Our Location</h2>
              <p className="text-muted-foreground mt-2">
                Visit our office to discuss your project in person
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden h-96 border-2 border-muted bg-card">
              {/* This is a placeholder for a map. In a real project, you'd integrate Google Maps or similar */}
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <div className="text-center p-6">
                  <MapPinIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Anzal Arcade Headquarters</h3>
                  <p className="text-muted-foreground mt-2">
                    123 Construction Avenue, Building District, City, State 12345
                  </p>
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