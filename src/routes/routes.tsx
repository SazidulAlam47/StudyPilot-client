import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Exam from '../pages/Exam/Exam';
import Login from '../pages/auth/Login';

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
                path: '/exam',
                element: <Exam />,
            },
        ],
    },
]);

export default router;
