import { Chip, Paper, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import dayjs from "dayjs";

type ReadonlyItemProps = {
  reminder: Omit<IReminder, "resolvers">;
};

const ReadonlyItem: FC<ReadonlyItemProps> = ({ reminder }) => {
  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Chip
        label={dayjs(reminder.targetDate).format("DD.MM.YYYY HH:mm")}
        color="primary"
        sx={{ mb: 0.5 }}
        size="small"
      />
      <Typography variant="h4" sx={{ mb: 1 }}>
        {reminder.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {reminder.description}
      </Typography>
    </Paper>
  );
};

export default observer(ReadonlyItem);
