import { SettingsType, UserType } from "./types";

async function SettingsData(user: UserType) {
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
      value: user.phoneNumber ?? "",
      regex: "^[0-9]{9,15}$",
    },
  };
  return settings;
}
export default SettingsData;
