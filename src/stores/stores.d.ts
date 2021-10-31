import { ReactNode } from "react";

declare global {
  interface IStoreHydrationData {}

  interface IStoreInitializer {
    initialize(params: unknown): void;

    // in this function every store is already defined
    setupReactions?(): void;

    // you can use when function from mobx to await for the initialization
    initialized: boolean;
  }

  interface IStoreProvider {
    children: ReactNode;
    hydrationData?: IStoreHydrationData;
  }
}
