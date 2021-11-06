import { RootStore } from "@stores/RootStore";

declare global {
  interface Window {
    APP_STATE: RootStore;
  }

  interface ICustomSvgIcon {
    fill?: string;
    width?: string;
    height?: string;
  }

  interface ILoginCredentials {
    login: string;
    password: string;
  }
  interface IRegisterCredentials {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  interface IFormError {
    formError: string;
  }
}
