import { AuthStore } from "./AuthStore";
import { EventsStore } from "./EventsStore";

export class RootStore {
  authStore: AuthStore;
  eventsStore: EventsStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.eventsStore = new EventsStore(this);

    Object.keys(this).forEach((key) => {
      if (key.endsWith("Store")) {
        (
          this[key as keyof RootStore] as unknown as IStoreInitializer
        ).setupReactions?.();
      }
    });
  }

  hydrate = (hydrationData: IStoreHydrationData) => {
    if (hydrationData.eventsStore)
      this.eventsStore.hydrate?.(hydrationData.eventsStore);
  };
}
