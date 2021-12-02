import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { ReminderListItem } from "@components/ReminderListItem";
import { useStore } from "@stores";

const RemindersList: FC = () => {
  const {
    remindersStore: { reminders, newReminder },
  } = useStore();

  return (
    <Grid container sx={{ maxWidth: "500px", width: "100%" }} rowGap={2}>
      {newReminder && (
        <Grid item xs={12} mb={8}>
          <ReminderListItem reminder={newReminder} />
        </Grid>
      )}
      {!reminders?.length ? (
        <Typography>No reminders...</Typography>
      ) : (
        reminders.map((reminder) => (
          <Grid key={reminder.id} item xs={12}>
            <ReminderListItem reminder={reminder} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default observer(RemindersList);
