import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { VietbuildExhibitionType, BusinessMissionType } from "../data/exhibitiondata";

type Exhibition = VietbuildExhibitionType | BusinessMissionType;

interface ParticipantFormData {
  name: string;
  email: string;
  company: string;
  country: string;
  participationType: string;
  industry: string;
  registrationAssistance: string;
  logistics: string;
  comments: string;
}

interface ParticipantFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ParticipantFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedExhibition?: Exhibition;
}

const modalVariants = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100vh" },
};

const countries = ["Russia", "USA", "Germany", "Singapore", "Other"];
const participationTypes = ["Exhibition Booth", "Seminar Speaker", "Sponsor", "Other"];
const industries = ["Construction Materials", "Furniture", "Interior Design", "Real Estate", "Other"];

export default function ParticipantForm({ isOpen, onClose, formData, onChange, onSubmit, selectedExhibition }: ParticipantFormProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        className="glass p-6 rounded-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-montserrat font-bold mb-4 text-white">
          {t("exhibitions.participantFormTitle")} {selectedExhibition?.title || ""}
        </h3>
        <form
          action="https://docs.google.com/forms/u/0/d/e/ВАШ_ФОРМ_ИД_ДЛЯ_PARTICIPANT/formResponse" // Вставьте URL для Participant формы
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="name">
              {t("exhibitions.name")}
            </label>
            <input
              type="text"
              id="name"
              name="entry.655585087" // Поле "Name"
              value={formData.name}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              placeholder={t("exhibitions.namePlaceholder")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="email">
              {t("exhibitions.email")}
            </label>
            <input
              type="email"
              id="email"
              name="entry.2004902922" // Поле "Email"
              value={formData.email}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              placeholder={t("exhibitions.emailPlaceholder")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="company">
              {t("exhibitions.companyName")}
            </label>
            <input
              type="text"
              id="company"
              name="entry.881007108" // Поле "Company Name"
              value={formData.company}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              placeholder={t("exhibitions.companyPlaceholder")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="country">
              {t("exhibitions.country")}
            </label>
            <select
              id="country"
              name="entry.660883204" // Поле "Country"
              value={formData.country}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              required
            >
              <option value="" disabled>
                {t("exhibitions.selectCountry")}
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="participationType">
              {t("exhibitions.participationType")}
            </label>
            <select
              id="participationType"
              name="entry.1224484089" // Поле "Type of Participation"
              value={formData.participationType}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              required
            >
              <option value="" disabled>
                {t("exhibitions.selectParticipationType")}
              </option>
              {participationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="industry">
              {t("exhibitions.industry")}
            </label>
            <select
              id="industry"
              name="entry.839202658" // Поле "Industry"
              value={formData.industry}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              required
            >
              <option value="" disabled>
                {t("exhibitions.selectIndustry")}
              </option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2">
              {t("exhibitions.registrationAssistance")}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  id="registrationAssistance"
                  name="entry.493111081" // Поле "Do you need assistance with registration?"
                  value="Yes"
                  checked={formData.registrationAssistance === "Yes"}
                  onChange={onChange}
                  className="mr-2"
                  required
                />
                {t("exhibitions.yes")}
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  id="registrationAssistance"
                  name="entry.493111081"
                  value="No"
                  checked={formData.registrationAssistance === "No"}
                  onChange={onChange}
                  className="mr-2"
                />
                {t("exhibitions.no")}
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2">
              {t("exhibitions.logistics")}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  id="logistics"
                  name="entry.761130160" // Поле "Do you need assistance with logistics?"
                  value="Yes"
                  checked={formData.logistics === "Yes"}
                  onChange={onChange}
                  className="mr-2"
                />
                {t("exhibitions.yes")}
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  id="logistics"
                  name="entry.761130160"
                  value="No"
                  checked={formData.logistics === "No"}
                  onChange={onChange}
                  className="mr-2"
                />
                {t("exhibitions.no")}
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="comments">
              {t("exhibitions.comments")}
            </label>
            <textarea
              id="comments"
              name="entry.1909238462" // Поле "Additional Comments"
              value={formData.comments}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              placeholder={t("exhibitions.commentsPlaceholder")}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary font-montserrat"
            >
              {t("exhibitions.close")}
            </button>
            <button type="submit" className="btn-primary font-montserrat">
              {t("exhibitions.submit")}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
