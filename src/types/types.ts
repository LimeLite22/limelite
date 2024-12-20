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