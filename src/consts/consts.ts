import {
  AnnouncementVideos,
  CompanyOverviewIcon,
  DemoVideosIcon,
  DroneIcon,
  EditOnlyIcon,
  EducationVideo,
  EventRecaps,
  FAQS,
  Fundrasing,
  HRRecruiting,
  HypeSizzle,
  Interviews,
  OnBoarding,
  OtherIcon,
  Photography,
  ProductServiceVideos,
  ShootEditIcon,
  ShootOnlyIcon,
  SocialMedia,
  TelevisionCommercials,
  TestimonialsCaseStudies,
  Videography,
  WebsiteHeaderVideos,
} from "assets/images";
import { IProjectTypeInfo, ITimeItem } from "interfaces/interfaces";
import { TOptionsList, TVideoDuration } from "types/types";
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
export const VIDEO_STANDARD = "Standard";
export const VIDEO_STORY = "Story";
export const VIDEO_SQUARE = "Square";
export const VIDEO_VERTICAL = "Vertical";

export const NO_THUMBNAIL = "No thumbnail";
export const BASIC_THUMBNAIL = "Basic thumbnail";
export const CUSTOM_THUMBNAIL = "Custom thumbnail";

export const RUSH_TIME = "rush time";
export const STANDARD_TIME = "standard time";

export const DEFAULT = "default";
export const OWN_SCRIPT = "Own script";
export const PROFESSIONAL_SCRIPT = "Professional script";
export const QUESTIONS_AUTHOR_CLIENT = "Client";
export const QUESTIONS_AUTHOR_PROFESSIONAL = "Professional Author";
export const QUESTIONS_ON_LOCATION = "Questions on location";
export const QUESTIONS_VIRTUALLY = "Questions virtually";
export const VIRTUAL_INTERVIEW = "Virtual interview";
export const TRACK_AUTHOR_CLIENT = "Own track";
export const TRACK_AUTHOR_PROFESSIONAL = "Professional track";


export const NO_ADD_ONS = "NO_ADD_ONS";
export const NO_ADD_ONS_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "NO_ADD_ONS",
  header: "No Add Ons",
  subHeader: "No Add Ons",
  description: ``,
  isSelected: false
}
export const IDEATION_SESSION_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "IDEATION_SESSION_ADD_ON",
  header: "Ideation Session",
  subHeader: "We will have an ideation session",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
}
export const PAID_TALENT_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "PAID_TALENT_ADD_ON",
  header: "Paid Talent",
  subHeader: "We will have a paid talent",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const HOST_PAID_TALENT_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "HOST_PAID_TALENT_ADD_ON",
  header: "Paid Talent",
  subHeader: "We will have a paid talent",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const MUA_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "MUA_ADD_ON",
  header: "MUA",
  subHeader: "We will have a MUA",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const GREEN_SCREEN_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "GREEN_SCREEN_ADD_ON",
  header: "Green Screen",
  subHeader: "We will have a Green Screen",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const SECOND_CAMERA_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "SECOND_CAMERA_ADD_ON",
  header: "Second Camera",
  subHeader: "We will have a Second Camera",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const SOCK_VIDEO_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "SOCK_VIDEO_ADD_ON",
  header: "Sock Video",
  subHeader: "We will have a Sock Video",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
}
export const ON_SET_PRODUCER_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "ON_SET_PRODUCER_ADD_ON",
  header: "On Set Producer",
  subHeader: "We will have a On Set Producer",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
}
export const RAW_FILE_DELIVERY_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "RAW_FILE_DELIVERY_ADD_ON",
  header: "Raw File Delivery",
  subHeader: "We will have a Raw File Delivery",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
}

export const DRONE_PILOT_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "DRONE_PILOT_ADD_ON",
  header: "Drone Pilot",
  subHeader: "We will have a Drone Pilot",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
}
export const PROFF_ACTOR_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "PROFF_ACTOR_ADD_ON",
  header: "Proff Actor",
  subHeader: "We will have a Proff Actor",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const CUSTOM_LOGO_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "CUSTOM_LOGO_ADD_ON",
  header: "Custom Logo",
  subHeader: "We will have a Custom Logo",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};
