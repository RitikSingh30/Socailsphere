import {configureStore} from '@reduxjs/toolkit'
import showEditProfileSlice from '../Slices/ShowEditProfileSlice'
import captionDataSlice from '../Slices/PostDataSlice'
import showWelcomeSectionSideBarName from '../Slices/ShowWelcomeSectionSideBarName'

export default configureStore({
    reducer:{
        showEditProfileSlice:showEditProfileSlice,
        captionDataSlice:captionDataSlice,
        showWelcomeSectionSideBarName:showWelcomeSectionSideBarName,
    },
})