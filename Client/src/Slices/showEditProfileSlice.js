import { createSlice } from '@reduxjs/toolkit'

export const showEditProfileSlice = createSlice({
  name: 'showEditProfileSlice',
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => {
      state.value = true
    },
    hide: (state) => {
      state.value = false ;
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, hide } = showEditProfileSlice.actions;

export default showEditProfileSlice.reducer;