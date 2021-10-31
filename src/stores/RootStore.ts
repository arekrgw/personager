export class RootStore {
  constructor() {
    Object.keys(this).forEach((key) => {
      if (key.endsWith("Store")) {
        (
          this[key as keyof RootStore] as unknown as IStoreInitializer
        ).setupReactions?.();
      }
    });
  }

  hydrate = (hydrationData: IStoreHydrationData) => {};
}
