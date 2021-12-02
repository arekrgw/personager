import { Box, Button, IconButton } from "@mui/material";
import { FC } from "react";
import { Edit, Delete } from "@mui/icons-material";

type BottomToolbarProps = {
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteEvent?: (id: string) => Promise<void>;
  event: IEvent | IEventSave;
};

const BottomToolbar: FC<BottomToolbarProps> = ({
  isEditMode,
  setEditMode,
  deleteEvent,
  event,
}) => {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "grey.400",
        px: 3,
        py: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isEditMode ? (
        <>
          <Button type="submit">Save</Button>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <IconButton onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            edge="end"
            onClick={() => event.id && deleteEvent?.(event.id)}
          >
            <Delete />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default BottomToolbar;
