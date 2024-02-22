import { SettingsType, UserType } from "./types";

async function buildData(user: UserType) {
  const settings: SettingsType = {
    displayName: {
      title: "Nimi",
      type: "text",
      autocomplete: "name",
      value: user.displayName ?? "",
    },
    /* email: {
      title: "Email",
      type: "email",
      autocomplete: "email",
      value: user.email ?? "",
    },
    phoneNumber: {
      title: "Puhelinnumero",
      type: "tel",
      autocomplete: "tel",
      value: user.phoneNumber ?? "",
    }, */
  };
  return settings;
}
export default buildData;
