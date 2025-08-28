import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import ExamTopic from '../pages/examQuestions/ExamTopic';
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
                path: '/exam-start',
                element: <ExamTopic />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
