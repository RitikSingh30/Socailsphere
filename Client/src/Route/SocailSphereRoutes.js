import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Component/Login'
import {SignUp} from '../Component/SignUp'
import { Otp } from '../Component/Otp'

export default function SocailSphereRoutes() {
  return (
    <div>
       <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<Otp/>}/>
       </Routes>
    </div>
  )
}
