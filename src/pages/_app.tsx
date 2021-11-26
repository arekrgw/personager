import { CssBaseline, ThemeProvider } from "@mui/material";
import { StoreProvider } from "@stores";
import { theme } from "@styles";
import { enableStaticRendering } from "mobx-react-lite";
import type { AppProps } from "next/app";
import "@styles/globalStyle.css";

enableStaticRendering(typeof window === "undefined");

function MyApp({ Component, pageProps }: AppProps) {
  console.log("@@PageProps", pageProps);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider hydrationData={pageProps.hydrationData}>
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;
