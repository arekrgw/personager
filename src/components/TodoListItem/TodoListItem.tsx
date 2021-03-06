import { Paper } from "@mui/material";
import { FC, useState } from "react";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type TodoListItemProps = {
  todoList: ITodoList;
};

const TodoListItem: FC<TodoListItemProps> = ({ todoList }) => {
  const [editMode, setEditMode] = useState(!todoList.id);

  return (
    <Paper elevation={!todoList.id ? 8 : 3}>
      {editMode ? (
        <EditMode
          todoList={todoList}
          isEditMode={editMode}
          setEditMode={setEditMode}
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
