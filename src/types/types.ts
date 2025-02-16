import { ITimeItem } from "interfaces/interfaces";

export type TSelectedPages =
  | "Welcome"
  | "New Request"
  | "Projects"
  | "Learn"
  | "Add ons"
  | "Notifications"
  | "Settings"
  | "Support"
  | "Inspiration";

export type TSelectedMobPages =
  | "Home"
  | "Projects"
  | "Learn"
  | "Notifications";

export type TProjectTone =
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
// export type Ttype =
//   | "Announcement Videos"
//   | "Company Overview Video"
//   | "Demo Video"
//   | "Drone Video"
//   | "Educational Video"
//   | "Event Recap Video"
//   | "FAQ Video"
//   | "Fundraising Video"
//   | "HR/Recruiting Video"
//   | "Hype/Sizzle Video"
//   | "Interview"
//   | "Onboarding Video"
//   | "Photography"
//   | "Product & Service Video"
//   | "Social Media Video"
//   | "Television Commercial"
//   | "Testimonial/Case Study Video"
//   | "Videography"
//   | "Website Header Video"
//   | "Other";

export type TCalendarType = "time" | "date" | "schedule";


export type TApproachValue = 'No Approach' | "Candid Interview Approach" | "Scripted Delivery Approach" | "Voiceover Approach";


export type TStep = 'new-request/project' | 'new-request/logistics' | 'new-request/script' | 'new-request/interview' | 'new-request/voiceover' | 'new-request/video-edit' | 'new-request/add-ons' | 'new-request/submit' | 'new-request/final';

export type TFilterMenu = 'filter start' | 'filter video type' | 'filter request type' | 'filter requested by' | 'filter status';


export type TOption = {
  id: string;
  text: string;
  value: "Shoot + Edit" | "Shoot only" | "Edit only" | "Other";
  credits: number;
  img: string;
};

export type TTravel = {
  selection: null | "Yes" | "No";
  zoneCode: {
    name: string | null;
    value: number;
  };
};

type ValuePiece = Date | null;

export type TValue = ValuePiece | [ValuePiece, ValuePiece];

export type TTimeValue = "default" | ITimeItem;
export type TScriptWriter =
  | "Professional script"
  | "Own script"
  | "default";
export interface TPerson {
  id: string;
  name: string;
  title: string;
}
export type TVideoDuration = "default" | "≤ :15" | "≤ :30" | "≤ :60" | "≤ 1:30" | "≤ 2:00" | "≤ 2:30" | "≤ 3:00" | "> 3:00";
export type TOptionsList = TOption[];

export type TSelection = 'Yes' | 'No';
export type TLocation = "default" | "Own Address" | "Studio Rental" | "Home Rental";
export type TVideo = "default" | "Standard" | "Story" | "Square" | "Vertical";
export type TQuestionAuthor = "default" | "Client" | "Professional Author";
export type TQuestionLocation = "default" | "Questions on location" | "Questions virtually" | "Virtual interview";
export type TVoiceAuthor = "default" | "Own track" | "Professional track";
export type TThumbnail = "default" | "Custom thumbnail" | "Basic thumbnail" | "No thumbnail";
export type TRush = "Rush time" | "Standard time" | "default";
export type TTextStatus = 'default' | 'Approved' | 'In Progress' | 'Unavailable';
export type TDraftFieldUpdate = {
  path: string;
  value: unknown;
};


export type TRange = 'Last week' | 'Current month' | 'Last 30 days' | 'Current year' | 'Last 12 months' |
  'default';

