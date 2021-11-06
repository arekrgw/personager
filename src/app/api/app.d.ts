export {};

declare global {
  interface ILoginResponse {
    success: boolean;
    error?: string;
  }

  interface IRegisterResponse {

  }

  interface IApiDefaultErrorResponse {
    success: boolean;
    error: string;
  }
}
