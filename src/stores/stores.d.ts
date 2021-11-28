import { ReactNode } from "react";
import { EventsStoreHydrationData } from "./EventsStore";
import { TodosStoreHydrationData } from "./TodosStore";

declare global {
  interface IStoreHydrationData {
    eventsStore?: EventsStoreHydrationData;
    todosStore?: TodosStoreHydrationData;
  }

  interface IStoreInitializer {
    initialize(params: unknown): void;

    // in this function every store is already defined
    setupReactions?(): void;

    // you can use when function from mobx to await for the initialization
    initialized: boolean;

    hydrate?(hydrationData: unknown): void;
  }

  interface IStoreProvider {
    children: ReactNode;
    hydrationData?: IStoreHydrationData;
  }
}
