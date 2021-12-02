import DateTimePicker from "@mui/lab/DateTimePicker";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useStore } from "@stores";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import BottomToolbar from "./BottomToolbar";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  startDate: yup
    .string()
    .required()
    .test({
      name: "start end date",
      message: "start date should be before end date",
      test: function (value) {
        if (!value || !this.parent.endDate) return false;
        return dayjs(this.parent.endDate).isAfter(value);
      },
    }),
  endDate: yup
    .string()
    .required()
    .test({
      name: "end start date",
      message: "end date should be after start date",
      test: function (value) {
        if (!value || !this.parent.startDate) return false;
        return dayjs(this.parent.startDate).isBefore(value);
      },
    }),
});

type EditModeProps = {
  event: IEventSave;
  isEditMode: boolean;
  setEditMode: (editMode: boolean) => void;
  saveEvent: (event: IEventSave) => Promise<boolean>;
};

const EditMode: FC<EditModeProps> = ({
  event,
  saveEvent,
  isEditMode,
  setEditMode,
}) => {
  const { control, handleSubmit } = useForm<IEventSave>({
    defaultValues: { ...event },
    resolver: yupResolver(schema),
  });

  const {
    eventsStore: { clearServerError, serverError, createProcedure },
  } = useStore();

  const onSubmit: SubmitHandler<IEventSave> = useCallback(
    async (values) => {
      if ((await saveEvent(values)) && values.id) setEditMode(false);
    },
    [saveEvent, setEditMode]
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
        <Controller
          control={control}
          name="startDate"
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
                  autoComplete="startDate"
                  required
                  id="startDate"
                  {...props}
                />
              )}
              label="Start date"
              onChange={(date) => {
                onChange(
                  (date as unknown as Dayjs)?.format("YYYY-MM-DD HH:mm:ss")
                );
              }}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, ...field }, fieldState }) => (
            <DateTimePicker
              ampm={false}
              inputFormat="DD.MM.YYYY HH:mm"
              mask="__.__.____ __:__"
              renderInput={(props) => (
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  autoComplete="endDate"
                  id="endDate"
                  {...props}
                />
              )}
              label="End date"
              onChange={(date) => {
                onChange(
                  (date as unknown as Dayjs)?.format("YYYY-MM-DD HH:mm:ss")
                );
              }}
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
              fullWidth
              size="small"
              id="description"
              label="Description"
              multiline
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              autoComplete="description"
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
        setEditMode={event.id ? setEditMode : createProcedure}
        event={event}
      />
    </Box>
  );
};

export default observer(EditMode);
