import {
  IconButton,
  TextField,
  Box,
  TextFieldProps,
  Stack,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { DateTimePicker } from "@mui/lab";
import dayjs, { Dayjs } from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  temporaryValue: yup
    .string()
    .required()
    .test({
      name: "resolver date",
      message: "enter valid date",
      test: function (value) {
        return dayjs(value).isValid();
      },
    }),
});

type EditResolverProps = {
  resolver: IReminderResolver;
  reminderId: string;
};

type ResolverEditForm = {
  temporaryValue: string;
};

const EditResolver: FC<EditResolverProps> = ({ resolver, reminderId }) => {
  const {
    remindersStore: { updateResolver, setEditableId, createResolver },
  } = useStore();
  const { control, handleSubmit } = useForm<ResolverEditForm>({
    defaultValues: { temporaryValue: resolver.whence },
    resolver: yupResolver(schema),
  });

  const submit = useCallback(
    (values: ResolverEditForm) => {
      console.log(values);
      if (resolver.whence !== values.temporaryValue) {
        if (resolver.id === "-1") {
          createResolver(reminderId, {
            whence: values.temporaryValue,
          } as IReminderResolver);
          return;
        }
        updateResolver(reminderId, resolver.id, {
          whence: values.temporaryValue,
        });
      }
      setEditableId("");
    },
    [
      reminderId,
      resolver.id,
      resolver.whence,
      setEditableId,
      updateResolver,
      createResolver,
    ]
  );

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(submit)}>
      <Stack direction="row" alignItems="center">
        <Controller
          control={control}
          name="temporaryValue"
          render={({ field: { onChange, ...field }, fieldState }) => (
            <DateTimePicker
              ampm={false}
              inputFormat="DD.MM.YYYY HH:mm"
              mask="__.__.____ __:__"
              renderInput={({ error, ...props }: TextFieldProps) => (
                <TextField
                  margin="normal"
                  size="small"
                  sx={{ mt: 1 }}
                  fullWidth
                  error={Boolean(fieldState.error) || error}
                  helperText={fieldState.error?.message}
                  autoComplete="temporaryValue"
                  required
                  id="temporaryValue"
                  {...props}
                />
              )}
              onChange={(date) => {
                onChange(
                  (date as unknown as Dayjs)?.format("YYYY-MM-DD HH:mm:ss")
                );
              }}
              {...field}
            />
          )}
        />
        <Box>
          <IconButton
            aria-label="accept change"
            onClick={handleSubmit(submit)}
            edge="end"
          >
            <Check />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default observer(EditResolver);
