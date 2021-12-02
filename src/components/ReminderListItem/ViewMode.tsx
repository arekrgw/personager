import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import BottomToolbar from "./BottomToolbar";
import EditResolver from "./EditResolver";
import dayjs from "dayjs";

type ViewModeProps = {
  reminder: IReminder;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const ViewMode: FC<ViewModeProps> = ({ reminder, isEditMode, setEditMode }) => {
  const {
    remindersStore: { setEditableId, editableId, deleteResolver },
  } = useStore();

  return (
    <>
      <Box sx={{ p: 3 }}>
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
        <Typography variant="body2">Resolvers:</Typography>
        <List sx={{ width: "100%" }}>
          {reminder.resolvers.map((resolver) => (
            <ListItem
              key={resolver.id}
              sx={{ pl: 0, py: 0 }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteResolver(resolver.id, reminder.id)}
                >
                  <Clear />
                </IconButton>
              }
            >
              <ListItemText id={resolver.id}>
                {editableId === resolver.id ? (
                  <EditResolver resolver={resolver} reminderId={reminder.id} />
                ) : (
                  <Box onClick={() => setEditableId(resolver.id)}>
                    <Chip
                      label={dayjs(resolver.whence).format("DD.MM.YYYY HH:mm")}
                      color="warning"
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                    <Chip
                      label={`${dayjs(resolver.whence).to(
                        reminder.targetDate,
                        true
                      )} before`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <BottomToolbar
        isEditMode={isEditMode}
        setEditMode={setEditMode}
        reminder={reminder}
      />
    </>
  );
};

export default observer(ViewMode);
