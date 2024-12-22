import {
  ADD_ONS,
  HOME,
  INSPIRATION,
  LEARN,
  NEW_REQUEST,
  NOTIFICATIONS,
  PROJECTS,
  SETTINGS,
  SUPPORT,
  WELCOME,
} from "consts/consts";

export type selectedPages =
  | typeof WELCOME
  | typeof NEW_REQUEST
  | typeof PROJECTS
  | typeof LEARN
  | typeof ADD_ONS
  | typeof NOTIFICATIONS
  | typeof SETTINGS
  | typeof SUPPORT
  | typeof INSPIRATION;

export type selectedMobPages =
  | typeof HOME
  | typeof PROJECTS
  | typeof LEARN
  | typeof NOTIFICATIONS;

export type ProjectTone =
  | "Adventurous"
  | "Casual"
  | "Cinematic"
  | "Dramatic"
  | "Educational"
  | "Emotional"
  | "Humorous"
  | "Inspirational"
  | "Professional"
  | "Urgent";
export type ProjectType =
  | "Announcement Videos"
  | "Company Overview Video"
  | "Demo Video"
  | "Drone Video"
  | "Educational Video"
  | "Event Recap Video"
  | "FAQ Video"
  | "Fundraising Video"
  | "HR/Recruiting Video"
  | "Hype/Sizzle Video"
  | "Interview"
  | "Onboarding Video"
  | "Photography"
  | "Product & Service Video"
  | "Social Media Video"
  | "Television Commercial"
  | "Testimonial/Case Study Video"
  | "Videography"
  | "Website Header Video"
  | "Other";

export type CalendarType = "time" | "date" | "schedule";


export type ApproachValue = 'No Approach' | "Candid Interview Approach" | "Scripted Delivery Approach" | "Voiceover Approach";

export type AddOnsValueType = "NO_ADD_ONS" 
| "PROFF_ACTOR_ADD_ON" | "SECOND_CAMERA_ADD_ON" 
| "CUSTOM_LOGO_ADD_ON" | "MAKE_UP_ARTIST_ADD_ON" 
| "CANDID_FOTO_ADD_ON" | "DRONE_PILOT_ADD_ON";


export type stepType =  'new-request/project' | 'new-request/logistics' | 'new-request/script' | 'new-request/interview' | 'new-request/voiceover' | 'new-request/video-edit' | 'new-request/add-ons' | 'new-request/submit' | 'new-request/final';
