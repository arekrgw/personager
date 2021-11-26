import {
  IObservableArray,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import { AxiosResponse } from "axios";

export type EventsStoreHydrationData = {
  events: IEvent[];
};

export class EventsStore implements IStoreInitializer {
  initialized = false;
  events: IObservableArray<IEvent> = observable.array([]);
  isServerError = false;
  isLoading = false;

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  hydrate = ({ events }: EventsStoreHydrationData) => {
    this.events.replace(events);
  };

  deleteEvent = async (eventId: string) => {
    try {
      await API.delete(API_ROUTES.EVENTS.DELETE(eventId));
      this.getEvents();

      runInAction(() => {
        this.events.replace(this.events.filter((ev) => ev.id !== eventId));
      });
    } catch (err) {
      console.debug("[eventsStore.getEvents] failed", err);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  getEvents = async () => {
    try {
      this.isLoading = true;
      const { data }: AxiosResponse<IEvent[]> = await API.get(
        API_ROUTES.EVENTS.ALL
      );

      runInAction(() => {
        this.events.replace(data);
      });
    } catch (err) {
      console.debug("[eventsStore.getEvents] failed", err);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
