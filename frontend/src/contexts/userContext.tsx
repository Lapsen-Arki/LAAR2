import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { TokenContext } from "./tokenContext";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/typesFrontend";

type UserContextType = {
  userId: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  //   userName: string // can be added and fetched from firestore
};

const UserContext = createContext<UserContextType>({
  userId: "",
  email: "",
  displayName: "",
}); // null is the initial value

export default UserContext;

function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [displayName, setDisplayName] = useState<string | undefined>();
  const { idToken } = useContext(TokenContext);

  useEffect(() => {
    if (idToken) {
      const decodedToken = jwtDecode(idToken) as DecodedToken;
      setUserId(decodedToken.user_id);
      setEmail(decodedToken.email);
      setDisplayName(decodedToken.displayName);
    } else {
      setUserId(undefined);
    }
  }, [idToken]);

  return (
    <UserContext.Provider value={{ userId, email, displayName }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
