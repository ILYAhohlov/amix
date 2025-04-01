import { motion } from "framer-motion";
import { VietbuildExhibitionType, BusinessMissionType } from "../data/exhibitionData";

type Exhibition = VietbuildExhibitionType | BusinessMissionType;

interface VisitorFormData {
  name: string;
  email: string;
  country: string;
  purpose: string;
  comments: string;
}

interface VisitorFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VisitorFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedExhibition?: Exhibition;
  formStatus?: {
    success?: boolean;
    message?: string;
  };
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
  },
  exit: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const COUNTRIES = ["Russia", "USA", "Germany", "Singapore", "Other"];
const PURPOSES = ["Business Meeting", "Explore Products", "Networking", "Other"];

export default function VisitorForm({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  selectedExhibition,
  formStatus
}: VisitorFormProps) {
  if (!isOpen) return null;

  // Helper function to determine button state
  const getSubmitButtonText = () => {
    if (formStatus?.message === "Submitting...") return "Submitting...";
    if (formStatus?.success) return "Success!";
    return "Submit";
  };

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
          Register as Visitor
          {selectedExhibition?.title && (
            <span className="block text-sm text-muted-foreground mt-1">
              {selectedExhibition.title}
            </span>
          )}
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

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            >
              <option value="" className="text-white">Select Country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country} className="text-white">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium mb-1">
              Purpose
            </label>
            <select
              id="purpose"
              value={formData.purpose}
              onChange={onChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            >
              <option value="" className="text-white">Select Purpose</option>
              {PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose} className="text-white">
                  {purpose}
                </option>
              ))}
            </select>
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium mb-1">
              Comments
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={onChange}
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
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {getSubmitButtonText()}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
