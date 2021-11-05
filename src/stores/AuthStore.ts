import { makeAutoObservable, observable } from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import { AxiosResponse } from "axios";

export class AuthStore implements IStoreInitializer {
  initialized = false;

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  login = async ({
    values,
  }: {
    values: ILoginCredentials;
  }): Promise<boolean | string> => {
    try {
      const { data }: AxiosResponse<ILoginResponse> = await API.post(
        API_ROUTES.LOGIN,
        values
      );

      return data.success;
    } catch (err) {
      console.log(err);
      return false;
      // return data.error;
    }
  };
}
