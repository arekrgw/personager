import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import BottomToolbar from "./BottomToolbar";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { DateTimePicker } from "@mui/lab";
import dayjs, { Dayjs } from "dayjs";

const schema = yup.object().shape({
  title: yup.string().min(3).required(),
  targetDate: yup
    .string()
    .required()
    .test({
      name: "target date",
      message: "target date should not be in the past",
      test: function (value) {
        if (!dayjs(value).isValid()) return false;
        if (dayjs(value).isBefore(dayjs())) return false;

        return true;
      },
    }),
});

type EditModeProps = {
  reminder: IReminder;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const EditMode: FC<EditModeProps> = ({ reminder, isEditMode, setEditMode }) => {
  const { control, handleSubmit } = useForm<IReminder>({
    defaultValues: { ...reminder },
    resolver: yupResolver(schema),
  });

  const {
    remindersStore: {
      clearServerError,
      serverError,
      createReminder,
      saveReminder,
    },
  } = useStore();

  const onSubmit: SubmitHandler<IReminder> = useCallback(
    async (values) => {
      if ((await saveReminder(values)) && values.id) setEditMode(false);
    },
    [saveReminder, setEditMode]
  );

  useEffect(() => clearServerError, [clearServerError]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ p: 3 }}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="name"
              label="Title"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              autoComplete="title"
              autoFocus
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="name"
              label="Description"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              autoComplete="description"
              autoFocus
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="targetDate"
          render={({ field: { onChange, ...field }, fieldState }) => (
            <DateTimePicker
              ampm={false}
              inputFormat="DD.MM.YYYY HH:mm"
              mask="__.__.____ __:__"
              renderInput={({ error, ...props }: TextFieldProps) => (
                <TextField
                  margin="normal"
                  size="small"
                  fullWidth
                  error={Boolean(fieldState.error) || error}
                  helperText={fieldState.error?.message}
                  autoComplete="targetDate"
                  required
                  id="targetDate"
                  {...props}
                />
              )}
              label="Target date"
              onChange={(date) => {
                onChange(
                  (date as unknown as Dayjs)?.format("YYYY-MM-DD HH:mm:ss")
                );
              }}
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
        setEditMode={reminder.id ? setEditMode : createReminder}
        reminder={reminder}
      />
    </Box>
  );
};

export default observer(EditMode);
