import { BASIC_THUMBNAIL, DEFAULT, LESS_1_30, optionsList, projectTones, projectTypes, VIDEO_SQUARE } from "consts/consts"
import { IRequest } from "interfaces/interfaces";
import { generateUniqueId } from "utils/generateId";

import { NO, OWN_ADDRESS, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_VIRTUALLY, TRACK_AUTHOR_PROFESSIONAL, YES, zonesList } from './../../consts/consts';

export const requestsInitialState: IRequest[] = [
    {
        id: "1",
        projectInfoSettings: {
            option: optionsList[0],
            name: "No Fear Testimonial",
            targetAudience: "happy clients",
            type: projectTypes[0],
            projectTone: projectTones[0],
            approachList: [],
            details:
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
          Integer vel metus ut libero fermentum gravida. Aenean sit amet sapien nec purus 
          cursus faucibus at vel elit`,
        },
        logisticSettings: {
            travel: {
                selection: NO,
                zoneCode: zonesList[1],
            },
            location: {
                type: DEFAULT,
                company: "ABC Company",
                street: "123 Main Street",
                city: "City",
                state: "State",
                zip: "12345",
            },
            preferredDate: {
                date: new Date("2025-01-18"),
                time: DEFAULT,
            },
            isAlternate: false,
            alternateDate: {
                date: DEFAULT,
                time: DEFAULT,
            },
            safetyEquipment: DEFAULT,
            safetyEquipmentDescription: ''
        },
        scriptSettings: {
            teleprompter: DEFAULT,
            persons: [{
                id: generateUniqueId(), name: "Smith",
                title: "Director",
            }],
        },
        script: {
            scriptWriter: DEFAULT,
            scriptStatus: DEFAULT,
            scriptText: "",
            name: "",
            phone: "",
            email: "",
            backgroundInfo: "",
        },
        interviewSettings: {
            questionsAuthor: DEFAULT,
            questionsAuthorProfSettings: {
                subject: "Setting up an interview",
                phone: 23232323,
                email: "bUH0E@example.com",
                backgroundInfo: " Establish a connection with the client",
            },
            questionsAuthorOwnSettings: {
                text: " Establish a connection with the client",
                scriptStatus: DEFAULT,
            },
            persons: [
                {
                    id: generateUniqueId(),
                    name: "Smith",
                    title: "Director",
                },
            ],
            questionSettings: {
                type: DEFAULT,
                locationSettings: {
                    name: "Smith",
                    phone: 2132322323,
                    email: "bUH0E@example.com",
                },
                virtualSettings: {
                    name: "wewewewewe",
                    phone: 23232323323,
                    email: "bUH0E@example.com",
                },
            },
        },
        voiceTrackSettings: {
            trackAuthor: DEFAULT,
            track: DEFAULT,
        },
        videoSettings: {
            format: VIDEO_SQUARE,
            targetDuration: LESS_1_30,
            captions: false,
            thumbnail: BASIC_THUMBNAIL,
            additionalFormats: DEFAULT,
            selectedAdditionalFormats: [
                {
                    id: generateUniqueId(),
                    format: DEFAULT,
                    duration: DEFAULT,
                },
            ],
            additionalVisualAssets: DEFAULT,
            additionalVisualAssetFile: DEFAULT,
            additionalVisualAssetUrl: '',
            resultTime: DEFAULT,
            time: {
                name: null,
                value: 0,
            },
        },
    },
    {
        id: "2",
        projectInfoSettings: {
            option: optionsList[0],
            name: "Vesper Institute",
            targetAudience: "",
            type: {
                id: generateUniqueId(),
                img: '',
                header: "",
                subHeader: ``,
                description: ``,
                price: 0,
                addOns: [
                ]
            },
            projectTone: "",
            approachList: [],
            details: '',
        },
        logisticSettings: {
            travel: {
                selection: null,
                zoneCode: {
                    name: null,
                    value: 0,
                },
            },
            location: {
                type: DEFAULT,
                street: "",
                company: "",
                city: "",
                state: "",
                zip: "",
            },
            preferredDate: {
                date: new Date("2025-01-18"),
                time: DEFAULT,
            },
            isAlternate: false,
            alternateDate: {
                date: DEFAULT,
                time: DEFAULT,
            },
            safetyEquipment: DEFAULT,
            safetyEquipmentDescription: ''
        },
        scriptSettings: {
            teleprompter: DEFAULT,
            persons: [{ id: generateUniqueId(), name: "", title: "" }],
        },
        script: {
            scriptWriter: DEFAULT,
            scriptStatus: DEFAULT,
            scriptText: "",
            name: "",
            phone: "",
            email: "",
            backgroundInfo: "",
        },
        interviewSettings: {
            questionsAuthor: DEFAULT,
            questionsAuthorProfSettings: {
                subject: "",
                phone: "",
                email: "",
                backgroundInfo: "",
            },
            questionsAuthorOwnSettings: {
                text: "",
                scriptStatus: DEFAULT,
            },
            persons: [{
                id: generateUniqueId(),
                name: "",
                title: "",
            },],
            questionSettings: {
                type: DEFAULT,
                locationSettings: {
                    name: "",
                    phone: "",
                    email: "",
                },
                virtualSettings: {
                    name: "",
                    phone: "",
                    email: "",
                },
            },
        },
        voiceTrackSettings: {
            trackAuthor: DEFAULT,
            track: DEFAULT,
        },
        videoSettings: {
            format: DEFAULT,
            targetDuration: DEFAULT,
            captions: false,
            thumbnail: DEFAULT,
            additionalFormats: DEFAULT,

            selectedAdditionalFormats: [
                {
                    id: generateUniqueId(),
                    format: DEFAULT,
                    duration: DEFAULT,
                },
            ],
            additionalVisualAssets: DEFAULT,
            additionalVisualAssetFile: DEFAULT,
            additionalVisualAssetUrl: '',
            resultTime: DEFAULT,
            time: {
                name: null,
                value: 0,
            },
        },
    },
]
export const testRequest: IRequest =
{
    id: "1",
    projectInfoSettings: {
        option: optionsList[0],
        name: "No Fear Testimonial",
        targetAudience: "happy clients",
        type: projectTypes[0],
        projectTone: projectTones[0],
        approachList: [],
        details:
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
        Integer vel metus ut libero fermentum gravida. Aenean sit amet sapien nec purus 
        cursus faucibus at vel elit`,
    },
    logisticSettings: {
        travel: {
            selection: YES,
            zoneCode: zonesList[1],
        },
        location: {
            type: OWN_ADDRESS,
            company: "ABC Company",
            street: "123 Main Street",
            city: "City",
            state: "State",
            zip: "12345",
        },
        preferredDate: {
            date: new Date("2025-01-18"),
            time: DEFAULT,
        },
        isAlternate: false,
        alternateDate: {
            date: DEFAULT,
            time: DEFAULT,
        },
        safetyEquipment: DEFAULT,
        safetyEquipmentDescription: ''
    },
    scriptSettings: {
        teleprompter: DEFAULT,
        persons: [{
            id: generateUniqueId(), name: "Smith",
            title: "Director",
        }],
    },
    script: {
        scriptWriter: DEFAULT,
        scriptStatus: DEFAULT,
        scriptText: "",
        name: "",
        phone: "",
        email: "",
        backgroundInfo: "",
    },
    interviewSettings: {
        questionsAuthor: QUESTIONS_AUTHOR_PROFESSIONAL,
        questionsAuthorProfSettings: {
            subject: "Setting up an interview",
            phone: 23232323,
            email: "bUH0E@example.com",
            backgroundInfo: " Establish a connection with the client",
        },
        questionsAuthorOwnSettings: {
            text: " Establish a connection with the client",
            scriptStatus: DEFAULT,
        },
        persons: [
            {
                id: generateUniqueId(),
                name: "Smith",
                title: "Director",
            },
        ],
        questionSettings: {
            type: QUESTIONS_VIRTUALLY,
            locationSettings: {
                name: "Smith",
                phone: 2132322323,
                email: "bUH0E@example.com",
            },
            virtualSettings: {
                name: "wewewewewe",
                phone: 23232323323,
                email: "bUH0E@example.com",
            },
        },
    },
    voiceTrackSettings: {
        trackAuthor: TRACK_AUTHOR_PROFESSIONAL,
        track: DEFAULT,
    },
    videoSettings: {
        format: VIDEO_SQUARE,
        targetDuration: LESS_1_30,
        captions: false,
        thumbnail: BASIC_THUMBNAIL,
        additionalFormats: DEFAULT,
        selectedAdditionalFormats: [
            {
                id: generateUniqueId(),
                format: DEFAULT,
                duration: DEFAULT,
            },
        ],
        additionalVisualAssets: DEFAULT,
        additionalVisualAssetFile: DEFAULT,
        additionalVisualAssetUrl: '',
        resultTime: DEFAULT,
        time: {
            name: null,
            value: 0,
        },
    },
};