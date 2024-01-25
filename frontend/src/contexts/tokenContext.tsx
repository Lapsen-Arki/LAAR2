import { createContext, useState, ReactNode, useEffect } from "react";

import { getAuth, signOut } from "firebase/auth";
import { jwtAuth } from "../api/jwtAuth";

type Props = {
  children: ReactNode;
};

type TokenContext = {
  isLoggedIn: boolean;
  idToken: string | null;
  signOutMethod: () => void;
  setIdToken: React.Dispatch<React.SetStateAction<string | null>>;
};

// 1. CREATE CONTEXT
const TokenContext = createContext<TokenContext>({
  isLoggedIn: false,
  idToken: "",
  signOutMethod: () => null,
  setIdToken: () => null,
});

function TokenProvider({ children }: Props) {
  const [idToken, setIdToken] = useState(() => {
    const storageType = localStorage.getItem("storageType") || "session";
    return storageType === "local"
      ? localStorage.getItem("idToken")
      : sessionStorage.getItem("idToken");
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update isLoggedIn if idToken value changes:
  useEffect(() => {
    setIsLoggedIn(idToken !== null);
  }, [idToken]);

  // Validatin JWT token automaticly every 15 minutes:
  useEffect(() => {
    const checkSessionInterval = setInterval(async () => {
      console.log("Running Session check");

      if (idToken) {
        const result = await jwtAuth(idToken);
        if (!result.message && result.error) {
          signOutMethod();
        }
      } else {
        signOutMethod();
      }
    }, 900000); // 900000 milliseconds = 15 minutes

    // Cleanup
    return () => {
      clearInterval(checkSessionInterval);
    };
  }, []); // <- DO NOT ADD idToken HERE, FUCK YOU ESLINT

  const signOutMethod = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIdToken(null);
        sessionStorage.clear();
        localStorage.clear();
        // ADD REDIRECT HERE TO IMPROVE UX -> YOU HAVE SIGNED OUT ETC
      })
      .catch((error) => {
        // An error happened.
        console.error("Signout failed: ", error);
      });
  };

  return (
    <TokenContext.Provider
      value={{ isLoggedIn, idToken, signOutMethod, setIdToken }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };
