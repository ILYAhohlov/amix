import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { VietbuildExhibitionType, BusinessMissionType } from "../data/exhibitiondata";
import { parse, format, eachDayOfInterval } from "date-fns";

type Exhibition = VietbuildExhibitionType | BusinessMissionType;

interface VisitorFormData {
  name: string;
  email: string;
  country: string;
  visitDate: string;
  purpose: string;
  logistics: string;
  comments: string;
}

interface VisitorFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VisitorFormData;
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
const purposes = ["Find suppliers", "Explore investment opportunities", "Networking", "Learn about the market", "Other"];

const generateVisitDates = (dateRange: string): string[] => {
  const [startDateStr, endDateStr] = dateRange.split(" - ");
  const [startMonthDay, year] = startDateStr.split(", ");
  const startDate = parse(`${startMonthDay}, ${year}`, "MMMM d, yyyy", new Date());
  const endDate = parse(endDateStr, "MMMM d, yyyy", new Date());
  const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });
  return dateInterval.map((date) => format(date, "d MMMM"));
};

export default function VisitorForm({ isOpen, onClose, formData, onChange, onSubmit, selectedExhibition }: VisitorFormProps) {
  const { t } = useTranslation();
  const visitDates = selectedExhibition ? generateVisitDates(selectedExhibition.date) : [];

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
          {t("exhibitions.visitorFormTitle")} {selectedExhibition?.title || ""}
        </h3>
        <form
          action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdGDienJE21gE2XGAumDy4wz5pwsI4DezEW1_eV8mVww7stIQ/formResponse"
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
              name="entry.365134092" // Поле "Name"
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
              name="entry.1856306760" // Поле "Email"
              value={formData.email}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              placeholder={t("exhibitions.emailPlaceholder")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="country">
              {t("exhibitions.country")}
            </label>
            <select
              id="country"
              name="entry.2040582318" // Поле "Country"
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
            <label className="block text-slate-300 mb-2" htmlFor="visitDate">
              {t("exhibitions.visitDate")}
            </label>
            <select
              id="visitDate"
              name="entry.1359636706" // Поле "Preferred Visit Date"
              value={formData.visitDate}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              required
            >
              <option value="" disabled>
                {t("exhibitions.selectDate")}
              </option>
              {visitDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="purpose">
              {t("exhibitions.purpose")}
            </label>
            <select
              id="purpose"
              name="entry.1804587920" // Поле "Purpose of Visit"
              value={formData.purpose}
              onChange={onChange}
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              required
            >
              <option value="" disabled>
                {t("exhibitions.selectPurpose")}
              </option>
              {purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
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
                  name="entry.1989497137" // Поле "Do you need assistance with logistics?"
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
                  name="entry.1989497137"
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
              name="entry.1471042450" // Поле "Additional Comments"
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
            </,button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
