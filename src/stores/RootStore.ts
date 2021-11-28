import { AuthStore } from "./AuthStore";
import { EventsStore } from "./EventsStore";
import { TodosStore } from "./TodosStore";

export class RootStore {
  authStore: AuthStore;
  eventsStore: EventsStore;
  todosStore: TodosStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.eventsStore = new EventsStore(this);
    this.todosStore = new TodosStore(this);

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
    if (hydrationData.todosStore)
      this.todosStore.hydrate?.(hydrationData.todosStore);
  };
}
