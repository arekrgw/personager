import { Box, TextField, Typography } from "@mui/material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import BottomToolbar from "./BottomToolbar";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
});

type EditModeProps = {
  todoList: ITodoList;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  saveTodoList: (todoList: ITodoList) => Promise<boolean>;
};

const EditMode: FC<EditModeProps> = ({
  todoList,
  saveTodoList,
  isEditMode,
  setEditMode,
}) => {
  const { control, handleSubmit } = useForm<ITodoList>({
    defaultValues: { ...todoList },
    resolver: yupResolver(schema),
  });

  const {
    todosStore: { clearServerError, serverError, createTodoList },
  } = useStore();

  const onSubmit: SubmitHandler<ITodoList> = useCallback(
    async (values) => {
      console.log(values);
      if ((await saveTodoList(values)) && values.id) setEditMode(false);
    },
    [saveTodoList, setEditMode]
  );

  useEffect(() => clearServerError, [clearServerError]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ p: 3 }}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="name"
              label="Name"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              autoComplete="name"
              autoFocus
              {...field}
            />
          )}
        />
        {serverError && (
          <Typography component="p" sx={{ color: "error.main" }}>
            {serverError}
          </Typography>
        )}
      </Box>
      <BottomToolbar
        isEditMode={isEditMode}
        setEditMode={todoList.id ? setEditMode : createTodoList}
        todoList={todoList}
      />
    </Box>
  );
};

export default observer(EditMode);
