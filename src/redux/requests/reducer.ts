import { IProjectInfoSettings, ILogisticSettings } from './../../interfaces/interfaces';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT, HOME_RENTAL } from "consts/consts";
import { IAdditionalVideoFormat, IInterviewSettings, ILocation, IRequestState, IScriptSettings } from "interfaces/interfaces";
import set from "lodash/set";
import { IRootState } from "redux/rootReducer";
import { TDraftFieldUpdate, TOption, TStep } from "types/types";
import { generateUniqueId } from "utils/generateId";
import { requestsInitialState } from './consts';

localStorage.removeItem("requestState");

const selectedRequest = requestsInitialState[0].id;

const initialState: IRequestState = {
  selectedRequest,
  stepsList: [],
  drafts: requestsInitialState,
  editDraft: requestsInitialState.find((draft) => draft.id === selectedRequest) || requestsInitialState[0],
};

const requestReducer = createSlice({
  name: "request",
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<TOption>) => {
      const id = generateUniqueId();
      state.drafts.unshift({
        id: id,
        projectInfoSettings: {
          option: action.payload,
          name: `Request ${state.drafts.length + 1}`,
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
            type: HOME_RENTAL,
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
        },
        addOnLocation: {
          type: DEFAULT,
          company: "ABC Company",
          street: "123 Main Street",
          city: "City",
          state: "State",
          zip: "12345",
        },
        scriptSettings: {
          scriptWriter: DEFAULT,
          scriptStatus: DEFAULT,
          name: "",
          phone: "",
          email: "",
          backgroundInfo: "",
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
            backgroundInfo: "",
          },
          questionsAuthorOwnSettings: {
            text: "",
            scriptStatus: DEFAULT,

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
            backgroundInfo: "",
          },
          scriptAuthorOwnSettings: {
            text: "",
            scriptStatus: DEFAULT,
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
    updateDraftField: (state, action: PayloadAction<TDraftFieldUpdate>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (!draft) return;
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
        const format = draft.videoSettings.selectedAdditionalFormats.find(
          (format) => format.id === id,
        );
        if (format) {
          format.format = action.payload.format;
          format.duration = action.payload.duration;
        }
      }
    },
    updateStepsList: (state, action: PayloadAction<TStep[]>) => {
      state.stepsList = action.payload
    },
    updateAddOnSelectionStatus: (state, action: PayloadAction<{ id: string }>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        const projectInfoSettings = draft?.projectInfoSettings;
        if (action.payload.id === projectInfoSettings.type.addOns[0].id) {
          projectInfoSettings.type.addOns[0].isSelected = true
          for (let i = 1; i < projectInfoSettings.type.addOns.length; i++) {
            projectInfoSettings.type.addOns[i].isSelected = false
          }
        } else {
          const addOn = projectInfoSettings.type.addOns.find(
            (addOn) => addOn.id === action.payload.id
          )
          if (addOn) {
            projectInfoSettings.type.addOns[0].isSelected = false
            addOn.isSelected = !addOn.isSelected
          }
        }

      }
    },
    updateScriptSettings: (state, action: PayloadAction<IScriptSettings>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.scriptSettings = action.payload;
      }
    },
    updateInteviewSettings: (state, action: PayloadAction<IInterviewSettings>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.interviewSettings = action.payload;
      }
    },
    updateAddOnLocation: (state, action: PayloadAction<ILocation>) => {
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft) {
        draft.addOnLocation = action.payload
      }
    },
    updateProjectInfoSettings: (state, action: PayloadAction<{ projectInfoSettings: IProjectInfoSettings, isEdit: boolean }>) => {
      const { projectInfoSettings, isEdit } = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft && !isEdit) {
        draft.projectInfoSettings = projectInfoSettings;
      }
      if (isEdit) {
        state.editDraft.projectInfoSettings = projectInfoSettings;
      }
    },
    updateLogisticInfoSettings: (state, action: PayloadAction<{ logisticInfoSettings: ILogisticSettings, isEdit: boolean }>) => {
      const { logisticInfoSettings, isEdit } = action.payload;
      const draft = state.drafts.find(
        (draft) => draft.id === state.selectedRequest,
      );
      if (draft && !isEdit) {
        draft.logisticSettings = logisticInfoSettings;
      }
      if (isEdit) {
        console.log(logisticInfoSettings);
        state.editDraft.logisticSettings = logisticInfoSettings;
      }
    }
  },
});

export const {
  createDraft,
  deleteDraft,
  updatePerson,
  deletePerson,
  deleteAdditionalVideoFormat,
  updateAdditionalVideoFormat,
  updateAddOnSelectionStatus,
  updateDraftField,
  updateStepsList,
  updateScriptSettings,
  updateInteviewSettings,
  updateAddOnLocation,
  updateProjectInfoSettings,
  updateLogisticInfoSettings
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

export const selectSteps = (state: IRootState) => {
  return state.request.stepsList;
};



export default requestReducer.reducer;
