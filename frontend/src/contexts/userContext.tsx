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
  phoneNumber: string | undefined;
  //   userName: string // can be added and fetched from firestore
};

const UserContext = createContext<UserContextType>({
  userId: "",
  email: "",
  displayName: "",
  phoneNumber: "",
}); // null is the initial value

export default UserContext;

function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  // can be added and fetched from firestore
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [displayName, setDisplayName] = useState<string | undefined>();
  const { idToken } = useContext(TokenContext);
  useEffect(() => {
    if (idToken) {
      const userToken = authUserTokenHandler();

      const decodedToken = jwtDecode(idToken) as DecodedToken;

      setUserId(decodedToken.user_id);
      setEmail(decodedToken.email);
      setDisplayName(
        userToken?.providerData.displayName ?? "Nimeä ei asetettu"
      );
      setPhoneNumber(
        userToken?.providerData.phoneNumber ?? "Ei puhelinnumeroa"
      );
    } else {
      setUserId(undefined);
    }
  }, [idToken]);

  return (
    <UserContext.Provider value={{ userId, email, displayName, phoneNumber }}>
      {children}
    </UserContext.Provider>
  );
}

function authUserTokenHandler() {
  const authUserToken = getFirebaseAuthUserToken();
  if (!authUserToken) return;
  const parsedToken = JSON.parse(authUserToken);
  const authProviderData = parsedToken.providerData[0];
  return { token: authUserToken, providerData: authProviderData };
}

function getFirebaseAuthUserToken() {
  const firebaseAuthUserRegex = /^firebase:authUser:.+$/;
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key === null) continue;
    if (firebaseAuthUserRegex.test(key)) {
      const token: string | null = sessionStorage.getItem(key) ?? null;
      return token;
    }
  }
  return null; // Return null if the key is not found
}

export { UserContext, UserProvider };
