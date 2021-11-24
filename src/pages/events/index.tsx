import { API_ROUTES, createApiClient } from "@app/api";
import { PageLayout } from "@components/PageLayout";
import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";

interface IEventsPage {
  events: IEvent[] | null;
}

const Events: NextPage<IEventsPage> = ({ events }) => {
  console.log(events);
  return (
    <PageLayout>
      <Typography variant="h1">Events</Typography>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<IEventsPage> = async (
  ctx
) => {
  try {
    const { data: events }: AxiosResponse<IEvent[]> = await createApiClient(
      ctx.req.cookies
    ).get(API_ROUTES.EVENTS.ALL);

    return { props: { events } };
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
    return { props: { events: null } };
  }
};

export default Events;
