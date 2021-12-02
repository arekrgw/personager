import { Paper } from "@mui/material";
import { FC, useState } from "react";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type ReminderListItemItemProps = {
  reminder: IReminder;
};

const ReminderListItem: FC<ReminderListItemItemProps> = ({ reminder }) => {
  const [editMode, setEditMode] = useState(!reminder.id);

  return (
    <Paper elevation={!reminder.id ? 8 : 3}>
      {editMode ? (
        <EditMode
          reminder={reminder}
          isEditMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <ViewMode
          reminder={reminder}
          isEditMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </Paper>
  );
};

export default ReminderListItem;
