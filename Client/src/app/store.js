import {configureStore} from '@reduxjs/toolkit'
import showEditProfileSlice from '../Slices/showEditProfileSlice'

export default configureStore({
    reducer:{
        showEditProfileSlice:showEditProfileSlice,
    },
})