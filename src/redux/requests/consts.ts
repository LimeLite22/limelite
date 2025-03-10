import { ThumbnailPurple, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { BASIC_THUMBNAIL, CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, DEFAULT, LESS_1_30, ON_HOLD_REQUEST_STATUS, optionsList, projectTones, projectTypes, REQUESTED_REQUEST_STATUS, VIDEO_SQUARE } from "consts/consts"
import { IRequest } from "interfaces/interfaces";
import { generateUniqueId } from "utils/generateId";

import { NO, OWN_ADDRESS, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_VIRTUALLY, TRACK_AUTHOR_PROFESSIONAL, YES, zonesList } from './../../consts/consts';

export const requestsInitialState: IRequest[] = [
    {
        id: "1",
        overviewInfoSettings: {
            status: REQUESTED_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Bob',
                lastName: 'Smith',
                email: `bobwewewe@gmail.com`,
                foto: User1Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[0],
            name: "Forwarding Behind the lens",
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
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: COMPLETE_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Tom',
                lastName: 'Hanks',
                email: `bobwewewe@gmail.com`,
                foto: User2Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[1],
            name: "No Fear Testimonial",
            targetAudience: "",
            type: projectTypes[1],
            projectTone: projectTones[0],
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
    {
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: CANCELED_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Samuel',
                lastName: 'Brown',
                email: `samuel@gmail.com`,
                foto: User3Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[3],
            name: "Star Wars",
            targetAudience: "",
            type: projectTypes[3],
            projectTone: projectTones[3],
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
    {
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: REQUESTED_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Carol',
                lastName: 'Brown',
                email: `carol@gmail.com`,
                foto: User4Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[4],
            name: "Growing Visual Stories: Behind the lens",
            targetAudience: "",
            type: projectTypes[4],
            projectTone: projectTones[4],
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
    {
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: ON_HOLD_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Zendaya',
                lastName: 'Davis',
                email: `zendaya@gmail.com`,
                foto: User3Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[1],
            name: "Crafting Visual Stories: Behind the lens",
            targetAudience: "",
            type: projectTypes[1],
            projectTone: projectTones[0],
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
    {
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: REQUESTED_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'Daniel',
                lastName: 'Radcliffe',
                email: `danielradcliffe@gmail.com`,
                foto: User1Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[1],
            name: "Vesper Institute",
            targetAudience: "",
            type: projectTypes[1],
            projectTone: projectTones[0],
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
    {
        id: generateUniqueId(),
        overviewInfoSettings: {
            status: REQUESTED_REQUEST_STATUS,
            reviewLink: 'https://f.io/ltTc9gLk',
            downloadLink: 'https://f.io/J9NcL36S',
            requester: {
                id: generateUniqueId(),
                name: 'John',
                lastName: 'Travolta',
                email: `johntravolta@gmail.com`,
                foto: User1Foto
            },
            contributors: [],
            projectStartImage: ThumbnailPurple,
            credits: 2,
            requestDate: new Date(),
            shootDate: new Date(),
            editDate: new Date(),
            completeDate: new Date(),
            completnessPercent: 30
        },
        projectInfoSettings: {
            option: optionsList[1],
            name: "Vesper Institute",
            targetAudience: "",
            type: projectTypes[1],
            projectTone: projectTones[0],
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
    overviewInfoSettings: {
        status: REQUESTED_REQUEST_STATUS,
        reviewLink: 'https://f.io/ltTc9gLk',
        downloadLink: 'https://f.io/J9NcL36S',
        requester: {
            id: generateUniqueId(),
            name: 'Bob',
            lastName: 'Smith',
            email: `bob$dfdff@gmail.com`,
            foto: ThumbnailPurple
        },
        contributors: [],
        projectStartImage: ThumbnailPurple,
        credits: 2,
        requestDate: new Date(),
        shootDate: new Date(),
        editDate: new Date(),
        completeDate: new Date(),
        completnessPercent: 30
    },
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