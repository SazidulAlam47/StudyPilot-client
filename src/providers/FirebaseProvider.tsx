import { useEffect, useState, type ReactNode } from 'react';

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { FirebaseContext } from './FirebaseContext';

const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        googleLogin,
        logOut,
    };

    return (
        <FirebaseContext.Provider value={authInfo}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;
