import React from 'react'
import { BrowserRouter as BsRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/auth/login/Login'
import ResetPassword from '../pages/auth/ResetPassword'
import ForgotPassword from '../pages/auth/ForgotPassword'
import MainLayout from '../components/Layout/MainLayout'

const Router = () => {
  return (
    <BsRouter>
        <Routes>
            <Route path='/auth'>
                <Route index element={<Login/>}/>
                <Route path='reset-password' element={<ResetPassword/>}/>
                <Route path='forgot-password' element={<ForgotPassword/>}/>
            </Route>
            <Route path='/' element={<MainLayout/>} >
                <Route index element={<Dashboard/>}/>
            </Route>
        </Routes>
    </BsRouter>
  )
}

export default Router