import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "@/data/countries";

interface BusinessTourFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  comments: string;
  selectedPackage: 'basic' | 'standard' | 'premium' | null;
}

interface BusinessTourFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: 'basic' | 'standard' | 'premium' | null;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.3, 
      type: "spring", 
      damping: 20,
      stiffness: 300
    }
  }
};

export default function BusinessTourForm({ isOpen, onClose, selectedPackage }: BusinessTourFormProps) {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [formData, setFormData] = useState<BusinessTourFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    comments: '',
    selectedPackage: selectedPackage
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Submitting..." });
    
    try {
      const response = await fetch('/api/business-tour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          package: selectedPackage
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          success: true, 
          message: data.message || "Booking request submitted successfully!" 
        });
        
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setFormStatus({ 
          success: false, 
          message: data.message || "An error occurred. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error submitting business tour form:", error);
      setFormStatus({ 
        success: false, 
        message: "An error occurred. Please try again." 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="relative bg-background border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <span className="text-2xl">×</span>
        </button>

        <h3 className="text-xl font-bold mb-4">
          Book {selectedPackage?.charAt(0).toUpperCase()}{selectedPackage?.slice(1)} Package
        </h3>

        {/* Status message */}
        {formStatus?.message && (
          <div className={`mb-4 p-3 rounded-md ${
            formStatus.success 
              ? "bg-green-100 text-green-800" 
              : formStatus.success === false 
                ? "bg-red-100 text-red-800" 
                : "bg-blue-100 text-blue-800"
          }`}>
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Country Select */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            >
              <option value="" className="bg-gray-800 text-white">Select Country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country} className="bg-gray-800 text-white">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium mb-1">
              Additional Comments
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formStatus?.message === "Submitting..."}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                formStatus?.success
                  ? "bg-green-500 text-white"
                  : "bg-accent hover:bg-accent/90 text-white"
              }`}
            >
              {formStatus?.message === "Submitting..." ? "Submitting..." : "Book Now"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}