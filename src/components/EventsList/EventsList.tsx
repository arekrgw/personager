import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import EventsListItem from "./EventsListItem";

type EventsListProps = {
  events: IEvent[] | null;
};

const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <Grid container sx={{ maxWidth: "500px", width: "100%" }} rowGap={2}>
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
