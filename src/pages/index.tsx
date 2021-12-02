import { Typography, Grid, Box } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import HeaderBar from "@components/HeaderBar";
import axios, { AxiosResponse } from "axios";
import { API, API_ROUTES, getBearer, loggedInGuard } from "@app/api";
import { useStore } from "@stores";
import { EventReadonlyItem } from "@components/EventsListItem";
import { observer } from "mobx-react-lite";
import { ReminderReadonlyItem } from "@components/ReminderListItem";
import WelcomeInfo from "@components/WelcomeInfo";
import Head from "next/head";

const Home: NextPage = () => {
  const {
    dashboardStore: { events, reminders },
  } = useStore();

  return (
    <>
      <Head>
        <title>Personager - Dashboard</title>
      </Head>
      <Grid container pb={3}>
        <Grid item xs={12}>
          <HeaderBar title="Dashboard" />
        </Grid>
        <Grid item xs={12} justifyContent="center" container mt={5}>
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <WelcomeInfo />
          </Box>
        </Grid>
        <Grid item xs={12} justifyContent="center" container mt={5}>
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Typography variant="h3" mb={4}>
              Today reminders
            </Typography>
            {reminders.length === 0 && (
              <Typography variant="subtitle1" mb={4}>
                No reminders today...
              </Typography>
            )}
            {reminders.map((rem) => (
              <Grid key={rem.id} item xs={12}>
                <ReminderReadonlyItem reminder={rem} />
              </Grid>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} justifyContent="center" container mt={5}>
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Typography variant="h3" mb={4}>
              Today events
            </Typography>
            {events.length === 0 && (
              <Typography variant="subtitle1" mb={4}>
                No events today...
              </Typography>
            )}
            {events.map((event) => (
              <Grid key={event.id} item xs={12}>
                <EventReadonlyItem event={event} />
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  hydrationData: IStoreHydrationData;
}> = async (ctx) => {
  if (!loggedInGuard(ctx.req.cookies))
    return { redirect: { destination: "/login", permanent: false } };
  try {
    const { data: dashboard }: AxiosResponse<IDashboard> = await API.get(
      API_ROUTES.DASHBOARD.ALL,
      { headers: { Authorization: getBearer(ctx.req.cookies) || "" } }
    );

    return { props: { hydrationData: { dashboardStore: { dashboard } } } };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        hydrationData: {
          dashboardStore: { dashboard: { reminders: [], events: [] } },
        },
      },
    };
  }
};

export default observer(Home);
