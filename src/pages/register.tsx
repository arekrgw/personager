import Link from "@components/Link";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import PasswordInput from "@components/PasswordInput";
import * as yup from "yup";

const schema = yup.object().shape({
  login: yup.string().min(4).required(),
  password: yup.string().min(6).required(),
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  email: yup.string().email().required(),
});

const Register: NextPage = ({}) => {
  const { authStore } = useStore();
  const router = useRouter();
  const theme = useTheme();
  const { control, handleSubmit } = useForm<IRegisterCredentials>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterCredentials> = useCallback(
    async (values) => {
      if (await authStore.register({ values })) router.replace("/login");
    },
    [authStore, router]
  );

  useEffect(() => authStore.clearServerError);

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#5114c3",
          background: "radial-gradient(circle, #5114c3 0%, #240b36 100%)",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square elevation={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
            mx: 4,
          }}
        >
          <Typography component="h1" variant="h3">
            Personager
          </Typography>
          <Typography component="h1" variant="h5">
            Create account
          </Typography>

          <Box
            component="form"
            mt={3}
            sx={{ width: "100%" }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="login"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  error={Boolean(fieldState.error)}
                  autoComplete="login"
                  autoFocus
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  autoComplete="email"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="firstName"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First name"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  autoComplete="firstName"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last name"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  autoComplete="lastName"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <PasswordInput
                  margin="normal"
                  required
                  fullWidth
                  inputRef={ref}
                  id="password"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  label="Password"
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
            {authStore.serverError && (
              <Box>
                <Typography
                  component="p"
                  sx={{ color: theme.palette.error.main }}
                >
                  {authStore.serverError}
                </Typography>
              </Box>
            )}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={authStore.isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Box>
              <Link
                href="/login"
                variant="body2"
                sx={{ textAlign: "center", width: "100%", display: "block" }}
              >
                {"Already have an account? Login!"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Register);
