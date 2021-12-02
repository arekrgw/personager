import ChipDateDisplay from "@components/ChipDateDisplay";
import { Box, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";

type ReadonlyItemProps = {
  event: IEvent;
};

const ReadonlyItem: FC<ReadonlyItemProps> = ({ event }) => {
  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h4">{event.name}</Typography>
      <ChipDateDisplay
        startDate={event.startDate}
        endDate={event.endDate}
        sx={{ my: 1 }}
      />
      <Typography component="p" variant="body1">
        {event.description || "No description..."}
      </Typography>
    </Paper>
  );
};

export default observer(ReadonlyItem);
