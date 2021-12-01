import { API, API_ROUTES, getBearer } from "@app/api";
import { EventsList } from "@components/EventsList";
import { PageLayout } from "@components/PageLayout";
import { Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import HeaderBar from "@components/HeaderBar";

const Events: NextPage = () => {
  const {
    eventsStore: { createProcedure },
  } = useStore();
  return (
    <Grid container pb={3}>
      <Grid item xs={12}>
        <HeaderBar title="Events" createFn={() => createProcedure(true)} />
      </Grid>
      <Grid item xs={12} justifyContent="center" container mt={5}>
        <EventsList />
      </Grid>
    </Grid>
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
    console.log(err);
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
