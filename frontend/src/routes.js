// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginApp from './pages/Login';
import AdminDashboard from './pages/admin/dashboard';
import RegisterApp from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import RegisterAdmin from './pages/admin/componentes/registerAdmin';
import Tienda from './pages/tienda/AdminTienda';
import ResetPassword from './pages/RestPass';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LoginApp />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/register' element={<RegisterApp />} />
            <Route path='/dashboard/registerAdmin' element={<RegisterAdmin />} />
            <Route path='/forgot-password' element={<ForgotPass />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/tienda' element={<Tienda />} />
        </Routes>
    );
};

export default AppRoutes;
