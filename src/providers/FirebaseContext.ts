import type { User, UserCredential } from 'firebase/auth';
import { createContext } from 'react';

export type TFirebaseContext = {
    user: User | null;
    loading: boolean;
    googleLogin: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
};

export const FirebaseContext = createContext<TFirebaseContext>({
    user: null,
    loading: true,
    googleLogin: () =>
        Promise.reject(new Error('Firebase context not initialized')),
    logOut: () => Promise.reject(new Error('Firebase context not initialized')),
});
