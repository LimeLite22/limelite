import {
  CalendarType,
  HOME_RENTAL,
  NO,
  OWN_ADDRESS,
  STUDIO_RENTAL,
  YES,
} from "pages/NewRequest/consts";

export type IOption = {
  id: string;
  text: string;
  value: string;
  credits: number | "TBD";
  img: string;
};
export type ITravel = {
  selection: null | typeof YES | typeof NO;
  zoneCode: {
    name: string | null;
    value: number;
  };
};
export const DEFAULT = "default";
export const OWN_SCRIPT = "own script";
export const PROFESSIONAL_SCRIPT = "professional script";
export const QUESTIONS_AUTHOR_CLIENT = 'client';
export const QUESTIONS_AUTHOR_PROFESSIONAL = 'professional';
export  const QUESTIONS_ON_LOCATION = 'questions on location';
export  const QUESTIONS_VIRTUALLY = 'questions virtualy';
export  const VIRTUAL_INTERVIEW = 'virtual interview';

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
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
export interface ILocation {
  type:
    | typeof DEFAULT
    | typeof OWN_ADDRESS
    | typeof STUDIO_RENTAL
    | typeof HOME_RENTAL;
  street: string;
  company: string;
  city: string;
  state: string;
  zip: string;
}
export interface TimeItem {
  id: string;
  hour: number;
  type: string;
  isAvailable: boolean;
  isAddon: boolean;
}
export type TimeValue = typeof DEFAULT | TimeItem;
export type IScriptWriter = typeof PROFESSIONAL_SCRIPT | typeof OWN_SCRIPT |  typeof DEFAULT ;
export interface IPerson {
  id: string;
  name: string;
  title: string;
}
type InterviewSettings = {
  questionsAuthor: typeof QUESTIONS_AUTHOR_CLIENT | typeof QUESTIONS_AUTHOR_PROFESSIONAL | typeof DEFAULT;
  questionsAuthorProfSettings: {
    subject: string;
    phone:number | '';
    email: string;
    text: string;
  };
  questionsAuthorOwnSettings: {
    text: string;
  };
  persons: IPerson[];
  questionSettings: {
    type: typeof QUESTIONS_ON_LOCATION | typeof QUESTIONS_VIRTUALLY | typeof VIRTUAL_INTERVIEW | typeof DEFAULT;
    locationSettings: {
      name: string;
      phone:number | '';
      email: string;
    };
    virtualSettings: {
      name: string;
      phone:number | '';
      email: string;
    };
  };
};
export interface IRequest {
  id: string;
  option: undefined | IOption;
  projectName: string;
  targetAudience: string;
  projectType: ProjectType | string;
  projectTone: ProjectTone | string;
  approachList: string[];
  travel: ITravel;
  location: ILocation;
  preferredDate: {
    date: typeof DEFAULT | Value;
    time: TimeValue;
  };
  isAlternate: boolean;
  alternateDate: {
    date: typeof DEFAULT | Value;
    time: TimeValue;
  };
  scriptSettings:{
    scriptWriter: IScriptWriter;
    name:string ;
    phone:number | '';
    email:string;
    profText: string;
    ownText:string;
    teleprompter: boolean | typeof DEFAULT;
    persons:IPerson[] 
  }
  interviewSettings: InterviewSettings;
}
export interface IRequestState {
  selectedRequest: string;
  drafts: IRequest[];
}
export type IOptionsList = IOption[];

export interface TileClassNameProps {
  date: Value;
  view: string;
  today: Date;
}
export interface ICalendarProps {
  date: Value;
  time: TimeValue;
  onChange: (date: Value, time: TimeValue) => void;
  type: CalendarType;
}

export type LocationType =
  | null
  | typeof OWN_ADDRESS
  | typeof HOME_RENTAL
  | typeof STUDIO_RENTAL;

export interface IStudioRentalProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddressProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
}

export interface IHomeRentalProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

