import { useEffect, useState, useContext, useCallback } from "react";
import SettingsData from "../components/accountSettings/settingsData";
import AccountSettings from "../components/accountSettings/settingsForm";
import { UserContext } from "../contexts/userContext";
import { AuthProvider } from "../contexts/authContext";
import getSettings from "../api/accountManagement/getSettings";
import { TokenContext } from "../contexts/tokenContext";
import { GetUserSettingsDataType } from "../components/accountSettings/types";
import LoadingComponent from "../components/LoadingComponent";
import "../conf/firebaseSdkConfig";
const AccountSettingsPage = () => {
  const [settingsData, setSettingsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDbData] = useState<GetUserSettingsDataType>();
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    if (user.userId === undefined) return;
    if (token.idToken === null) return;
    try {
      const dbData = await getSettings(token.idToken);
      const data = await SettingsData(user, dbData.settings);
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
  if (isLoading || !dbData)
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
          dbData={dbData.sanitizedPaymentMethods}
          idToken={token.idToken}
        />
      </AuthProvider>
    </>
  );
};

export default AccountSettingsPage;
