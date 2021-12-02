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
import { v4 } from "uuid";

export type TodosStoreHydrationData = {
  todos: ITodoList[];
};

export class TodosStore implements IStoreInitializer {
  todos: IObservableArray<ITodoList> = observable.array([]);
  initialized = false;
  serverError = "";
  editableId = "";
  newTodoList: ITodoList | null = null;

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

  setEditableId = (val: string) => {
    this.editableId = val;
  };

  addNewTodo = (todoListId: string) => {
    const newTodo: ITodo = { id: v4(), description: "", completed: false };
    this.todos.find((tl) => tl.id == todoListId)?.todos.push(newTodo);

    this.setEditableId(newTodo.id);
  };

  createTodoList = (action: boolean) => {
    if (action) {
      this.newTodoList = {
        name: "",
        todos: [],
        completed: false,
      } as unknown as ITodoList;
    } else {
      this.newTodoList = null;
    }
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

  deleteTodo = async (todoListId: string, todoId: string) => {
    let todoList: ITodoList | undefined;
    let todoListRef: ITodoList | undefined;
    try {
      todoListRef = this.todos.find((tl) => tl.id === todoListId);
      if (todoListRef) {
        todoList = toJS(todoListRef);
        todoListRef.todos = todoList.todos.filter((t) => t.id !== todoId);
        await API.put(API_ROUTES.TODOS.UPDATE(todoListId), todoListRef);
      }
    } catch (err) {
      console.debug("[toggleTodo] failed", err);
      if (todoList && todoListRef) Object.assign(todoListRef, todoList);
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
      console.debug("[toggleTodo] failed", err);
      if (todo) todo.completed = !todo.completed;
    }
  };

  toggleTodoList = async (todoListId: string) => {
    let todoList: ITodoList | undefined;
    try {
      todoList = this.todos.find((tl) => tl.id === todoListId);
      if (todoList) {
        todoList.completed = !todoList.completed;
        await API.put(API_ROUTES.TODOS.UPDATE(todoListId), todoList);
      }
    } catch (err) {
      console.debug("[toggleTodoList] failed", err);
      if (todoList) todoList.completed = !todoList.completed;
    }
  };

  saveTodoList = async (todoList: ITodoList) => {
    if (todoList.id) {
      try {
        const { data }: AxiosResponse<ITodoList> = await API.put(
          API_ROUTES.TODOS.UPDATE(todoList.id),
          todoList
        );

        const toEdit = this.todos.find((tl) => tl.id === data.id);

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
      const { data }: AxiosResponse<ITodoList> = await API.post(
        API_ROUTES.TODOS.CREATE,
        todoList
      );

      runInAction(() => {
        this.createTodoList(false);
        this.todos.push(data);
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

  updateTodo = async (
    todoListId: string,
    todoId: string,
    newValues: Partial<ITodo>
  ) => {
    let todo: ITodo | undefined;
    let oldValue: ITodo | undefined;
    try {
      todo = this.todos
        .find((tl) => tl.id === todoListId)
        ?.todos.find((t) => t.id === todoId);

      if (todo) {
        oldValue = { ...todo };
        Object.assign(todo, newValues);
        await API.put(
          API_ROUTES.TODOS.UPDATE(todoListId),
          this.todos.find((tl) => tl.id === todoListId)
        );
      }
    } catch (err) {
      console.debug("[updateTodo] failed", err);
      if (todo && oldValue) Object.assign(todo, oldValue);
    }
  };
}
