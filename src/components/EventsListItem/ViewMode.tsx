import ChipDateDisplay from "@components/ChipDateDisplay";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import BottomToolbar from "./BottomToolbar";

type ViewModeProps = {
  event: IEvent;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteEvent: (id: string) => Promise<void>;
};

const ViewMode: FC<ViewModeProps> = ({
  event,
  isEditMode,
  setEditMode,
  deleteEvent,
}) => {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">{event.name}</Typography>
        <ChipDateDisplay
          startDate={event.startDate}
          endDate={event.endDate}
          sx={{ my: 1 }}
        />
        <Typography component="p" variant="body1">
          {event.description || "No description..."}
        </Typography>
      </Box>
      <BottomToolbar
        isEditMode={isEditMode}
        setEditMode={setEditMode}
        event={event}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

export default ViewMode;
