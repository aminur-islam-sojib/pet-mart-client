import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() =>
    localStorage.getItem("access-token")
  );

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    // Clear both state and localStorage
    localStorage.removeItem("access-token");
    setToken(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const firebaseToken = await currentUser.getIdToken();

          setToken(firebaseToken);
          localStorage.setItem("access-token", firebaseToken);

          console.log("Firebase token obtained and stored");
        } catch (error) {
          console.error("Failed to get Firebase token:", error);

          localStorage.removeItem("access-token");
          setToken(null);
        }
      } else {
        localStorage.removeItem("access-token");
        setToken(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    login,
    googleLogin,
    logOut,
    user,
    loading,
    token,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
