import Link from "@components/Link";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  useTheme,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import PasswordInput from "@components/PasswordInput";

const Login: NextPage = ({}) => {
  const { authStore } = useStore();
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const theme = useTheme();
  const { control, handleSubmit } = useForm<ILoginCredentials>({
    defaultValues: { login: "", password: "" },
  });

  const onSubmit: SubmitHandler<ILoginCredentials> = useCallback(
    async (values) => {
      if (await authStore.login({ values })) {
        setShowSuccessAlert(true);
        router.replace("/");
      }
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
          backgroundColor: "rgb(63,94,251)",
          background: "radial-gradient(circle, #c31432 0%, #240b36 100%)",
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
          <Typography component="h1" variant="h3" textAlign="center">
            Personager login
          </Typography>

          <Box
            component="form"
            mt={3}
            sx={{ width: "100%" }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {showSuccessAlert && (
              <Alert severity="success">
                <AlertTitle>Login successful</AlertTitle>
                You will be redirected shortly
              </Alert>
            )}
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
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  error={Boolean(fieldState.error)}
                  label="Password"
                  autoComplete="current-password"
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
              Login
            </LoadingButton>
            <Box>
              <Link
                href="/register"
                variant="body2"
                sx={{ textAlign: "center", width: "100%", display: "block" }}
              >
                {"Don't have an account? Register!"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Login);
