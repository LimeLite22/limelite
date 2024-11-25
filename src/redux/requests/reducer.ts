import { generateUniqueId } from 'utils/generateId';
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT,
  IRequestState,
  IScriptWriter,
  TimeValue,
  Value,
} from "interfaces/interfaces";
import { optionsList } from "pages/NewRequest/consts";
import { IRootState } from "redux/rootReducer";
import set from "lodash/set";

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
        date: DEFAULT,
        time: DEFAULT,
      },
      isAlternate: false,
      alternateDate: {
        date: DEFAULT,
        time: DEFAULT,
      },
      scriptSettings:{
        scriptWriter: DEFAULT,
        name: "",
        phone: '',
        email: "",
        profText: "",
        ownText: "",
        teleprompter: DEFAULT,
        persons: [{id: generateUniqueId(), name: '', title: ''}]
      },
      interviewSettings: {
        questionsAuthor: DEFAULT,
        questionsAuthorProfSettings: {
          subject: '',
          phone:'',
          email: '',
          text: '',
        },
        questionsAuthorOwnSettings: {
          text: '',
        },
        persons: [
          {
            id: generateUniqueId(),
            name: '',
            title: '',
          }
        ],
        questionSettings: {
          type: DEFAULT,
          locationSettings: {
            name: '',
            phone: '',
            email: '',
          },
          virtualSettings: {
            name: '',
            phone: '',
            email: '',
          },
        },
      }
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
        date: DEFAULT,
        time: DEFAULT,
      },
      isAlternate: false,
      alternateDate: {
        date: DEFAULT,
        time: DEFAULT,
      },
      scriptSettings:{
        scriptWriter: DEFAULT,
        name: '',
        phone: '',
        email: '',
        profText: "",
        ownText: "",
        teleprompter: DEFAULT,
        persons: [{id: generateUniqueId(), name: '', title: ''}]
      },
      interviewSettings: {
        questionsAuthor: DEFAULT,
        questionsAuthorProfSettings: {
          subject: '',
          phone: '',
          email: '',
          text: '',
        },
        questionsAuthorOwnSettings: {
          text: '',
        },
        persons: [],
        questionSettings: {
          type: DEFAULT,
          locationSettings: {
            name: '',
            phone: '',
            email: '',
          },
          virtualSettings: {
            name: '',
            phone: '',
            email: '',
          },
        },
      }
    },
  ],
};

