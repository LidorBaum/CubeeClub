import React, { useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from '@firebase/auth';
import { auth } from '../firebase';
import { collection, getDoc, doc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = newUserCreds => {
        createUserWithEmailAndPassword(
            auth,
            newUserCreds.email,
            newUserCreds.password
        ).then(userCreds => {
            setDoc(doc(db, 'Users', userCreds.user.uid), {
                name: newUserCreds.name,
                phoneNumber: newUserCreds.phoneNumber,
                email: newUserCreds.email,
            });
        });
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
                    const docRef = doc(db, 'Users', user.uid);
                    const docSnap = await getDoc(docRef);
                    console.log('Document data:', docSnap.data());
                    setCurrentUser({ ...user, ...docSnap.data() });
                } else setCurrentUser(user);
                setLoading(false);
                console.log('signed', user);
            };
            foo();
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
