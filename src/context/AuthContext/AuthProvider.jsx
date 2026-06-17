import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../public/firebase/firebase.config.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [theme, setTheme] = useState("");

  const provider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setIsLoading(false);
    });
  };

  const updateUser = (updateData) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, updateData).finally(() => {
      setIsLoading(false);
    });
  };

  const userLogin = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setIsLoading(false);
    });
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth).finally(() => {
      setIsLoading(false);
    });
  };

  const googleSignIn = (provider) => {
    setIsLoading(true);
    return signInWithPopup(auth, provider).finally(() => {
      setIsLoading(false);
    });
  };

  const resetPassword = (email) => {
    setIsLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => {
      setIsLoading(false);
    });
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
    resetPassword,
    isLoading,
    setIsLoading,
    /* theme,
    setTheme, */
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
