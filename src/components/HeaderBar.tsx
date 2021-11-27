import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";

type HeaderBarProps = {
  createFn?: () => void;
  title: string;
};

const HeaderBar: FC<HeaderBarProps> = ({ createFn, title }) => {
  return (
    <Paper
      square
      elevation={3}
      sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
    >
      <Typography variant="h4">{title}</Typography>
      {createFn && (
        <Button color="info" variant="outlined" onClick={createFn}>
          Create
        </Button>
      )}
    </Paper>
  );
};

export default HeaderBar;
