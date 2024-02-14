import { SettingsType, UserType } from "./types";

async function buildData(user: UserType) {
  const settings: SettingsType = {
    displayName: {
      title: "Name",
      type: "text",
      autocomplete: "name",
      value: user.displayName ?? "",
    },
    email: {
      title: "Email",
      type: "email",
      autocomplete: "email",
      value: user.email ?? "",
    },
  };
  return settings;
}
export default buildData;
