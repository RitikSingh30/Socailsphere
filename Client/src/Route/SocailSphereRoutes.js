import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Component/Login'
import {SignUp} from '../Component/SignUp'
import { Otp } from '../Component/Otp'
import { WelcomeSection } from '../Sections/WelcomeSection'
import ForgotPassword from '../Component/ForgotPassword/ForgotPassword'
import EnterOtp from '../Component/ForgotPassword/EnterOtp'
import ResetPassword from '../Component/ForgotPassword/ResetPassword'
import SuccesfulPasswordReset from '../Component/ForgotPassword/SuccesfulPasswordReset'
import { ProfileSection } from '../Sections/ProfileSection'
import { HomeSection } from '../Sections/HomeSection'
import { MessageSection } from '../Sections/MessageSection'
import { NotificationSection } from '../Sections/NotificationSection'

export default function SocailSphereRoutes() {
  return (
    <div>
       <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path="/Welcome" element={<WelcomeSection/>}>
          <Route path='Profile' element={<ProfileSection/>}/>
          <Route path='Home' element={<HomeSection/>}/>
          <Route path='Messages' element={<MessageSection/>}/>
          <Route path='Notification' element={<NotificationSection/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/Enter-Otp' element={<EnterOtp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/password-change-successful' element={<SuccesfulPasswordReset/>}/>
       </Routes>
    </div>
  )
}