type DraftFieldUpdate = {
  path: string; // шлях до властивості, наприклад, 'location.city'
  value: any; // нове значення
};
const requestReducer = createSlice({
  name: "request",
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<IRequest["option"]> ) => {
      const id = generateUniqueId();
      state.drafts.unshift({
        id: id,
        option: action.payload,
        projectName: "",
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
        scriptSettings:{
          scriptWriter:DEFAULT,
          name:'',
          phone:'',
          email: '',
          profText: "",
          ownText: "",
          teleprompter: DEFAULT,
          persons: [{id: generateUniqueId(), name: '', title: ''}]
        },
        interviewSettings: {
          questionsAuthor: DEFAULT,
          questionsAuthorProfSettings: {
            subject: '',
            phone: '',
            email: '',
            text: '',
          },
          questionsAuthorOwnSettings: {
            text: '',
          },
          persons: [],
          questionSettings: {
            type: DEFAULT,
            locationSettings: {
              name: '',
              phone: '',
              email: '',
            },
            virtualSettings: {
              name: '',
              phone: '',
              email: '',
            },
          },
        }
      });
      state.selectedRequest = id;
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload,
      );
    },
    setSelectedRequest: (state, action: PayloadAction<string>) => {
      state.selectedRequest = action.payload;
    },
    setRequestType: (state, action: PayloadAction<IRequest["option"]>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.option = value;
      }
    },
    setProjectName: (
      state,

      action: PayloadAction<IRequest["projectName"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.projectName = value;
      }
    },
    setTargetAudience: (
      state,
      action: PayloadAction<IRequest["targetAudience"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.targetAudience = value;
      }
    },
    setProjectType: (state, action: PayloadAction<IRequest["projectType"]>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.projectType = value;
      }
    },
    setProjectTone: (state, action: PayloadAction<IRequest["projectTone"]>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.projectTone = value;
      }
    },
    setApproach: (state, action: PayloadAction<IRequest["approachList"]>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.approachList = value;
      }
    },
    setIsTravelRequiredZone: (
      state,
      action: PayloadAction<IRequest["travel"]["zoneCode"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.travel.zoneCode = value;
      }
    },
    setIsTravelRequiredSelection: (
      state,
      action: PayloadAction<IRequest["travel"]["selection"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.travel.selection = value;
      }
    },
    setLocationType: (
      state,
      action: PayloadAction<IRequest["location"]["type"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.type = value;
      }
    },
    setLocationStreet: (
      state,
      action: PayloadAction<IRequest["location"]["street"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.street = value;
      }
    },
    setLocationCompany: (
      state,
      action: PayloadAction<IRequest["location"]["company"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.company = value;
      }
    },
    setLocationCity: (
      state,
      action: PayloadAction<IRequest["location"]["city"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.city = value;
      }
    },
    setLocationState: (
      state,
      action: PayloadAction<IRequest["location"]["state"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.state = value;
      }
    },
    setLocationZip: (
      state,
      action: PayloadAction<IRequest["location"]["zip"]>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.location.zip = value;
      }
    },
    setPrefferredDate: (
      state,
      action: PayloadAction<typeof DEFAULT | Value>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.preferredDate.date = value;
      }
    },
    setPrefferredTime: (state, action: PayloadAction<TimeValue>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.preferredDate.time = value;
      }
    },
    setIsAlternate: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.isAlternate = value;
        if (!value) {
          draft.alternateDate.date = DEFAULT;
          draft.alternateDate.time = DEFAULT;
        }
      }
    }
    ,
    setAlternateDate: (
      state,
      action: PayloadAction<typeof DEFAULT | Value>,
    ) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.alternateDate.date = value;
      }
    },
    setAlternateTime: (state, action: PayloadAction<TimeValue>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.alternateDate.time = value;
      }
    },
    setIsScriptRequired: (state, action: PayloadAction<IScriptWriter>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.scriptWriter = value;
      }
    },
    setScriptName: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.name = value;
      }
    },
    setScriptPhone: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.phone = value;
      }
    },
    setScriptEmail: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.email = value;
      }
    },
    setProfScriptText: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.profText = value;
      }
    },
    setOwnScriptText: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.ownText = value;
      }
    },
    setTeleprompter: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.teleprompter = value;
      }
    },
    setPersons: (state, action: PayloadAction<IRequest["scriptSettings"]["persons"]>) => {
      const value = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.persons = value;
      }
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings.persons = draft.scriptSettings.persons.filter((person) => person.id !== id);
      }
    },
    updatePerson: (state, action: PayloadAction<{ id: string; name: string, title: string}>) => {
      const { id, name, title } = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        const person = draft.scriptSettings.persons.find((person) => person.id === id);
        if (person) {
          person.name = name;
          person.title = title;
        }
      }
    } ,
    updateDraftField: (state, action: PayloadAction<DraftFieldUpdate>) => {
      const draft = state.drafts.find((draft) => draft.id === state.selectedRequest);
      if (!draft) return;
       console.log( "updateDraftField", action.payload);
      set(draft, action.payload.path, action.payload.value);
    },
  },
});

export const {
  createDraft,
  deleteDraft,
  setSelectedRequest,
  setRequestType,
  setIsTravelRequiredZone,
  setProjectName,
  setTargetAudience,
  setProjectType,
  setProjectTone,
  setApproach,
  setIsTravelRequiredSelection,
  setLocationType,
  setLocationStreet,
  setLocationCompany,
  setLocationCity,
  setLocationState,
  setLocationZip,
  setPrefferredDate,
  setPrefferredTime,
  setAlternateDate,
  setIsAlternate,
  setAlternateTime,
  setIsScriptRequired,
  setScriptName,
  setScriptPhone,
  setScriptEmail,
  setProfScriptText,
  setOwnScriptText,
  setTeleprompter,
  setPersons,
  updatePerson,
  deletePerson,
  updateDraftField
} = requestReducer.actions;

export const selectRequestInfo = (state: IRootState) => {
  return state.request.drafts.find(
    (draft) => draft.id === state.request.selectedRequest,
  );
};
export const selectDrafts = (state: IRootState) => {
  return state.request.drafts;
};

export default requestReducer.reducer;
