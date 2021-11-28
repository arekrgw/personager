import { API, API_ROUTES, getBearer } from "@app/api";
import { EventsList } from "@components/EventsList";
import { PageLayout } from "@components/PageLayout";
import { Grid, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import HeaderBar from "@components/HeaderBar";

const Events: NextPage = () => {
  const {
    todosStore: { todos },
  } = useStore();
  return (
    <PageLayout>
      <Grid container pb={3}>
        <Grid item xs={12}>
          <HeaderBar title="Todo lists" />
        </Grid>
        <Grid item xs={12} justifyContent="center" container mt={5}>
          {JSON.stringify(todos)}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  hydrationData: IStoreHydrationData;
}> = async (ctx) => {
  try {
    const { data: todos }: AxiosResponse<ITodoList[]> = await API.get(
      API_ROUTES.TODOS.ALL,
      { headers: { Authorization: getBearer(ctx.req.cookies) || "" } }
    );

    return { props: { hydrationData: { todosStore: { todos } } } };
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

    return { props: { hydrationData: { todosStore: { todos: [] } } } };
  }
};

export default observer(Events);
