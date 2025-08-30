import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getFromLocalStorage } from '../utils/localStorage';
import { authKey } from '../constants/auth.constant';

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const token = getFromLocalStorage(authKey);

    if (!token) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    const user = jwtDecode(token);

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
