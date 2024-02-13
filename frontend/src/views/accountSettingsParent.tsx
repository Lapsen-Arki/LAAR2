import { useEffect, useState } from "react";
import fetchSubData from "../api/getUserData";
import AccountSettings from "./AccountSettings";

const AccountSettingsPage = () => {
  const [sub, setSub] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const data = await fetchSubData();
    console.log("data" + data);
    setSub(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <AccountSettings sub={sub} />
    </>
  );
};

export default AccountSettingsPage;
