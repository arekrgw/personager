import { Paper, Typography, Box, IconButton } from "@mui/material";
import { FC } from "react";
import { Edit, Comment, Delete } from "@mui/icons-material";
import IconButtonLink from "@components/IconButtonLink";
import { useStore } from "@stores";

type EventListItemProps = {
  event: IEvent;
};

const EventListItem: FC<EventListItemProps> = ({ event }) => {
  const {
    eventsStore: { deleteEvent },
  } = useStore();
  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">{event.name}</Typography>
        <Typography component="p" variant="body1">
          {event.description || "No description..."}
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "grey.400",
          px: 3,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton edge="start">
          <Comment />
        </IconButton>
        <Box>
          <IconButtonLink href={`/events/edit/${event.id}`}>
            <Edit />
          </IconButtonLink>
          <IconButton
            color="error"
            edge="end"
            onClick={() => deleteEvent(event.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventListItem;
