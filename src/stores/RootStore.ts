import { AuthStore } from "./AuthStore";
import { EventsStore } from "./EventsStore";
import { RemindersStore } from "./RemindersStore";
import { TodosStore } from "./TodosStore";
import { DashboardStore } from "./DashboardStore";

export class RootStore {
  authStore: AuthStore;
  eventsStore: EventsStore;
  todosStore: TodosStore;
  remindersStore: RemindersStore;
  dashboardStore: DashboardStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.eventsStore = new EventsStore(this);
    this.todosStore = new TodosStore(this);
    this.remindersStore = new RemindersStore(this);
    this.dashboardStore = new DashboardStore(this);

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
    if (hydrationData.remindersStore)
      this.remindersStore.hydrate?.(hydrationData.remindersStore);
    if (hydrationData.dashboardStore)
      this.dashboardStore.hydrate?.(hydrationData.dashboardStore);
  };
}
