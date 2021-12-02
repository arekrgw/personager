import {
  IObservableArray,
  makeAutoObservable,
  observable,
  runInAction,
  toJS,
} from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import axios, { AxiosError, AxiosResponse } from "axios";

export type RemindersStoreHydrationData = {
  reminders: IReminder[];
};

export class RemindersStore implements IStoreInitializer {
  reminders: IObservableArray<IReminder> = observable.array([]);
  initialized = false;
  serverError = "";
  editableId = "";
  newReminder: IReminder | null = null;

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  hydrate = ({ reminders }: RemindersStoreHydrationData) => {
    this.reminders.replace(reminders);
  };

  setServerError = (error: string) => {
    this.serverError = error;
  };

  clearServerError = () => {
    this.serverError = "";
  };

  setEditableId = (val: string) => {
    this.editableId = val;
  };

  createReminder = (action: boolean) => {
    if (action) {
      this.newReminder = {
        title: "",
        description: "",
        targetDate: "",
        resolvers: [],
      } as unknown as IReminder;
    } else {
      this.newReminder = null;
    }
  };

  addNewResolver = async (reminderId: string) => {
    const newResolver: IReminderResolver = { id: "-1", whence: "", reminderId };
    const reminder = this.reminders.find((rem) => rem.id === reminderId);

    if (reminder) {
      reminder.resolvers = [...reminder.resolvers, newResolver];
      this.setEditableId(newResolver.id);
    }
  };

  createResolver = async (
    reminderId: string,
    newResolver: IReminderResolver
  ) => {
    try {
      const { data: newResolverFromApi }: AxiosResponse<IReminderResolver> =
        await API.post(API_ROUTES.RESOLVERS.CREATE(reminderId), newResolver);

      runInAction(() => {
        const reminder = this.reminders.find((rem) => rem.id === reminderId);

        if (reminder) {
          reminder.resolvers = [
            ...reminder.resolvers.filter((res) => res.id !== "-1"),
            newResolverFromApi,
          ];
        }
      });
    } catch (err) {
      console.debug("[createResolver] failed", err);
    }
  };

  deleteResolver = async (resolverId: string, reminderId: string) => {
    if (resolverId === "-1") {
      const reminder = this.reminders.find((rem) => rem.id === reminderId);

      if (reminder) {
        reminder.resolvers = reminder.resolvers.filter(
          (res) => res.id !== "-1"
        );
      }
      return;
    }

    let reminder: IReminder | undefined;
    let remindersRef: IReminder | undefined;
    try {
      remindersRef = this.reminders.find((rem) => rem.id === reminderId);
      if (remindersRef) {
        reminder = toJS(remindersRef);
        remindersRef.resolvers = remindersRef.resolvers.filter(
          (res) => res.id !== resolverId
        );
        await API.delete(API_ROUTES.RESOLVERS.DELETE(resolverId));
      }
    } catch (err) {
      console.debug("[deleteResolver] failed", err);
      if (reminder && remindersRef) Object.assign(remindersRef, reminder);
    }
  };

  deleteReminder = async (reminderId: string) => {
    try {
      await API.delete(API_ROUTES.REMINDERS.DELETE(reminderId));

      runInAction(() => {
        this.reminders.replace(
          this.reminders.filter((rem) => rem.id !== reminderId)
        );
      });
    } catch (err) {
      console.debug("[remindersStore.deleteReminder] failed", err);
    }
  };

  updateResolver = async (
    reminderId: string,
    resolverId: string,
    newValues: Partial<IReminderResolver>
  ) => {
    let resolver: IReminderResolver | undefined;
    let oldValue: IReminderResolver | undefined;
    try {
      resolver = this.reminders
        .find((rem) => rem.id === reminderId)
        ?.resolvers.find((res) => res.id === resolverId);

      if (resolver) {
        oldValue = { ...resolver };
        Object.assign(resolver, newValues);
        await API.put(API_ROUTES.RESOLVERS.UPDATE(resolverId), resolver);
      }
    } catch (err) {
      console.debug("[updateResolver] failed", err);
      if (resolver && oldValue) Object.assign(resolver, oldValue);
    }
  };

  saveReminder = async (reminder: IReminder) => {
    if (reminder.id) {
      try {
        const { data }: AxiosResponse<IReminder> = await API.put(
          API_ROUTES.REMINDERS.UPDATE(reminder.id),
          reminder
        );

        const toEdit = this.reminders.find((rem) => rem.id === data.id);

        if (toEdit) {
          runInAction(() => {
            Object.assign(toEdit, { ...data });
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
      const { data }: AxiosResponse<IReminder> = await API.post(
        API_ROUTES.REMINDERS.CREATE,
        reminder
      );

      runInAction(() => {
        this.createReminder(false);
        this.reminders.push(data);
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
}
