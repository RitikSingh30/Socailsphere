import { createSlice } from "@reduxjs/toolkit";

export const captionDataSlice = createSlice({
    name:'captionDataSlice',
    initialState:{
        value:null,
    },
    reducers:{
        setCaptionData: (state,action) => {
            state.value = action.payload
        },
    },
})

export const {setCaptionData} = captionDataSlice.actions;
export default captionDataSlice.reducer;