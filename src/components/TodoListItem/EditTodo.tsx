import { IconButton, InputAdornment, TextField, Box } from "@mui/material";
import { Check } from "@mui/icons-material";
import { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";

type EditTodoProps = {
  todo: ITodo;
  todoListId: string;
};

type TodoEditForm = {
  temporaryValue: string;
};

const EditTodo: FC<EditTodoProps> = ({ todo, todoListId }) => {
  const {
    todosStore: { updateTodo, setEditableId },
  } = useStore();
  const { control, handleSubmit } = useForm<TodoEditForm>({
    defaultValues: { temporaryValue: todo.description },
  });

  const submit = useCallback(
    (values: TodoEditForm) => {
      if (todo.description !== values.temporaryValue) {
        updateTodo(todoListId, todo.id, {
          description: values.temporaryValue,
        });
      }
      setEditableId("");
    },
    [updateTodo, todo.description, todo.id, todoListId, setEditableId]
  );

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="temporaryValue"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TextField
            size="small"
            fullWidth
            autoFocus
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSubmit(submit)}
                    edge="end"
                  >
                    <Check />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
    </Box>
  );
};

export default observer(EditTodo);
