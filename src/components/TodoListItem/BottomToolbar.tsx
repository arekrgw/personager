import { Box, Button, IconButton } from "@mui/material";
import { FC } from "react";
import { Edit, Add, Delete } from "@mui/icons-material";
import { useStore } from "@stores";

type BottomToolbarProps = {
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  todoList: ITodoList;
};

const BottomToolbar: FC<BottomToolbarProps> = ({
  isEditMode,
  setEditMode,
  todoList,
}) => {
  const {
    todosStore: { addNewTodo, deleteTodoList },
  } = useStore();
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
          <IconButton onClick={() => addNewTodo(todoList.id)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            edge="end"
            onClick={() => todoList.id && deleteTodoList(todoList.id)}
          >
            <Delete />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default BottomToolbar;
