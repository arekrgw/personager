import { AuthStore } from "./AuthStore";

export class RootStore {
  authStore: AuthStore;
  constructor() {
    this.authStore = new AuthStore(this);

    Object.keys(this).forEach((key) => {
      if (key.endsWith("Store")) {
        (
          this[key as keyof RootStore] as unknown as IStoreInitializer
        ).setupReactions?.();
      }
    });
  }

  hydrate = (hydrationData: IStoreHydrationData) => {};
}
