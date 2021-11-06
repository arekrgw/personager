export {};

declare global {
  interface ILoginResponse {
    success: boolean;
    error?: string;
  }

  interface IApiDefaultErrorResponse {
    success: boolean;
    error: string;
  }
}
