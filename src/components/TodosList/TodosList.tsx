import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TodoListItem } from "@components/TodoListItem";
import { useStore } from "@stores";

const TodosLists: FC = () => {
  const {
    todosStore: { todos },
  } = useStore();

  return (
    <Grid container sx={{ maxWidth: "500px", width: "100%" }} rowGap={2}>
      {/* {newEvent && (
        <Grid item xs={12} mb={8}>
          <EventsListItem event={newEvent} />
        </Grid>
      )} */}
      {!todos?.length ? (
        <Typography>No events...</Typography>
      ) : (
        todos.map((todoList) => (
          <Grid key={todoList.id} item xs={12}>
            <TodoListItem todoList={todoList} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default observer(TodosLists);
