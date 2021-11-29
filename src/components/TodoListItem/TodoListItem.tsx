import { Paper, Box, IconButton, Stack, Chip } from "@mui/material";
import { FC, useState } from "react";
import { Edit, Comment, Delete } from "@mui/icons-material";
import { useStore } from "@stores";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type TodoListItemProps = {
  todoList: ITodoList;
};

const TodoListItem: FC<TodoListItemProps> = ({ todoList }) => {
  const {
    todosStore: { deleteTodoList, toggleTodo, saveTodoList },
  } = useStore();

  const [editMode, setEditMode] = useState(!todoList.id);

  return (
    <Paper elevation={!todoList.id ? 8 : 3}>
      {editMode ? (
        <EditMode
          todoList={todoList}
          isEditMode={editMode}
          setEditMode={setEditMode}
          saveTodoList={saveTodoList}
        />
      ) : (
        <ViewMode
          todoList={todoList}
          isEditMode={editMode}
          deleteTodoList={deleteTodoList}
          setEditMode={setEditMode}
          toggleTodo={toggleTodo}
        />
      )}
    </Paper>
  );
};

export default TodoListItem;
