import { Ship, Building, Laptop, Handshake, ShoppingCart, Megaphone } from "lucide-react";

// Fix the icon type definition to work with Lucide icons
export interface ServiceType {
  id: string;
  title: string;
  subtitle: string;
  icon: any; // Using 'any' here to accommodate Lucide icons
  shortDescription: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export const services: ServiceType[] = [
  {
    id: "import-export",
    title: "Import/Export",
    subtitle: "Global Trade Made Simple",
    icon: Ship,
    shortDescription: "Seamless international trade solutions connecting global markets.",
    description: "AMIX International Group facilitates seamless international trade between ASEAN countries and global markets. Our import/export services include:",
    imageUrl: "https://images.unsplash.com/photo-1577791465485-b80039b4d69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Trade compliance and customs regulations management",
      "Supply chain optimization and logistics solutions",
      "Market research and international trade strategy",
      "Documentation and regulatory compliance assistance"
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "Premium Property Solutions",
    icon: Building,
    shortDescription: "Premium property opportunities in Vietnam's growing market.",
    description: "AMIX International Group offers comprehensive real estate services in Vietnam's growing market, helping investors and businesses find the perfect property solutions:",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Commercial and residential property acquisition",
      "Real estate investment consulting and market analysis",
      "Property management and development opportunities",
      "Legal guidance for foreign investors in Vietnamese real estate"
    ]
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    subtitle: "Innovative Technology Services",
    icon: Laptop,
    shortDescription: "Cutting-edge technology services for businesses of all sizes.",
    description: "AMIX International Group delivers cutting-edge IT solutions tailored to your business needs in the ASEAN region:",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Custom software development and integration",
      "Cloud infrastructure and digital transformation",
      "IT outsourcing and managed services",
      "Cybersecurity and data protection solutions"
    ]
  },
  {
    id: "strategic-partnership",
    title: "Strategic Partnership",
    subtitle: "Building Business Alliances",
    icon: Handshake,
    shortDescription: "Building valuable business relationships across ASEAN markets.",
    description: "AMIX International Group helps businesses establish strategic partnerships across the ASEAN region, expanding your network and opportunities:",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Partner identification and matchmaking services",
      "Joint venture and collaboration facilitation",
      "Due diligence and partner verification",
      "Long-term partnership management and support"
    ]
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    subtitle: "Digital Retail Excellence",
    icon: ShoppingCart,
    shortDescription: "Digital retail solutions and marketplace integration services.",
    description: "AMIX International Group provides comprehensive e-commerce solutions to help your business thrive in the digital marketplace:",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "E-commerce platform development and optimization",
      "Marketplace integration and management",
      "Cross-border e-commerce solutions",
      "Digital payment and logistics coordination"
    ]
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Local Market Expertise",
    icon: Megaphone,
    shortDescription: "Tailored marketing strategies for the Vietnamese marketplace.",
    description: "AMIX International Group develops targeted marketing strategies to help your business connect with the Vietnamese and ASEAN markets:",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Localized digital marketing campaigns",
      "Brand development and positioning",
      "Market research and competitive analysis",
      "Social media and content marketing strategies"
    ]
  }
];
