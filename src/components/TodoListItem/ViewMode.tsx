import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import BottomToolbar from "./BottomToolbar";
import EditTodo from "./EditTodo";

type ViewModeProps = {
  todoList: ITodoList;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const ViewMode: FC<ViewModeProps> = ({ todoList, isEditMode, setEditMode }) => {
  const {
    todosStore: {
      setEditableId,
      editableId,
      toggleTodo,
      toggleTodoList,
      deleteTodo,
    },
  } = useStore();

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">{todoList.name}</Typography>
          <Checkbox
            checked={todoList.completed}
            onClick={() => toggleTodoList(todoList.id)}
            inputProps={{ "aria-labelledby": todoList.id }}
          />
        </Stack>
        <List sx={{ width: "100%" }}>
          {todoList.todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{ pl: 0, py: 0 }}
              onClick={() => setEditableId(todo.id)}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todoList.id, todo.id);
                  }}
                >
                  <Clear />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={todoList.completed || todo.completed}
                  disabled={todoList.completed}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTodo(todo.id, todoList.id);
                  }}
                  inputProps={{ "aria-labelledby": todo.id }}
                />
              </ListItemIcon>
              <ListItemText id={todo.id}>
                {editableId === todo.id ? (
                  <EditTodo todo={todo} todoListId={todoList.id} />
                ) : (
                  <Typography
                    sx={{
                      ...((todoList.completed || todo.completed) && {
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }),
                    }}
                  >
                    {todo.description}
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <BottomToolbar
        isEditMode={isEditMode}
        setEditMode={setEditMode}
        todoList={todoList}
      />
    </>
  );
};

export default observer(ViewMode);
