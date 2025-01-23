import { TApproachValue, TCalendarType, TOption, TPerson, IScriptWriter, TTravel, TVideoDuration, TProjectTone, TStep, TTimeValue, TValue, TLocation, TVideo, TQuestionAuthor, TQuestionLocation, TVoiceAuthor, TThumbnail, TRush } from "types/types";

export interface ILocation {
  type: TLocation;
  street: string;
  company: string;
  city: string;
  state: string;
  zip: string;
}
export interface IAddOnsValue {
  id: string,
  value: string,
  header: string,
  subHeader: string,
  description: string,
  isSelected: boolean,
  price: number
}
export interface IProjectTypeInfo {
  id: string,
  img: string,
  header: string,
  subHeader: string,
  description: string,
  price: number,
  addOns: IAddOnsValue[]
}
export interface ITimeItem {
  id: string;
  hour: number;
  type: string;
  isAvailable: boolean;
  isAddon: boolean;

}
export interface IAdditionalVideoFormat {
  id: string;
  format: TVideo;
  duration: TVideoDuration;
}
 interface IInterviewSettings {
  questionsAuthor: TQuestionAuthor;
  questionsAuthorProfSettings: {
    subject: string;
    phone: number | "";
    email: string;
    text: string;
  };
  questionsAuthorOwnSettings: {
    text: string;
  };
  persons: TPerson[];
  questionSettings: {
    type: TQuestionLocation;
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

export interface ITileClassNameProps {
  date: Date;
  view: string;
}
export interface ICalendarProps {
  onClose: () => void;
  isPreferredDate: boolean;
  isOpened: boolean;
}
export interface IRequest {
  id: string;
  option: undefined | TOption;
  projectName: string;
  targetAudience: string;
  projectType: IProjectTypeInfo;
  projectTone: TProjectTone | string;
  approachList: TApproachValue[];
  travel: TTravel;
  location: ILocation;
  preferredDate: {
    date: 'default' | TValue;
    time: TTimeValue;
  };
  isAlternate: boolean;
  alternateDate: {
    date: 'default' | TValue;
    time: TTimeValue;
  };
  scriptSettings: {
    scriptWriter: IScriptWriter;
    name: string;
    phone: number | "";
    email: string;
    profText: string;
    ownText: string;
    teleprompter: boolean | 'default';
    persons: TPerson[];
  };
  interviewSettings: IInterviewSettings;
  voiceTrackSettings: {
    trackAuthor: TVoiceAuthor;
    track: File | 'default';
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
    format: TVideo;
    targetDuration: TVideoDuration;
    captions: boolean;
    thumbnail: TThumbnail;
    additionalFormats: boolean | 'default';
    selectedAdditionalFormats: IAdditionalVideoFormat[];
    additionalVisualAssets: boolean | 'default';
    additionalVisualAssetFile: File | 'default';
    additionalVisualAssetUrl: string;
    resultTime: TRush;
  };
}
export interface IRequestState {
  selectedRequest: string;
  stepsList: TStep[];
  drafts: IRequest[];
}
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
