import { createContext, useState, ReactNode, useEffect } from "react";

import { getAuth, signOut } from "firebase/auth";

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
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(idToken !== null);
  }, [idToken]);

  const signOutMethod = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIdToken(null);
        sessionStorage.clear();
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

/* OHJEET tokenContext.tsx ja jwtAuth.ts käyttöön:

    IMPORTIT:
    import { useContext } from "react";
    import { TokenContext } from "../../contexts/tokenContext";

    KULUTA MUUTTUJA TAI METHODEITA NÄIN:
    esim. jos tarvitset pelkkää JWT tokenia:
    const {isLoggedIn} = useContext(TokenContext)
    esim. jos tarvitset näitä:
    const {idToken, signOutMethod, setIdToken } = useContext(TokenContext)

    KÄYTÄ jwtAuth.ts FUNCTIOTA AINA ENNEN PÄÄSYÄ SIVUILLE, JOILLA ARKALUONTOISTA DATAA:
    import { jwtAuth } from "./jwtAuth";
    authResponse = await jwtAuth(newIdToken);

    Jos haluat kirjautua ulos:




*/

export { TokenContext, TokenProvider };
