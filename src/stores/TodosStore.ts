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
  serverError = "";

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

  setServerError = (error: string) => {
    this.serverError = error;
  };

  clearServerError = () => {
    this.serverError = "";
  };

  getTodoLists = async () => {
    try {
      const { data }: AxiosResponse<ITodoList[]> = await API.get(
        API_ROUTES.TODOS.ALL
      );

      runInAction(() => {
        this.todos.replace(data);
      });
    } catch (err) {
      console.debug("[todosStore.getTodoLists] failed", err);
    }
  };

  deleteTodoList = async (id: string) => {
    try {
      await API.delete(API_ROUTES.TODOS.DELETE(id));

      runInAction(() => {
        this.todos.replace(this.todos.filter((tl) => tl.id !== id));
      });
    } catch (err) {
      console.debug("[todosStore.deleteTodoList] failed", err);
    }
  };

  toggleTodo = async (todoId: string, todoListId: string) => {
    let todo: ITodo | undefined;
    try {
      todo = this.todos
        .find((tl) => tl.id === todoListId)
        ?.todos.find((t) => t.id === todoId);

      if (todo) {
        todo.completed = !todo.completed;
        await API.put(
          API_ROUTES.TODOS.UPDATE(todoListId),
          this.todos.find((tl) => tl.id === todoListId)
        );
      }
    } catch (err) {
      console.debug("[toggleTodo]", err);
      if (todo) todo.completed = !todo.completed;
    }
  };

  saveTodoList = async (todoList: ITodoList) => {
    if (todoList.id) {
      try {
        const { data }: AxiosResponse<ITodoList> = await API.put(
          API_ROUTES.TODOS.UPDATE(todoList.id),
          todoList
        );

        const toEditIndex = this.todos.findIndex((tl) => tl.id === data.id);

        if (toEditIndex !== -1) {
          runInAction(() => {
            this.todos[toEditIndex] = { ...data };
          });
          return true;
        }
        return false;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const response = (err as AxiosError<IApiDefaultErrorResponse>)
            .response;
          console.log(response?.data);
          this.setServerError(response?.data.error || "");
        }

        return false;
      }
    }
    return false;
  };

  createProcedure = (start: boolean) => {
    // if (start) {
    //   this.newEvent = {
    //     description: "",
    //     name: "",
    //     endDate: "",
    //     startDate: "",
    //   };
    // } else {
    //   this.newEvent = null;
    // }
  };
}
