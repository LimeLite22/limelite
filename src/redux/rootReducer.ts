import { configureStore } from "@reduxjs/toolkit";

import notifications from "./notifications/reducer";
import request from "./requests/reducer";

export const store = configureStore({
  reducer: {
    notifications: notifications,
    request: request,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// const saveStateToLocalStorage = (state: IRequestState) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("requestState", serializedState);
//   } catch (e) {
//     console.error("Could not save state", e);
//   }
// };

// store.subscribe(() => {
//   saveStateToLocalStorage(store.getState().request);
// });

export type IRootState = ReturnType<typeof store.getState>;
