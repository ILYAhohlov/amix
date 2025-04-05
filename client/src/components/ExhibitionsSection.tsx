import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building } from "lucide-react";
import GlassCard from "./ui/glass-card";
import VisitorForm from "./VisitorForm";
import ParticipantForm from "./ParticipantForm";
import { BusinessMissionForm, BusinessMissionFormData } from "./BusinessMissionForm";
import { businessMissions, vietbuildExhibitions } from "../data/exhibitionData";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "react-i18next";

// Типы данных форм
type VisitorFormData = {
  name: string;
  email: string;
  country: string;
  purpose: string;
  comments: string;
};

type ParticipantFormData = {
  name: string;
  email: string;
  company: string;
  country: string;
  participationType: string;
  industry: string;
  registrationAssistance: string;
  logistics: string;
  comments: string;
};

// Добавляем новый тип модального окна
type ModalType = "visitor" | "participant" | "business-mission";

export default function ExhibitionsSection() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<{ type: ModalType; exhibitionId: string } | null>(null);

  // Success or error messages
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [visitorFormData, setVisitorFormData] = useState({
    name: "",
    email: "",
    country: "",
    purpose: "",
    comments: "",
  });

  const [participantFormData, setParticipantFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    participationType: "",
    industry: "",
    registrationAssistance: "",
    logistics: "",
    comments: "",
  });

  // Добавляем состояние для данных формы бизнес-миссий
  const [businessMissionFormData, setBusinessMissionFormData] = useState<BusinessMissionFormData>({
    name: "",
    email: "",
    country: "",
    comments: "",
  });

  const selectedExhibition = activeModal
    ? [...vietbuildExhibitions, ...businessMissions].find(
        (ex) => ex.id === activeModal.exhibitionId
      ) || null
    : null;

  const openModal = (type: ModalType, exhibitionId: string) => {
    // Reset status when opening a new form
    setFormStatus({});
    setActiveModal({ type, exhibitionId });
  };

  const closeModal = () => {
    setActiveModal(null);
    // Reset form data and status on close
    setFormStatus({});
    setVisitorFormData({
      name: "",
      email: "",
      country: "",
      purpose: "",
      comments: "",
    });
    setParticipantFormData({
      name: "",
      email: "",
      company: "",
      country: "",
      participationType: "",
      industry: "",
      registrationAssistance: "",
      logistics: "",
      comments: "",
    });
    setBusinessMissionFormData({
      name: "",
      email: "",
      country: "",
      comments: "",
    });
  };

  const handleVisitorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setVisitorFormData({ ...visitorFormData, [e.target.id]: e.target.value });
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setParticipantFormData({ ...participantFormData, [e.target.id]: e.target.value });
  };

  const handleBusinessMissionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBusinessMissionFormData({ ...businessMissionFormData, [e.target.id]: e.target.value });
  };

  const handleVisitorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Submitting..." });
    
    try {
      // Add the exhibition title if available
      const formDataWithExhibition = {
        ...visitorFormData,
        exhibition: selectedExhibition?.title
      };
      
      // Use the new API endpoint - direct fetch with error handling
      const response = await fetch('/api/visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithExhibition),
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          success: true, 
          message: data.message || "Registration successful!" 
        });
        
        // Clear form after successful submission
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        // Handle error responses
        setFormStatus({ 
          success: false, 
          message: data.message || "An error occurred. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error submitting visitor form:", error);
      setFormStatus({ 
        success: false, 
        message: "An error occurred. Please try again." 
      });
    }
  };

  const handleParticipantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Submitting..." });
    
    try {
      // Add the exhibition title if available
      const formDataWithExhibition = {
        ...participantFormData,
        exhibition: selectedExhibition?.title
      };
      
      // Use the new API endpoint - direct fetch with error handling
      const response = await fetch('/api/participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithExhibition),
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          success: true, 
          message: data.message || "Registration successful!" 
        });
        
        // Clear form after successful submission
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        // Handle error responses 
        setFormStatus({ 
          success: false, 
          message: data.message || "An error occurred. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error submitting participant form:", error);
      setFormStatus({ 
        success: false, 
        message: "An error occurred. Please try again." 
      });
    }
  };

  const handleBusinessMissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Submitting..." });
    
    try {
      // Add the exhibition title if available
      const formDataWithExhibition = {
        ...businessMissionFormData,
        exhibition: selectedExhibition?.title
      };
      
      // Use the API endpoint
      const response = await fetch('/api/business-mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithExhibition),
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          success: true, 
          message: data.message || "Registration successful!" 
        });
        
        // Clear form after successful submission
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        // Handle error responses
        setFormStatus({ 
          success: false, 
          message: data.message || "An error occurred. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error submitting business mission form:", error);
      setFormStatus({ 
        success: false, 
        message: "An error occurred. Please try again." 
      });
    }
  };

  return (
    <section id="exhibitions" className="py-20 bg-primary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("exhibitions.title")}
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("exhibitions.subtitle")}
          </motion.p>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Бизнес-миссии */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-blue-500" />
                <h3 className="text-2xl font-bold">Business Missions</h3>
              </div>

              <div className="space-y-6">
                {businessMissions.map((mission) => (
                  <div
                    key={mission.id}
                    className="pb-6 border-b border-border last:border-0"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold">{mission.title}</h4>
                      <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm">
                        {mission.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {mission.location}
                    </p>
                    <button
                      onClick={() => openModal("business-mission", mission.id)}
                      className="bg-blue-500 hover:bg-opacity-90 text-white py-3 px-6 rounded-md font-medium transition-all"
                    >
                      Register interest
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Выставки Vietbuild */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-green-500" />
                <h3 className="text-2xl font-bold">Vietbuild Exhibitions</h3>
              </div>

              <div className="space-y-6">
                {vietbuildExhibitions.map((exhibition) => (
                  <div
                    key={exhibition.id}
                    className="pb-6 border-b border-border last:border-0"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold">
                        {exhibition.title}
                      </h4>
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">
                        {exhibition.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {exhibition.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openModal("visitor", exhibition.id)}
                        className="bg-blue-500 hover:bg-opacity-90 text-white py-3 px-6 rounded-md font-medium transition-all"
                      >
                        Register as visitor
                      </button>
                      <span className="mx-2 text-slate-400">|</span>
                      <button
                        onClick={() => openModal("participant", exhibition.id)}
                        className="bg-green-500 hover:bg-opacity-90 text-white py-3 px-6 rounded-md font-medium transition-all"
                      >
                        Participate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Модальные окна */}
        <AnimatePresence>
          {activeModal?.type === "visitor" && selectedExhibition && (
            <VisitorForm
              key="visitor-form"
              isOpen={true}
              onClose={closeModal}
              formData={visitorFormData}
              onChange={handleVisitorChange}
              onSubmit={handleVisitorSubmit}
              selectedExhibition={selectedExhibition}
              formStatus={formStatus}
            />
          )}

          {activeModal?.type === "participant" && selectedExhibition && (
            <ParticipantForm
              key="participant-form"
              isOpen={true}
              onClose={closeModal}
              formData={participantFormData}
              onChange={handleParticipantChange}
              onSubmit={handleParticipantSubmit}
              selectedExhibition={selectedExhibition}
              formStatus={formStatus}
            />
          )}

          {activeModal?.type === "business-mission" && (
            <BusinessMissionForm
              isOpen={true}
              onClose={closeModal}
              onSubmit={handleBusinessMissionSubmit}
              formData={businessMissionFormData}
              onChange={handleBusinessMissionChange}
              formStatus={formStatus}
              selectedExhibition={selectedExhibition}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
