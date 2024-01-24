import { createContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type TokenContext = {
  idToken: string | null;
  setIdToken: null | React.Dispatch<React.SetStateAction<string | null>>;
};

// 1. CREATE CONTEXT
const TokenContext = createContext<TokenContext>({
  idToken: "",
  setIdToken: null,
});

function TokenProvider({ children }: Props) {
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));

  return (
    <TokenContext.Provider value={{ idToken, setIdToken }}>
      {children}
    </TokenContext.Provider>
  );
}

/* 3. EXAMPLE OF CONSUMING THE CONTEXT:

    import { useContext } from "react";
    const {idToken} = useContext(TokenContext)

*/

export { TokenContext, TokenProvider };
