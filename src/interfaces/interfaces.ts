import { ApproachValue, CalendarType, ProjectTone, stepType } from "types/types";

import {
  BASIC_THUMBNAIL,
  CUSTOM_THUMBNAIL,
  DEFAULT,
  HOME_RENTAL,
  LESS_1_30,
  LESS_2_00,
  LESS_2_30,
  LESS_3_00,
  LESS_15,
  LESS_30,
  LESS_60,
  MORE_3_00,
  N0_THUMBNAIL,
  NO,
  OWN_ADDRESS,
  OWN_SCRIPT,
  PROFESSIONAL_SCRIPT,
  QUESTIONS_AUTHOR_CLIENT,
  QUESTIONS_AUTHOR_PROFESSIONAL,
  QUESTIONS_ON_LOCATION,
  QUESTIONS_VIRTUALLY,
  RUSH_TIME,
  STANDARD_TIME,
  STUDIO_RENTAL,
  TRACK_AUTHOR_CLIENT,
  TRACK_AUTHOR_PROFESSIONAL,
  VIDEO_SQUARE,
  VIDEO_STANDARD,
  VIDEO_STORY,
  VIDEO_VERTICAL,
  VIRTUAL_INTERVIEW,
  YES,
  SHOOT_EDIT,
  SHOOT_ONLY,
  EDIT_ONLY,
  OTHER,
} from "consts/consts";

export type IOption = {
  id: string;
  text: string;
  value: typeof SHOOT_EDIT | typeof SHOOT_ONLY | typeof EDIT_ONLY | typeof OTHER;
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

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

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
export interface AddOnsValue {
  id:string,
  value: string,
  header: string,
  subHeader: string,
  description: string,
  isSelected: boolean,
  price: number
}

export interface IProjectTypeInfo {
  id: string,
  header: string,
  subHeader: string,
  description: string,
  price: number,
  addOns: AddOnsValue[]
}


export interface TimeItem {
  id: string;
  hour: number;
  type: string;
  isAvailable: boolean;
  isAddon: boolean;
}
export type TimeValue = typeof DEFAULT | TimeItem;
export type IScriptWriter =
  | typeof PROFESSIONAL_SCRIPT
  | typeof OWN_SCRIPT
  | typeof DEFAULT;
export interface IPerson {
  id: string;
  name: string;
  title: string;
}
export type IVideoDuration =
  | typeof DEFAULT
  | typeof LESS_15
  | typeof LESS_30
  | typeof LESS_30
  | typeof LESS_60
  | typeof LESS_1_30
  | typeof LESS_2_00
  | typeof LESS_2_30
  | typeof LESS_3_00
  | typeof MORE_3_00;
export interface IAdditionalVideoFormat {
  id: string;
  format:
  | typeof DEFAULT
  | typeof VIDEO_STANDARD
  | typeof VIDEO_STORY
  | typeof VIDEO_SQUARE
  | typeof VIDEO_VERTICAL;
  duration: IVideoDuration;
}
type InterviewSettings = {
  questionsAuthor:
  | typeof QUESTIONS_AUTHOR_CLIENT
  | typeof QUESTIONS_AUTHOR_PROFESSIONAL
  | typeof DEFAULT;
  questionsAuthorProfSettings: {
    subject: string;
    phone: number | "";
    email: string;
    text: string;
  };
  questionsAuthorOwnSettings: {
    text: string;
  };
  persons: IPerson[];
  questionSettings: {
    type:
    | typeof QUESTIONS_ON_LOCATION
    | typeof QUESTIONS_VIRTUALLY
    | typeof VIRTUAL_INTERVIEW
    | typeof DEFAULT;
    locationSettings: {
      name: string;
      phone: number | "";
      email: string;
    };
    virtualSettings: {
      name: string;
      phone: number | "";
      email: string;
    };
  };
};

export interface IRequest {
  id: string;
  option: undefined | IOption;
  projectName: string;
  targetAudience: string;
  projectType: IProjectTypeInfo;
  projectTone: ProjectTone | string;
  approachList: ApproachValue[];
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
  scriptSettings: {
    scriptWriter: IScriptWriter;
    name: string;
    phone: number | "";
    email: string;
    profText: string;
    ownText: string;
    teleprompter: boolean | typeof DEFAULT;
    persons: IPerson[];
  };
  interviewSettings: InterviewSettings;
  voiceTrackSettings: {
    trackAuthor:
    | typeof TRACK_AUTHOR_CLIENT
    | typeof TRACK_AUTHOR_PROFESSIONAL
    | typeof DEFAULT;
    track: File | typeof DEFAULT;
    scriptAuthor: IScriptWriter;
    scriptAuthorProfSettings: {
      subject: string;
      phone: number | "";
      email: string;
      text: string;
    };
    scriptAuthorOwnSettings: {
      text: string;
    };
  };
  videoSettings: {
    format:
    | typeof VIDEO_STANDARD
    | typeof VIDEO_STORY
    | typeof VIDEO_SQUARE
    | typeof VIDEO_VERTICAL
    | typeof DEFAULT;
    targetDuration: IVideoDuration;
    captions: boolean;
    thumbnail:
    | typeof N0_THUMBNAIL
    | typeof BASIC_THUMBNAIL
    | typeof CUSTOM_THUMBNAIL
    | typeof DEFAULT;
    additionalFormats: boolean | typeof DEFAULT;
    selectedAdditionalFormats: IAdditionalVideoFormat[];
    additionalVisualAssets: boolean | typeof DEFAULT;
    additionalVisualAssetFile: File | typeof DEFAULT;
    additionalVisualAssetUrl: string;

    resultTime: typeof RUSH_TIME | typeof STANDARD_TIME | typeof DEFAULT;
  };
}
export interface IRequestState {
  selectedRequest: string;
  stepsList: stepType[];
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
