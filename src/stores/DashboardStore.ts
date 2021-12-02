import { IObservableArray, makeAutoObservable, observable } from "mobx";
import { RootStore } from "@stores/RootStore";

export type DashboardStoreHydrationData = {
  dashboard: IDashboard;
};

export class DashboardStore implements IStoreInitializer {
  initialized = false;
  reminders: IObservableArray<Omit<IReminder, "resolvers">> = observable.array(
    []
  );
  events: IObservableArray<IEvent> = observable.array([]);

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  hydrate = ({ dashboard }: DashboardStoreHydrationData) => {
    this.reminders.replace(dashboard.reminders);
    this.events.replace(dashboard.events);
  };
}