export const CANDID_FOTO_ADD_ON = {
  id: generateUniqueId(),
  price: 600,
  value: "CANDID_FOTO_ADD_ON",
  header: "Candid Foto",
  subHeader: "We will have a Candid Foto",
  description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
Price includes 2-3 concepts and three rounds of revision. , ` ,
  isSelected: false
};



export const SHOOT_EDIT = "Shoot + Edit";
export const SHOOT_ONLY = "Shoot only";
export const EDIT_ONLY = "Edit only";
export const OTHER = "Other";


export const PROJECT_STEP = 'new-request/project';
export const LOGISTICS_STEP = 'new-request/logistics';
export const SCRIPT_STEP = 'new-request/script';
export const INTERVIEW_STEP = 'new-request/interview';
export const VOICEOVER_STEP = 'new-request/voiceover';
export const VIDEO_EDIT_STEP = 'new-request/video-edit';
export const ADD_ONS_STEP = 'new-request/add-ons';
export const SUBMIT_STEP = 'new-request/submit';
export const FINAL_STEP = 'new-request/final';



export const NO_APPROACH = 'No Approach';
export const CANDID_APPROACH = "Candid Interview Approach";
export const SCRIPTED_APPROACH = "Scripted Delivery Approach";
export const VOICEOVER_APPROACH = "Voiceover Approach";

// PROJECT TYPES





export const optionsList: TOptionsList = [
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
    credits: 1,
    text: "We need assistance scheduling this project",
    img: OtherIcon,
  },
];
export const YES = "Yes";
export const NO = "No";
export const EMPTY = "empty";
export const OWN_ADDRESS = "Own Address";
export const STUDIO_RENTAL = "Studio Rental";
export const HOME_RENTAL = "Home Rental";
export const hoursList: ITimeItem[] = [
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
  { id: generateUniqueId(), name: "Zone 1 (< 50 Miles)", value: 0 },
  {
    id: generateUniqueId(),
    name: "Zone 2 (51 - 150 Miles)",
    value: 295,
  },
  {
    id: generateUniqueId(),
    name: "Zone 3 (151 - 250 Miles)",
    value: 695,
  },
  {
    id: generateUniqueId(),
    name: "Zone 4 (251 - 500 Miles)",
    value: 1295,
  },
  {
    id: generateUniqueId(),
    name: "Zone 5 (501+ Miles)",
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

export const videoDurationsList: { id: string; value: TVideoDuration }[] = [
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
export const projectTypes: IProjectTypeInfo[] = [
  {
    id: generateUniqueId(),
    img: AnnouncementVideos,
    header: "Announcement Videos",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, DRONE_PILOT_ADD_ON,
      HOST_PAID_TALENT_ADD_ON, MUA_ADD_ON, GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON
      , ON_SET_PRODUCER_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  },
  {
    id: generateUniqueId(),
    img: CompanyOverviewIcon,
    header: "Company Overview Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, ON_SET_PRODUCER_ADD_ON, MUA_ADD_ON, DRONE_PILOT_ADD_ON,
      SOCK_VIDEO_ADD_ON, CANDID_FOTO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: DemoVideosIcon,
    header: "Demo Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, PAID_TALENT_ADD_ON,
      MUA_ADD_ON, GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, ON_SET_PRODUCER_ADD_ON,
      RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: DroneIcon,
    header: "Drone Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: EducationVideo,
    header: "Educational Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, ON_SET_PRODUCER_ADD_ON, HOST_PAID_TALENT_ADD_ON, MUA_ADD_ON,
      GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON, ON_SET_PRODUCER_ADD_ON,
      RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: EventRecaps,
    header: "Event Recap Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, DRONE_PILOT_ADD_ON, CANDID_FOTO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: FAQS,
    header: "FAQ Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, MUA_ADD_ON, GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]

  }, {
    id: generateUniqueId(),
    img: Fundrasing,
    header: "Fundraising Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, DRONE_PILOT_ADD_ON, CANDID_FOTO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: HRRecruiting,
    header: "HR/Recruiting Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, ON_SET_PRODUCER_ADD_ON, MUA_ADD_ON, DRONE_PILOT_ADD_ON, SOCK_VIDEO_ADD_ON,
      CANDID_FOTO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: HypeSizzle,
    header: "Hype/Sizzle Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, DRONE_PILOT_ADD_ON, HOST_PAID_TALENT_ADD_ON,
      MUA_ADD_ON, GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON,
      ON_SET_PRODUCER_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: Interviews,
    header: "Interview",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, MUA_ADD_ON,
      GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, ON_SET_PRODUCER_ADD_ON,
      RAW_FILE_DELIVERY_ADD_ON
    ]
  }
  , {
    id: generateUniqueId(),
    img: OnBoarding,
    header: "Onboarding Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, MUA_ADD_ON,
      GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON, ON_SET_PRODUCER_ADD_ON,
      RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: Photography,
    header: "Photography",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: ProductServiceVideos,
    header: "Product & Service Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, ON_SET_PRODUCER_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: SocialMedia,
    header: "Social Media Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, ON_SET_PRODUCER_ADD_ON, MUA_ADD_ON, DRONE_PILOT_ADD_ON,
      SOCK_VIDEO_ADD_ON, CANDID_FOTO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: TelevisionCommercials,
    header: "Television Commercial",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, DRONE_PILOT_ADD_ON, HOST_PAID_TALENT_ADD_ON, MUA_ADD_ON,
      GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, SOCK_VIDEO_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }
  , {
    id: generateUniqueId(),
    img: TestimonialsCaseStudies,
    header: "Testimonial/Case Study Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, MUA_ADD_ON, GREEN_SCREEN_ADD_ON, SECOND_CAMERA_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }
  , {
    id: generateUniqueId(),
    img: Videography,
    header: "Videography",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, RAW_FILE_DELIVERY_ADD_ON
    ]
  }, {
    id: generateUniqueId(),
    img: WebsiteHeaderVideos,
    header: "Website Header Video",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON, IDEATION_SESSION_ADD_ON, DRONE_PILOT_ADD_ON
    ]
  }
  ,
  {
    id: generateUniqueId(),
    img: WebsiteHeaderVideos,
    header: "Other",
    subHeader: `We'd like LimeLite to .....`,
    description: `An animated logo is a dynamic way to present your brand mark in video format. From company logos to brand names, animation adds depth and professionalism to your video.
  Price includes 2-3 concepts and three rounds of revision. `,
    price: 600,
    addOns: [
      NO_ADD_ONS_ADD_ON
    ]
  }
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


