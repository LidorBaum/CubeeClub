import React, { useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from '@firebase/auth';
import { auth } from '../firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth'
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            const foo = async () => {
                if (user) {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap = await getDoc(docRef);
                    console.log("Document data:", docSnap.data());
                    setCurrentUser({ ...user, ...docSnap.data() });
                }
                else setCurrentUser(user)
                setLoading(false);
                console.log('signed', user);
            }
            foo()
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
