import { useEffect, useState, useContext, useCallback } from "react";
import buildData from "./accountSettingsComponents/dataHandler";
import AccountSettings from "./accountSettingsComponents/accountSettings";
import { UserContext } from "../contexts/userContext";
const AccountSettingsPage = () => {
  const [settingsData, setSettingsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    if (user.userId === undefined) return;
    try {
      const data = await buildData(user);
      if (!data) return;
      console.log(data);
      setSettingsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching settings data:", error);
      // Handle error (display a message?)
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <AccountSettings settingsData={settingsData} />
    </>
  );
};

export default AccountSettingsPage;
