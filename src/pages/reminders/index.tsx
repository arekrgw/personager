import { API, API_ROUTES, getBearer } from "@app/api";
import { Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import HeaderBar from "@components/HeaderBar";
import RemindersList from "@components/RemindersList/RemindersList";

const Events: NextPage = () => {
  const {
    remindersStore: { createReminder },
  } = useStore();
  return (
    <Grid container pb={3}>
      <Grid item xs={12}>
        <HeaderBar title="Reminders" createFn={() => createReminder(true)} />
      </Grid>
      <Grid item xs={12} justifyContent="center" container mt={5}>
        <RemindersList />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps<{
  hydrationData: IStoreHydrationData;
}> = async (ctx) => {
  try {
    const { data: reminders }: AxiosResponse<IReminder[]> = await API.get(
      API_ROUTES.REMINDERS.ALL,
      { headers: { Authorization: getBearer(ctx.req.cookies) || "" } }
    );

    return { props: { hydrationData: { remindersStore: { reminders } } } };
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

    return { props: { hydrationData: { remindersStore: { reminders: [] } } } };
  }
};

export default observer(Events);
