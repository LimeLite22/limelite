import { IRootState } from "redux/rootReducer";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoUser, User1Foto } from "assets/images";


const initialState: {
    name: string,
    lastName: string,
    email: string,
    phone: string,
    jobTitle: string
    password: string
    shirtSize: 'S' | 'M' | 'L' | 'XL',
    foto: string | File 

} = {
    name: "Clay",
    lastName: "Bolton",
    email: "V2tQz@example.com",
    phone: "1234567890",
    jobTitle: "Developer",
    password: "password",
    shirtSize: 'M',
    foto: User1Foto
};
const accountReducer = createSlice({
    name: "account",
    initialState,
    reducers: {
        updateAccount(state, action: PayloadAction<typeof initialState>) {
            console.log('action', action.payload);
            
            // Update individual properties
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.jobTitle = action.payload.jobTitle;
            state.password = action.payload.password;
            state.shirtSize = action.payload.shirtSize;
            
            // Conditionally update foto or set a default
            state.foto = action.payload.foto || NoUser;
        },

    },
});

export const {
    updateAccount
 } =
    accountReducer.actions;
export const selectAccount = (state: IRootState) => {
    return state.account;
};

export default accountReducer.reducer;