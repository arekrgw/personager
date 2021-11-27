import { Paper, Box, IconButton, Stack, Chip } from "@mui/material";
import { FC, useState } from "react";
import { Edit, Comment, Delete } from "@mui/icons-material";
import { useStore } from "@stores";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type EventListItemProps = {
  event: IEvent | IEventSave;
};

const EventListItem: FC<EventListItemProps> = ({ event }) => {
  const {
    eventsStore: { deleteEvent, saveEvent },
  } = useStore();

  const [editMode, setEditMode] = useState(!event.id);

  return (
    <Paper elevation={!event.id ? 8 : 3}>
      {editMode ? (
        <EditMode
          event={event as IEventSave}
          isEditMode={editMode}
          setEditMode={setEditMode}
          saveEvent={saveEvent}
        />
      ) : (
        <ViewMode
          event={event as IEvent}
          isEditMode={editMode}
          deleteEvent={deleteEvent}
          setEditMode={setEditMode}
        />
      )}
    </Paper>
  );
};

export default EventListItem;
