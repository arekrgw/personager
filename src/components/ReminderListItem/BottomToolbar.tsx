import { Box, Button, IconButton } from "@mui/material";
import { FC, useMemo } from "react";
import { Edit, Add, Delete } from "@mui/icons-material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";

type BottomToolbarProps = {
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  reminder: IReminder;
};

const BottomToolbar: FC<BottomToolbarProps> = ({
  isEditMode,
  setEditMode,
  reminder,
}) => {
  const {
    remindersStore: { addNewResolver, deleteReminder },
  } = useStore();

  const isNewAdding = useMemo(() => {
    return !!reminder.resolvers.find((res) => res.id === "-1");
  }, [reminder.resolvers]);

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
          <IconButton
            onClick={() => addNewResolver(reminder.id)}
            disabled={isNewAdding}
          >
            <Add />
          </IconButton>
          <IconButton onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            edge="end"
            onClick={() => reminder.id && deleteReminder(reminder.id)}
          >
            <Delete />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default observer(BottomToolbar);
