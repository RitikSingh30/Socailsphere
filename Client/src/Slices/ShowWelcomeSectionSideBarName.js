import { createSlice } from "@reduxjs/toolkit";

export const showWelcomeSectionSideBarName = createSlice({
    name:'showWelcomeSectionSideBarName',
    initialState:{
        value:true,
    },
    reducers:{
        showWelcomeSectionSideBarNameDispatch: (state) => {
            state.value = true
        },
        hideWelcomeSectionSideBarNameDispatch: (state) => {
            state.value = false ;
        },
    },
})

export const {showWelcomeSectionSideBarNameDispatch , hideWelcomeSectionSideBarNameDispatch} = showWelcomeSectionSideBarName.actions;
export default showWelcomeSectionSideBarName.reducer;