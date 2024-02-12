import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { getAuth, signOut } from "firebase/auth";
import { jwtAuth } from "../api/jwtAuth";
import { TokenContextType } from "../types/types";
import { useNavigate } from "react-router-dom";

// 1. CREATE CONTEXT
const TokenContext = createContext<TokenContextType>({
  isLoggedIn: false,
  idToken: "",
  signOutMethod: () => null,
  setIdToken: () => null,
});

function TokenProvider({ children }: { children: ReactNode }) {
  const [idToken, setIdToken] = useState(() => {
    const storageType = localStorage.getItem("storageType") || "session";
    return storageType === "local"
      ? localStorage.getItem("idToken")
      : sessionStorage.getItem("idToken");
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Update isLoggedIn if idToken value changes:
  useEffect(() => {
    setIsLoggedIn(idToken !== null);
  }, [idToken]);

  const signOutMethod = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIdToken(null);
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error("Signout failed: ", error);
      });
  }, [navigate]); // Dependencies of useCallback

  // Validatin JWT token automaticly every 15 minutes:
  useEffect(() => {
    if (isLoggedIn) {
      const checkSessionInterval = setInterval(async () => {
        console.log("Running Session check");

        if (idToken) {
          const result = await jwtAuth(idToken);
          if (result === "error" || result === "emailNotVerified") {
            signOutMethod();
          }
        } else {
          // This is correct: otherwise session would presist if idToken has not
          // been found and validated.
          signOutMethod();
        }
      }, 300000); // 300000 milliseconds = 5 minutes

      // Cleanup
      return () => {
        clearInterval(checkSessionInterval);
      };
    }
  }, [idToken, isLoggedIn, signOutMethod]);

  return (
    <TokenContext.Provider
      value={{ isLoggedIn, idToken, signOutMethod, setIdToken }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };
