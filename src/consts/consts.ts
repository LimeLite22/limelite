import { EditOnlyIcon, OtherIcon, ShootEditIcon, ShootOnlyIcon } from "assets/images";
import { IOptionsList, TimeItem } from "interfaces/interfaces";
import { generateUniqueId } from "utils/generateId";

// sidebar consts
export const WELCOME = "Welcome";
export const HOME = "Home";
export const NEW_REQUEST = "New Request";
export const PROJECTS = "Projects";
export const LEARN = "Learn";
export const ADD_ONS = "Add ons";
export const INSPIRATION = "Inspiration";
export const NOTIFICATIONS = "Notifications";
export const SETTINGS = "Settings";
export const SUPPORT = "Support";

// video formats
export const VIDEO_STANDARD = 'standard';
export const VIDEO_STORY = 'story';
export const VIDEO_SQUARE = 'square';
export const VIDEO_VERTICAL = 'vertical';

export const N0_THUMBNAIL = 'no thumbnail';
export const BASIC_THUMBNAIL = 'default thumbnail';
export const CUSTOM_THUMBNAIL = 'custom thumbnail';

export const RUSH_TIME = 'rush time';
export const STANDARD_TIME = 'standard time';

export const DEFAULT = "default";
export const OWN_SCRIPT = "own script";
export const PROFESSIONAL_SCRIPT = "professional script";
export const QUESTIONS_AUTHOR_CLIENT = 'client';
export const QUESTIONS_AUTHOR_PROFESSIONAL = 'professional';
export const QUESTIONS_ON_LOCATION = 'questions on location';
export const QUESTIONS_VIRTUALLY = 'questions virtualy';
export const VIRTUAL_INTERVIEW = 'virtual interview';
export const TRACK_AUTHOR_CLIENT = 'client';
export const TRACK_AUTHOR_PROFESSIONAL = 'professional';

export const optionsList: IOptionsList = [
    {
      id: generateUniqueId(),
      value: "Shoot + Edit",
      credits: 2,
      text: "We need LimeLite to Shoot+Edit this project",
      img: ShootEditIcon,
    },
    {
      id: generateUniqueId(),
      value: "Shoot only",
      credits: 1,
      text: "We only need LimeLite to Shoot this project",
      img: ShootOnlyIcon,
    },
  
    {
      id: generateUniqueId(),
      value: "Edit only",
      credits: 1,
      text: "We need LimeLite to Edit this project",
      img: EditOnlyIcon,
    },
    {
      id: generateUniqueId(),
      value: "Other",
      credits: "TBD",
      text: "We need assistance scheduling this project",
      img: OtherIcon,
    },
  ];
  export const YES = "yes";
  export const NO = "no";
  export const EMPTY = "empty";
  export const OWN_ADDRESS = 1;
  export const STUDIO_RENTAL = 2;
  export const HOME_RENTAL = 3;
  export const hoursList: TimeItem[] = [
    {
      id: generateUniqueId(),
      hour: 5,
      type: "AM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 6,
      type: "AM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 7,
      type: "AM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 8,
      type: "AM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 9,
      type: "AM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 10,
      type: "AM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 11,
      type: "AM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 12,
      type: "PM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 1,
      type: "PM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 2,
      type: "PM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 3,
      type: "PM",
      isAvailable: true,
      isAddon: false,
    },
    {
      id: generateUniqueId(),
      hour: 4,
      type: "PM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 5,
      type: "PM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 6,
      type: "PM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 7,
      type: "PM",
      isAvailable: true,
      isAddon: true,
    },
    {
      id: generateUniqueId(),
      hour: 8,
      type: "PM",
      isAvailable: true,
      isAddon: true,
    },
  ];
  export const options = [
    { id: 0, name: "Zone 1 (< 50 Miles): $0", value: 0, },
    {
      id: 1,
      name: "Zone 2 (51 - 150 Miles): $295",
      value: 295,
    },
    {
      id: 2,
      name: "Zone 3 (151 - 250 Miles): $695",
      value: 695,
    },
    {
      id: 3,
      name: "Zone 4 (251 - 500 Miles): $1,295",
      value: 1295,
    },
    {
      id: 4,
      name: "Zone 5 (501+ Miles): $1,495",
      value: 1495,
    },
  ];
  export const projectTypes = [
    "Announcement Videos",
    "Company Overview Video",
    "Demo Video",
    "Drone Video",
    "Educational Video",
    "Event Recap Video",
    "FAQ Video",
    "Fundraising Video",
    "HR/Recruiting Video",
    "Hype/Sizzle Video",
    "Interview",
    "Onboarding Video",
    "Photography",
    "Product & Service Video",
    "Social Media Video",
    "Television Commercial",
    "Testimonial/Case Study Video",
    "Videography",
    "Website Header Video",
    "Other",
  ];
  export const projectTones = [
    "Adventurous",
    "Casual",
    "Cinematic",
    "Dramatic",
    "Educational",
    "Emotional",
    "Humorous",
    "Inspirational",
    "Professional",
    "Urgent",
  ];
