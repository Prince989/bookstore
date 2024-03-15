import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export interface GlobalState {
    responsiveMenuShow : boolean
}

const initialState: GlobalState = {
    responsiveMenuShow : false
}

export const GlobalSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        setResponsiveMenuShow : (state , action : PayloadAction<boolean>) => {
            state.responsiveMenuShow = action.payload;
        },
    }
})

export const { setResponsiveMenuShow } = GlobalSlice.actions;
export default GlobalSlice.reducer;

