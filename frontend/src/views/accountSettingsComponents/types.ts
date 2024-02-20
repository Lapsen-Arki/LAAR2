export type SettingsType = {
  [key: string]: {
    title: string;
    type: string;
    autocomplete: string;
    value: string;
  };
};
export type UserType = {
  userId: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  phoneNumber: string | undefined;
};
export interface AccountSettingsProps {
  settingsData: SettingsType;
}
export interface RenderFieldsProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
  toggleEdit: (fieldName: string) => void;
  editModes: { [key: string]: boolean };
  sub: { [key: string]: { title: string; type: string; autocomplete: string } };
}
export interface RenderInputProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
  sub: { [key: string]: { title: string; type: string; autocomplete: string } };
}
export interface RenderLabelProps {
  fields: { [key: string]: string };
  fieldName: string;
}
export interface PasswordFieldsProps {
  fields: { [key: string]: string };
  onChange: (fieldName: string, value: string) => void;
  editModes: { [key: string]: boolean };
  toggleEdit: (fieldName: string) => void;
  drawerOpen: boolean;
}
export interface PasswordDrawerProps {
  fields: { [key: string]: string };
  onChange: (fieldName: string, value: string) => void;
  drawerOpen: boolean;
}
