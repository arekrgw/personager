import {
  IObservableArray,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "@stores/RootStore";
import { API, API_ROUTES } from "@app/api";
import axios, { AxiosError, AxiosResponse } from "axios";

export type TodosStoreHydrationData = {
  todos: ITodoList[];
};

export class TodosStore implements IStoreInitializer {
  todos: IObservableArray<ITodoList> = observable.array([]);
  initialized = false;

  constructor(public parent: RootStore) {
    makeAutoObservable(this, { parent: observable.ref });
    this.initialize();
  }

  initialize = () => {
    this.initialized = true;
  };

  hydrate = ({ todos }: TodosStoreHydrationData) => {
    this.todos.replace(todos);
  };
}
