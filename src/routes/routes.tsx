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
import Budget from '../pages/Budget/Budget';
import Study from '../pages/Study/Study';
import Schedule from '../pages/Schedule/Schedule';
import ScheduleEdit from '../pages/Schedule/ScheduleEdit';
import ChangePass from '../pages/auth/ChangePass';
import SetPass from '../pages/auth/SetPass';
import StudyDetails from '../pages/Study/StudyDetails';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
                path: '/change-password',
                element: (
                    <ProtectedRoute>
                        <ChangePass />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/set-password',
                element: (
                    <ProtectedRoute>
                        <SetPass />
                    </ProtectedRoute>
                ),
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
                path: '/study/:id',
                element: (
                    <ProtectedRoute>
                        <StudyDetails />
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
            {
                path: '/schedule-edit',
                element: (
                    <ProtectedRoute>
                        <ScheduleEdit />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/reset-password',
        element: <ResetPass />,
    },
]);

export default router;
