import Link from "@components/Link";
import { Grid, Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useStore } from "@stores";
import { NextPage } from "next";

const Login: NextPage = () => {
  const { authStore } = useStore();
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
          <Typography component="h1" variant="h4">
            Personager Login
          </Typography>

          <Box mt={3}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                authStore.login({ values: { login: "arekrgw", password: "qwerty" } })
              }
            >
              Login
            </Button>
            <Box>
              <Link
                href="/"
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

export default Login;
