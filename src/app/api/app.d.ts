export {};

declare global {
  interface ILoginResponse {
    success: boolean;
    error?: string;
  }

  interface IRegisterResponse {}

  interface IApiDefaultErrorResponse {
    success: boolean;
    error: string;
  }

  interface IEvent {
    id: string;
    startDate: string;
    endDate: string;
    name: string;
    description: string;
    ownerId: string;
  }

  type IEventSave = Partial<IEvent> &
    Pick<
      IEvent,
      {
        startDate: string;
        endDate: string;
        name: string;
        description: string;
      }
    >;

  interface ITodo {
    id: string;
    description: string;
    completed: boolean;
  }

  interface ITodoList {
    id: string;
    name: string;
    completed: boolean;
    todos: ITodo[];
    ownerId: string;
  }

  interface IReminderResolver {
    id: string;
    reminderId: string;
    whence: string;
  }

  interface IReminder {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    targetDate: string;
    resolvers: IReminderResolver[];
  }

  interface IDashboard {
    reminders: Omit<IReminder, "resolvers">[];
    events: IEvent[];
  }
}
