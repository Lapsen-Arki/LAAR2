import { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, User, Auth } from "firebase/auth";

const AuthContext = createContext<{
  currentUser: User | null; // Match the actual state type
  auth: Auth | null;
  loading: boolean;
}>({
  currentUser: null,
  auth: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // For initialization check
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup function
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ currentUser, auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
