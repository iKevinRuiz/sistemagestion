// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginApp from './pages/Login';
import AdminDashboard from './pages/admin/dashboard';
import ForgotPass from './pages/ForgotPass';
import RegisterAdmin from './pages/admin/componentes/registerAdmin';
import ResetPassword from './pages/RestPass';
import RegisterApp from './pages/Register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LoginApp />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/dashboard/registerAdmin' element={<RegisterAdmin />} />
            <Route path='/forgot-password' element={<ForgotPass />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/register' element={<RegisterApp />} />
        </Routes>
    );
};

export default AppRoutes;
