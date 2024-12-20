import { IAddOnsItem, IOptionsList, IVideoDuration, TimeItem } from "interfaces/interfaces";

import {
  EditOnlyIcon,
  OtherIcon,
  ShootEditIcon,
  ShootOnlyIcon,
} from "assets/images";

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
export const VIDEO_STANDARD = "standard";
export const VIDEO_STORY = "story";
export const VIDEO_SQUARE = "square";
export const VIDEO_VERTICAL = "vertical";

export const N0_THUMBNAIL = "no thumbnail";
export const BASIC_THUMBNAIL = "default thumbnail";
export const CUSTOM_THUMBNAIL = "custom thumbnail";

export const RUSH_TIME = "rush time";
export const STANDARD_TIME = "standard time";

export const DEFAULT = "default";
export const OWN_SCRIPT = "own script";
export const PROFESSIONAL_SCRIPT = "professional script";
export const QUESTIONS_AUTHOR_CLIENT = "client";
export const QUESTIONS_AUTHOR_PROFESSIONAL = "professional";
export const QUESTIONS_ON_LOCATION = "questions on location";
export const QUESTIONS_VIRTUALLY = "questions virtualy";
export const VIRTUAL_INTERVIEW = "virtual interview";
export const TRACK_AUTHOR_CLIENT = "client";
export const TRACK_AUTHOR_PROFESSIONAL = "professional";


export const NO_ADD_ONS = "NO_ADD_ONS";
export const PROFF_ACTOR_ADD_ON = "PROFF_ACTOR_ADD_ON";
export const SECOND_CAMERA_ADD_ON = "SECOND_CAMERA_ADD_ON";
export const CUSTOM_LOGO_ADD_ON = "CUSTOM_LOGO_ADD_ON";
export const MAKE_UP_ARTIST_ADD_ON = "MAKE_UP_ARTIST_ADD_ON";
export const CANDID_FOTO_ADD_ON = "CANDID_FOTO_ADD_ON";
export const DRONE_PILOT_ADD_ON = "DRONE_PILOT_ADD_ON";


export const SHOOT_EDIT = "Shoot + Edit";
export const SHOOT_ONLY = "Shoot only";
export const EDIT_ONLY = "Edit only";
export const OTHER = "Other";


export const PROJECT_STEP = 'Project';
export const LOGISTICS_STEP = 'Logistics';
export const SCRIPT_STEP = 'Script';
export const INTERVIEW_STEP = 'Interview';
export const VOICEOVER_STEP = 'Voiceover';
export const VIDEO_EDIT_STEP = 'Video Edit';
export const ADD_ONS_STEP = 'Add-ons';

export const NO_APPROACH = 'No Approach';
export const CANDID_APPROACH = "Candid Interview Approach";
export const SCRIPTED_APPROACH = "Scripted Delivery Approach";
export const VOICEOVER_APPROACH = "Voiceover Approach";



export const ADD_ONS_LIST: IAddOnsItem[] = [
  {
    id: generateUniqueId(),
    value: NO_ADD_ONS,
    text: `We don't need any more`,
    title: 'Thank you, but we have everything we need for this project.',
    price: 0
  },
  {
    id: generateUniqueId(),
    value: PROFF_ACTOR_ADD_ON,
    text: `A professional actor`,
    title: `We'd like to book a professional actor for this project.`,
    price: 1350
  },
  {
    id: generateUniqueId(),
    value: SECOND_CAMERA_ADD_ON,
    text: `A second camera`,
    title: `We'd like our creator to have a second camera for this project.`,
    price: 395
  },
  {
    id: generateUniqueId(),
    value: CUSTOM_LOGO_ADD_ON,
    text: `A custom logo animation`,
    title: `We'd like LimeLite to create a logo animation for this project.`,
    price: 895
  },
  {
    id: generateUniqueId(),
    value: MAKE_UP_ARTIST_ADD_ON,
    text: `A make-up artist`,
    title: `We'd like to book a professional make-up artist for this project.`,
    price: 600
  },
  {
    id: generateUniqueId(),
    value: CANDID_FOTO_ADD_ON,
    text: `Candid photography`,
    title: `We'd like to book a professional photographer for this project.`,
    price: 696
  },
  {
    id: generateUniqueId(),
    value: DRONE_PILOT_ADD_ON,
    text: `A professional drone pilot`,
    title: `We'd like a professional/FAA certified drone pilot for this project.`,
    price: 595
  },
]


export const optionsList: IOptionsList = [
  {
    id: generateUniqueId(),
    value: SHOOT_EDIT,
    credits: 2,
    text: "We need LimeLite to Shoot+Edit this project",
    img: ShootEditIcon,
  },
  {
    id: generateUniqueId(),
    value: SHOOT_ONLY,
    credits: 1,
    text: "We only need LimeLite to Shoot this project",
    img: ShootOnlyIcon,
  },

  {
    id: generateUniqueId(),
    value: EDIT_ONLY,
    credits: 1,
    text: "We need LimeLite to Edit this project",
    img: EditOnlyIcon,
  },
  {
    id: generateUniqueId(),
    value: OTHER,
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
export const zonesList = [
  { id: generateUniqueId(), name: "Zone 1 (< 50 Miles): $0", value: 0 },
  {
    id: generateUniqueId(),
    name: "Zone 2 (51 - 150 Miles): $295",
    value: 295,
  },
  {
    id: generateUniqueId(),
    name: "Zone 3 (151 - 250 Miles): $695",
    value: 695,
  },
  {
    id: generateUniqueId(),
    name: "Zone 4 (251 - 500 Miles): $1,295",
    value: 1295,
  },
  {
    id: generateUniqueId(),
    name: "Zone 5 (501+ Miles): $1,495",
    value: 1495,
  },
];

export const LESS_15 = "≤ :15";
export const LESS_30 = "≤ :30";
export const LESS_60 = "≤ :60";
export const LESS_1_30 = "≤ 1:30";
export const LESS_2_00 = "≤ 2:00";
export const LESS_2_30 = "≤ 2:30";
export const LESS_3_00 = "≤ 3:00";
export const MORE_3_00 = "> 3:00";

export const videoDurationsList: { id: string; value: IVideoDuration }[] = [
  {
    id: generateUniqueId(),
    value: LESS_15,
  },
  {
    id: generateUniqueId(),
    value: LESS_30,
  },
  {
    id: generateUniqueId(),
    value: LESS_60,
  },
  {
    id: generateUniqueId(),
    value: LESS_1_30,
  },
  {
    id: generateUniqueId(),
    value: LESS_2_00,
  },
  {
    id: generateUniqueId(),
    value: LESS_2_30,
  },
  {
    id: generateUniqueId(),
    value: LESS_3_00,
  },
  {
    id: generateUniqueId(),
    value: MORE_3_00,
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
