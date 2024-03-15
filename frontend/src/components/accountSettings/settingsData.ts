import { SettingsType, UserType } from "./types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function SettingsData(user: UserType, userSettings: any) {
  const settings: SettingsType = {
    displayName: {
      title: "Nimi",
      type: "text",
      autocomplete: "off",
      value: user.displayName ?? "",
    },
    email: {
      title: "Email",
      type: "email",
      autocomplete: "off",
      value: user.email ?? "",
    },
    phoneNumber: {
      title: "Puhelinnumero",
      type: "tel",
      autocomplete: "off",
      value: userSettings.phoneNumber ?? "",
      regex: "^[0-9]{9,15}$",
    },
  };
  return settings;
}
export default SettingsData;
