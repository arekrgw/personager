import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { EventsListItem } from "@components/EventsListItem";
import { useStore } from "@stores";

const EventsList: FC = () => {
  const {
    eventsStore: { events, newEvent },
  } = useStore();

  return (
    <Grid container sx={{ maxWidth: "500px", width: "100%" }} rowGap={2}>
      {newEvent && (
        <Grid item xs={12} mb={8}>
          <EventsListItem event={newEvent} />
        </Grid>
      )}
      {!events?.length ? (
        <Typography>No events...</Typography>
      ) : (
        events.map((event) => (
          <Grid key={event.id} item xs={12}>
            <EventsListItem event={event} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default observer(EventsList);
