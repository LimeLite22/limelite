import { IRootState } from "redux/rootReducer";

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAdditionalVideoFormat, IRequestState } from "interfaces/interfaces";
import set from "lodash/set";

import { generateUniqueId } from "utils/generateId";

import { DEFAULT, optionsList } from "consts/consts";

import { IRequest } from "./../../interfaces/interfaces";

// const loadStateFromLocalStorage = (): IRequestState | undefined => {
//   try {
//     const serializedState = localStorage.getItem("requestState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     return undefined;
//   }
// };
// const loadStateFromLocalStorage = (): IRequestState | undefined => {
//   try {
//     const serializedState = localStorage.getItem("requestState");
//     if (serializedState === null) return undefined;

//     let state = JSON.parse(serializedState);

//     // Check if it's the old format and migrate if necessary
//     if ("isTravelRequired" in state) {
//       console.log("виправляємо");
//       state = {
//         ...state,
//         travel: {
//           selection: state.isTravelRequired.selection,
//           zoneCode: {
//             name: state.isTravelRequired.zoneCode.name,
//             value: state.isTravelRequired.zoneCode.value,
//           },
//         },
//       };
//       delete state.isTravelRequired; // Remove the old property

//       // Update localStorage with the new format
//       localStorage.setItem("requestState", JSON.stringify(state));
//     }
//     if ("alternateDate" in state) {
//       if (state.alternateDate.date === null) {
//         state.alternateDate.date = DEFAULT;
//       }
//       if (state.alternateDate.time === null) {
//         state.alternateDate.time = DEFAULT;
//       }
//     }
//     if ("preferredDate" in state) {
//       if (state.preferredDate.date === null) {
//         state.preferredDate.date = DEFAULT;
//       }
//       if (state.preferredDate.time === null) {
//         state.preferredDate.time = DEFAULT;
//       }
//     }

//     return state;
//   } catch (e) {
//     return undefined;
//   }
// };
// const persistedState = loadStateFromLocalStorage();
localStorage.removeItem("requestState");

const initialState: IRequestState = {
  selectedRequest: "1",
  drafts: [
    {
      id: "1",
      option: optionsList[0],
      projectName: "No Fear Testimonial",
      targetAudience: "",
      projectType: "Testimonial",
      projectTone: "",
      approachList: [],

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
      scriptSettings: {
        scriptWriter: DEFAULT,
        name: "",
        phone: "",
        email: "",
        profText: "",
        ownText: "",
        teleprompter: DEFAULT,
        persons: [{ id: generateUniqueId(), name: "", title: "" }],
      },
      interviewSettings: {
        questionsAuthor: DEFAULT,
        questionsAuthorProfSettings: {
          subject: "",
          phone: "",
          email: "",
          text: "",
        },
        questionsAuthorOwnSettings: {
          text: "",
        },
        persons: [
          {
            id: generateUniqueId(),
            name: "",
            title: "",
          },
        ],
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
        scriptAuthor: DEFAULT,
        scriptAuthorProfSettings: {
          subject: "",
          phone: "",
          email: "",
          text: "",
        },
        scriptAuthorOwnSettings: {
          text: "",
        },
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
      },
      addOns: []
    },
    {
      id: "2",
      option: optionsList[0],
      projectName: "Vesper Institute",
      targetAudience: "",
      projectType: "Event Video",
      projectTone: "",
      approachList: [],

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
      scriptSettings: {
        scriptWriter: DEFAULT,
        name: "",
        phone: "",
        email: "",
        profText: "",
        ownText: "",
        teleprompter: DEFAULT,
        persons: [{ id: generateUniqueId(), name: "", title: "" }],
      },
      interviewSettings: {
        questionsAuthor: DEFAULT,
        questionsAuthorProfSettings: {
          subject: "",
          phone: "",
          email: "",
          text: "",
        },
        questionsAuthorOwnSettings: {
          text: "",
        },
        persons: [],
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
        scriptAuthor: DEFAULT,
        scriptAuthorProfSettings: {
          subject: "",
          phone: "",
          email: "",
          text: "",
        },
        scriptAuthorOwnSettings: {
          text: "",
        },
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
      },
      addOns: []
    },
  ],
};

type DraftFieldUpdate = {
  path: string;
  value: unknown;
};
const requestReducer = createSlice({
  name: "request",
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<IRequest["option"]>) => {
      const id = generateUniqueId();
      state.drafts.unshift({
        id: id,
        option: action.payload,
        projectName: `Request ${state.drafts.length + 1}`,
        targetAudience: "",
        projectType: "",
        projectTone: "",
        approachList: [],
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
          date: DEFAULT,
          time: DEFAULT,
        },
        isAlternate: false,
        alternateDate: {
          date: DEFAULT,
          time: DEFAULT,
        },
        scriptSettings: {
          scriptWriter: DEFAULT,
          name: "",
          phone: "",
          email: "",
          profText: "",
          ownText: "",
          teleprompter: DEFAULT,
          persons: [{ id: generateUniqueId(), name: "", title: "" }],
        },
        interviewSettings: {
          questionsAuthor: DEFAULT,
          questionsAuthorProfSettings: {
            subject: "",
            phone: "",
            email: "",
            text: "",
          },
          questionsAuthorOwnSettings: {
            text: "",
          },
          persons: [],
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
          scriptAuthor: DEFAULT,
          scriptAuthorProfSettings: {
            subject: "",
            phone: "",
            email: "",
            text: "",
          },
          scriptAuthorOwnSettings: {
            text: "",
          },
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
        },
        addOns: []
      });
      state.selectedRequest = id;
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload,
      );
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.persons = draft.scriptSettings.persons.filter(
          (person) => person.id !== id,
        );
      }
    },
    updatePerson: (
      state,
      action: PayloadAction<{ id: string; name: string; title: string }>,
    ) => {
      const { id, name, title } = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        const person = draft.scriptSettings.persons.find(
          (person) => person.id === id,
        );
        if (person) {
          person.name = name;
          person.title = title;
        }
      }
    },
    updateDraftField: (state, action: PayloadAction<DraftFieldUpdate>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (!draft) return;
      console.log("updateDraftField", action.payload);
      set(draft, action.payload.path, action.payload.value);
    },
    deleteAdditionalVideoFormat: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.videoSettings.selectedAdditionalFormats =
          draft.videoSettings.selectedAdditionalFormats.filter(
            (person) => person.id !== id,
          );
      }
    },
    updateAdditionalVideoFormat: (
      state,
      action: PayloadAction<IAdditionalVideoFormat>,
    ) => {
      const { id } = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        console.log("драфт є");
        const format = draft.videoSettings.selectedAdditionalFormats.find(
          (format) => format.id === id,
        );
        if (format) {
          console.log("формат є");
          format.format = action.payload.format;
          format.duration = action.payload.duration;
        }
      }
    },
  },
});

export const {
  createDraft,
  deleteDraft,
  updatePerson,
  deletePerson,
  deleteAdditionalVideoFormat,
  updateAdditionalVideoFormat,
  updateDraftField,
} = requestReducer.actions;

export const selectRequestInfo = (state: IRootState) => {
  return state.request.drafts.find(
    (draft) => draft.id === state.request.selectedRequest,
  );
};

export const selectRequestVoiceSettings = (state: IRootState) => {
  return state.request.drafts.find(
    (draft) => draft.id === state.request.selectedRequest,
  )?.voiceTrackSettings;
};
export const selectDrafts = (state: IRootState) => {
  return state.request.drafts;
};

export default requestReducer.reducer;
