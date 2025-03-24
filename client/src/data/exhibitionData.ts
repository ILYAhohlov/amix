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
    id: "asean-trade-forum",
    title: "ASEAN Trade Forum",
    date: "May 15-20, 2024",
    location: "Hanoi International Convention Center",
    description: "Connect with industry leaders and explore trade opportunities."
  },
  {
    id: "it-tech-expo",
    title: "IT & Technology Expo",
    date: "July 8-12, 2024",
    location: "Ho Chi Minh City",
    description: "Discover the latest tech innovations and networking opportunities."
  },
  {
    id: "real-estate-tour",
    title: "Real Estate Investment Tour",
    date: "Sept 10-15, 2024",
    location: "Multiple Cities",
    description: "Exclusive property viewings and investment opportunities."
  }
];

export const vietbuildExhibitions: VietbuildExhibitionType[] = [
  {
    id: "vietbuild-hanoi",
    title: "Vietbuild Hanoi",
    date: "April 22-26, 2024",
    location: "National Exhibition Construction Center",
    description: "Construction materials, real estate, interior-exterior decoration."
  },
  {
    id: "vietbuild-hcm",
    title: "Vietbuild Ho Chi Minh",
    date: "June 19-23, 2024",
    location: "Saigon Exhibition and Convention Center",
    description: "Smart home technology, sustainable building materials."
  },
  {
    id: "vietbuild-danang",
    title: "Vietbuild Da Nang",
    date: "August 7-11, 2024",
    location: "Da Nang Exhibition Fair Center",
    description: "Coastal development, tourism real estate opportunities."
  }
];
