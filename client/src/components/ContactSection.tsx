import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GlassCard from "./ui/glass-card";
import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setSubmitStatus("submitting");
      
      // Direct fetch call instead of apiRequest
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // Parse the JSON response
      const responseData = await response.json();
      
      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        console.error("Error submitting form:", responseData);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-primary bg-opacity-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 title-shadow">Get in Touch</h2>
            <p className="text-slate-300 mb-8 max-w-lg">
              Interested in our services or want to explore collaboration opportunities? 
              Fill out the form and our team will get back to you shortly.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium mb-1">Location</h4>
                  <p className="text-slate-300">Vietnam. Hanoi City. Office A-303, 35 Cu Loc street. Thanh Xuan district.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                  <Mail className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium mb-1">Email</h4>
                  <p className="text-slate-300">amix@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                  <Phone className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium mb-1">Phone</h4>
                  <p className="text-slate-300">+84 8 66769601</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-montserrat mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full bg-white bg-opacity-10 border ${errors.name ? 'border-red-500' : 'border-white border-opacity-20'} rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent`}
                      placeholder="Your Name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-montserrat mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full bg-white bg-opacity-10 border ${errors.email ? 'border-red-500' : 'border-white border-opacity-20'} rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent`}
                      placeholder="your@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-montserrat mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full bg-white bg-opacity-10 border ${errors.subject ? 'border-red-500' : 'border-white border-opacity-20'} rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent`}
                    placeholder="How can we help?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-montserrat mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full bg-white bg-opacity-10 border ${errors.message ? 'border-red-500' : 'border-white border-opacity-20'} rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent`}
                    placeholder="Your message..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="w-full bg-accent hover:bg-opacity-90 text-white py-3 rounded-md font-montserrat font-medium transition-all disabled:opacity-70"
                >
                  {submitStatus === "submitting" ? "Sending..." : 
                   submitStatus === "success" ? "Message Sent!" : 
                   submitStatus === "error" ? "Error! Try Again" : 
                   "Send Message"}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
