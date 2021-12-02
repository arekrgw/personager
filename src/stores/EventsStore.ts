import {
  IObservableArray,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";

export type EventsStoreHydrationData = {
  events: IEvent[];
};

export class EventsStore implements IStoreInitializer {
  initialized = false;
  events: IObservableArray<IEvent> = observable.array([]);
  isServerError = false;
  serverError = "";
  newEvent: IEventSave | null = null;
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

  setServerError = (error: string) => {
    this.serverError = error;
  };

  clearServerError = () => {
    this.serverError = "";
  };

  sortEvents = () => {
    this.events.replace(
      this.events.slice().sort((a, b) => {
        return dayjs(b.startDate).diff(a.startDate, "m");
      })
    );
  };

  deleteEvent = async (eventId: string) => {
    try {
      await API.delete(API_ROUTES.EVENTS.DELETE(eventId));

      runInAction(() => {
        this.events.replace(this.events.filter((ev) => ev.id !== eventId));
      });
      this.getEvents();
    } catch (err) {
      console.debug("[eventsStore.deleteEvent] failed", err);
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

  saveEvent = async (event: IEventSave) => {
    if (event.id) {
      try {
        const { data }: AxiosResponse<IEvent> = await API.put(
          API_ROUTES.EVENTS.UPDATE(event.id),
          event
        );

        const toEditIndex = this.events.findIndex((ev) => ev.id === data.id);

        if (toEditIndex !== -1) {
          runInAction(() => {
            this.events[toEditIndex] = { ...data };
            this.sortEvents();
          });
          return true;
        }
        return false;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const response = (err as AxiosError<IApiDefaultErrorResponse>)
            .response;
          this.setServerError(response?.data.error || "");
        }

        return false;
      }
    }

    try {
      const { data }: AxiosResponse<IEvent> = await API.post(
        API_ROUTES.EVENTS.CREATE,
        event
      );

      runInAction(() => {
        this.createProcedure(false);
        this.events.unshift(data);
        this.sortEvents();
      });

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = (err as AxiosError<IApiDefaultErrorResponse>).response;
        this.setServerError(response?.data.error || "");
      }

      return false;
    }
  };

  createProcedure = (start: boolean) => {
    if (start) {
      this.newEvent = {
        description: "",
        name: "",
        endDate: "",
        startDate: "",
      };
    } else {
      this.newEvent = null;
    }
  };
}
