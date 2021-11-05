export {};

declare global {
  interface ILoginResponse {
    success: boolean;
    error?: string;
  }
}
