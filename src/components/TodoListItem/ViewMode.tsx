import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import BottomToolbar from "./BottomToolbar";

type ViewModeProps = {
  todoList: ITodoList;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteTodoList: (id: string) => Promise<void>;
  toggleTodo: (todoId: string, todoListId: string) => Promise<void>;
};

const ViewMode: FC<ViewModeProps> = ({
  todoList,
  isEditMode,
  setEditMode,
  deleteTodoList,
  toggleTodo,
}) => {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">{todoList.name}</Typography>
        <List sx={{ width: "100%" }}>
          {todoList.todos.map((todo) => (
            <ListItem key={todo.id} disablePadding>
              <ListItemButton
                onClick={() => toggleTodo(todo.id, todoList.id)}
                dense
              >
                <ListItemIcon sx={{ minWidth: 42 }}>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                    inputProps={{ "aria-labelledby": todo.id }}
                  />
                </ListItemIcon>
                <ListItemText id={todo.id}>
                  <Typography
                    sx={{
                      ...(todo.completed && {
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }),
                    }}
                  >
                    {todo.description}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <BottomToolbar
        isEditMode={isEditMode}
        setEditMode={setEditMode}
        todoList={todoList}
        deleteTodoList={deleteTodoList}
      />
    </>
  );
};

export default observer(ViewMode);