//  settings sub sections

export const SETTING_TEAM_SECTION = 'SETTING_TEAM_SECTION';
export const SETTING_PASSWORD_SECTION = 'SETTING_PASSWORD_SECTION';
export const SETTING_COMMUNICATION_SECTION = 'SETTING_COMMUNICATION_SECTION';
export const SETTING_EDIT_SECTION = 'SETTING_EDIT_SECTION';


// request   statuses


export const COMPLETE_REQUEST_STATUS = "Complete";
export const IN_EDITING_REQUEST_STATUS = "In Editing";
export const SCHEDULED_REQUEST_STATUS = "Scheduled";
export const REQUESTED_REQUEST_STATUS = "Requested";
export const ON_HOLD_REQUEST_STATUS = "On Hold";
export const CANCELED_REQUEST_STATUS = "Canceled";



export const FILTER_START = 'filter start';
export const FILTER_VIDEO_TYPE = 'filter video type';
export const FILTER_REQUEST_TYPE = 'filter request type';
export const FILTER_REQUESTED_BY = 'filter requested by';
export const FILTER_STATUS = 'filter status';



export const LAST_WEEK_RANGE = 'Last week';
export const CURRENT_MONTH_RANGE = 'Current month';
export const LAST_30_DAYS = 'Last 30 days';
export const CURRENT_YEAR_RANGE = 'Current year';
export const LAST_12_MONTHS = 'Last 12 months';


export const APPROVED_TEXT_STATUS = 'Approved';
export const IN_PROGRESS_TEXT_STATUS = 'In Progress';
export const UNAVAILABLE_TEXT_STATUS = 'Unavailable';

