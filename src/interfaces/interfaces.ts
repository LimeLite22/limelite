import { RequestStatusType, TApproachValue, TLocation, TOption, TPerson, TProjectTone, TQuestionAuthor, TQuestionLocation, TRush, TScriptWriter, TStep, TTextStatus, TThumbnail, TTimeValue, TTravel, TValue, TVideo, TVideoDuration, TVoiceAuthor } from "types/types";

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
export interface IInterviewSettings {
  questionsAuthor: TQuestionAuthor;
  questionsAuthorProfSettings: {
    subject: string;
    phone: number | "";
    email: string;
    backgroundInfo: string;
  };
  questionsAuthorOwnSettings: {
    scriptStatus: TTextStatus;
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
export interface IScriptedDeliverySettings {
  teleprompter: boolean | 'default';
  persons: TPerson[];
}
export interface IScriptSettings {
  scriptWriter: TScriptWriter;
  scriptText: string;
  scriptStatus: TTextStatus;
  name: string;
  phone: number | "";
  email: string;
  backgroundInfo: string;
}

export interface ITileClassNameProps {
  date: Date;
  view: string;
}
export interface ICalendarProps {
  onClose: () => void;
  isPreferredDate: boolean;
  isOpened: boolean;
  onChange?: (date: Date) => void;
}
export interface IProjectInfoSettings {
  option: undefined | TOption;
  name: string;
  targetAudience: string;
  type: IProjectTypeInfo;
  projectTone: TProjectTone | string;
  approachList: TApproachValue[];
  details: string;
}
export interface ILogisticSettings {
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
  safetyEquipment: boolean | 'default';
  safetyEquipmentDescription: string;
}
export interface IVoiceoverSettings {
  trackAuthor: TVoiceAuthor;
  track: File | 'default';
}
export interface IVideoSettings {
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
  time: {
    name: string | null;
    value: number;
  };
}
interface IPerson {
  id: string,
  name: string,
  lastName: string,
  email: string,
  foto: string
}
export interface IOverviewInfoSettings {
  status: RequestStatusType,
  reviewLink: string,
  downloadLink: string,
  requester: IPerson,
  contributors: IPerson[],
  projectStartImage: string,
  credits: number,
  requestDate: Date,
  shootDate: Date,
  editDate: Date,
  completeDate: Date,
  completnessPercent: number
}
export interface IRequest {
  id: string;
  overviewInfoSettings: IOverviewInfoSettings;
  projectInfoSettings: IProjectInfoSettings,
  logisticSettings: ILogisticSettings;
  scriptSettings: IScriptedDeliverySettings;
  interviewSettings: IInterviewSettings;
  voiceTrackSettings: IVoiceoverSettings;
  videoSettings: IVideoSettings;
  script: IScriptSettings
}
export interface IRequestState {
  selectedRequest: string;
  stepsList: TStep[];
  drafts: IRequest[];
  editDraft: IRequest
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
