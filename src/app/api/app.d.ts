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
}
