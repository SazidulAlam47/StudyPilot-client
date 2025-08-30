import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Exam from '../pages/Exam/Exam';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPass from '../pages/auth/ForgotPass';
import ResetPass from '../pages/auth/ResetPass';
import ProtectedRoute from './ProtectedRoute';
import ExamInput from '../pages/Exam/ExamInput';
import PreviousExams from '../pages/Exam/PreviousExams';
import Budget from '../pages/budget/Budget';
import Study from '../pages/study/Study';
import Schedule from '../pages/schedule/Schedule';

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
                element: (
                    <ProtectedRoute>
                        <ExamInput />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/quiz/:id',
                element: (
                    <ProtectedRoute>
                        <Exam />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/quiz-previous',
                element: (
                    <ProtectedRoute>
                        <PreviousExams />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/budget',
                element: (
                    <ProtectedRoute>
                        <Budget />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/study',
                element: (
                    <ProtectedRoute>
                        <Study />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/schedule',
                element: (
                    <ProtectedRoute>
                        <Schedule />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;
