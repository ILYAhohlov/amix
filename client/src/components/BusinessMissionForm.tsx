import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";

export type BusinessMissionFormData = {
  name: string;
  email: string;
  country: string;
  comments: string;
};

export type FormStatus = {
  success?: boolean;
  message?: string;
};

export type Exhibition = {
  id: number;
  title: string;
  date: string;
  location: string;
};

export type BusinessMissionFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: BusinessMissionFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  formStatus?: FormStatus;
  selectedExhibition?: Exhibition;
};

export function BusinessMissionForm({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  formStatus,
  selectedExhibition,
}: BusinessMissionFormProps) {
  const { t } = useTranslation();
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const getSubmitButtonText = () => {
    if (formStatus?.message === "Submitting...") return t("forms.businessMission.submitting");
    if (formStatus?.success) return t("forms.businessMission.success");
    return t("forms.businessMission.submit");
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
          {t("forms.businessMission.title")}
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
              {t("forms.businessMission.name")}
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
              {t("forms.businessMission.email")}
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
              {t("forms.businessMission.country")}
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={onChange}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            >
              <option value="" className="bg-gray-800 text-white">{t("forms.businessMission.selectCountry")}</option>
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
              {t("forms.businessMission.comments")}
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
              {t("forms.businessMission.cancel")}
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