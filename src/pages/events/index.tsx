import { API, API_ROUTES, getBearer } from "@app/api";
import { EventsList } from "@components/EventsList";
import { PageLayout } from "@components/PageLayout";
import { Grid, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";

const Events: NextPage = () => {
  const { eventsStore } = useStore();
  return (
    <PageLayout>
      <Grid container p={3}>
        <Grid item sm={12}>
          <Typography variant="h3">Events</Typography>
        </Grid>
        <Grid item sm={12} justifyContent="center" container mt={3}>
          <EventsList events={eventsStore.events} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  hydrationData: IStoreHydrationData;
}> = async (ctx) => {
  try {
    const { data: events }: AxiosResponse<IEvent[]> = await API.get(
      API_ROUTES.EVENTS.ALL,
      { headers: { Authorization: getBearer(ctx.req.cookies) || "" } }
    );

    return { props: { hydrationData: { eventsStore: { events } } } };
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

    return { props: { hydrationData: { eventsStore: { events: [] } } } };
  }
};

export default observer(Events);
