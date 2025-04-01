export interface BusinessMissionType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface VietbuildExhibitionType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export const businessMissions: BusinessMissionType[] = [
  {
    id: "AISC2025",
    title: "AISC 2025",
    date: "March 12-16, 2025",
    location: "Hanoi International Convention Center",
    description: "Innovating Futures: Bridging AI & Semiconductors Globally"
  },
  {
    id: "VIETNAMEXPO",
    title: "VIETNAM EXPO",
    date: "Apr 02-05, 2025",
    location: "Hanoi International Exhibition Center",
    description: "The 34th Vietnam International Trade Fair"
  },
  {
    id: "SaigonFabric2025",
    title: "Saigon Fabric 2025",
    date: "Apr 09-12, 2025",
    location: "SECC, Hochiminh City, Vietnam",
    description: "Vietnam Saigon Fabric & Garment Accessories Expo"
  }
];

export const vietbuildExhibitions: VietbuildExhibitionType[] = [
  {
    id: "vietbuild-hanoi",
    title: "Vietbuild Hanoi",
    date: "May 29- June 01, 2025",
    location: "National Exhibition Construction Center",
    description: "Construction materials, real estate, interior-exterior decoration."
  },
  {
    id: "vietbuild-danang",
    title: "Vietbuild Da Nang",
    date: "May 14-18, 2025",
    location: "Da Nang Exhibition Fair Center",
    description: "Coastal development, tourism real estate opportunities."

  },
  {
    id: "vietbuild-hcm",
    title: "Vietbuild Ho Chi Minh",
    date: "June 25-29, 2025",
    location: "Saigon Exhibition and Convention Center",
    description: "Smart home technology, sustainable building materials."    
  }
];
