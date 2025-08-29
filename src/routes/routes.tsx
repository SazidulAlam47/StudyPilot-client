import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Exam from '../pages/Exam/Exam';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPass from '../pages/auth/ForgotPass';
import ResetPass from '../pages/auth/ResetPass';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/forget-password',
                element: <ForgotPass />,
            },
            {
                path: '/reset-password',
                element: <ResetPass />,
            },
            {
                path: '/quiz',
                element: <Exam />,
            },
        ],
    },
]);

export default router;
