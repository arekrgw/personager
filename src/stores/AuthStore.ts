import { makeAutoObservable, observable, runInAction } from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import axios, { AxiosError, AxiosResponse } from "axios";

export class AuthStore implements IStoreInitializer {
  initialized = false;
  serverError = "";
  isLoading = false;

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  setServerError = (error: string) => {
    this.serverError = error;
  };

  clearServerError = () => {
    this.serverError = "";
  };

  login = async ({ values }: { values: ILoginCredentials }) => {
    try {
      this.isLoading = true;
      const { data }: AxiosResponse<ILoginResponse> = await API.post(
        API_ROUTES.LOGIN,
        values
      );

      this.clearServerError();

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = (err as AxiosError<IApiDefaultErrorResponse>).response;

        this.setServerError(response?.data.error || "");
      }

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  register = async ({ values }: { values: IRegisterCredentials }) => {
    try {
      this.isLoading = true;
      const { data }: AxiosResponse<IRegisterResponse> = await API.post(
        API_ROUTES.REGISTER,
        values
      );

      this.clearServerError();

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = (err as AxiosError<IApiDefaultErrorResponse>).response;

        this.setServerError(response?.data.error || "");
      }

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
