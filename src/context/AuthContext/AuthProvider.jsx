import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../public/firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [theme, setTheme] = useState("");

  const provider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  const userLogin = (email, password) => {
    setIsLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  const googleSignIn = (provider) => {
    setIsLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    user,
    setUser,
    updateUser,
    userLogin,
    provider,
    logOut,
    googleSignIn,
    isLoading,
    setIsLoading,
    /* theme,
    setTheme, */
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
