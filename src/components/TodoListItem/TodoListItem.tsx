import { Paper } from "@mui/material";
import { FC, useState } from "react";
import { useStore } from "@stores";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type TodoListItemProps = {
  todoList: ITodoList;
};

const TodoListItem: FC<TodoListItemProps> = ({ todoList }) => {
  const {
    todosStore: { saveTodoList },
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
          setEditMode={setEditMode}
        />
      )}
    </Paper>
  );
};

export default TodoListItem;
