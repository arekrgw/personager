import { CssBaseline, ThemeProvider } from "@mui/material";
import { StoreProvider } from "@stores";
import { theme } from "@styles";
import { enableStaticRendering } from "mobx-react-lite";
import type { AppProps } from "next/app";
import "@styles/globalStyle.css";
import { LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { PageLayout } from "@components/PageLayout";

enableStaticRendering(typeof window === "undefined");

const PAGES_WITH_NO_LAYOUT = ["/register", "/login"];

function MyApp({ Component, pageProps, router }: AppProps) {
  console.log("@@PageProps", pageProps);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StoreProvider hydrationData={pageProps.hydrationData}>
          {PAGES_WITH_NO_LAYOUT.includes(router.asPath) ? (
            <Component {...pageProps} />
          ) : (
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          )}
        </StoreProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
