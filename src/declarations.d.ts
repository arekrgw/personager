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
}
