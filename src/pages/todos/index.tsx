import { API, API_ROUTES, COOKIES, getBearer, loggedInGuard } from "@app/api";
import { Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { observer } from "mobx-react-lite";
import HeaderBar from "@components/HeaderBar";
import { TodosList } from "@components/TodosList";
import { useStore } from "@stores";
import Head from "next/head";

const TodoLists: NextPage = () => {
  const {
    todosStore: { createTodoList },
  } = useStore();
  return (
    <>
      <Head>
        <title>Personager - Todos</title>
      </Head>
      <Grid container pb={3}>
        <Grid item xs={12}>
          <HeaderBar title="Todo lists" createFn={() => createTodoList(true)} />
        </Grid>
        <Grid item xs={12} justifyContent="center" container mt={5}>
          <TodosList />
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
    const { data: todos }: AxiosResponse<ITodoList[]> = await API.get(
      API_ROUTES.TODOS.ALL,
      { headers: { Authorization: getBearer(ctx.req.cookies) || "" } }
    );

    return { props: { hydrationData: { todosStore: { todos } } } };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        ctx.res.setHeader(
          "Set-Cookie",
          `${COOKIES.JWT_TOKEN}=deleted; path=/; Max-Age=0, expires=0`
        );
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

export default observer(TodoLists);
