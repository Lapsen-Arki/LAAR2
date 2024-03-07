import { useEffect, useState, useContext, useCallback } from "react";
import SettingsData from "../components/accountSettings/settingsData";
import AccountSettings from "../components/accountSettings/settingsForm";
import { UserContext } from "../contexts/userContext";
import { AuthProvider } from "../contexts/authContext";
import getSettings from "../api/accountManagement/getSettings";
import { TokenContext } from "../contexts/tokenContext";
import { PaymentMethod } from "../components/accountSettings/types";
import LoadingComponent from "../components/LoadingComponent";
import "../conf/firebaseSdkConfig";
const AccountSettingsPage = () => {
  const [settingsData, setSettingsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDbData] = useState([] as PaymentMethod[]);
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    if (user.userId === undefined) return;
    if (token.idToken === null) return;
    try {
      const data = await SettingsData(user);
      const dbData = await getSettings(token.idToken);
      setDbData(dbData);
      setSettingsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching settings data:", error);
      // Handle error (display a message?)
    }
  }, [user, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (isLoading)
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  return (
    <>
      <AuthProvider>
        <AccountSettings
          settingsData={settingsData}
          dbData={dbData}
          idToken={token.idToken}
        />
      </AuthProvider>
    </>
  );
};

export default AccountSettingsPage;
