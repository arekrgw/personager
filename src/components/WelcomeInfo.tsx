import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@components/Clock"), { ssr: false });

const WelcomeInfo: FC = () => {
  return (
    <Stack>
      <Typography variant="h3" fontWeight="fontWeightMedium">
        Welcome!
      </Typography>
      <Typography variant="h4">Today is {dayjs().format("dddd")}</Typography>
      <Clock />
    </Stack>
  );
};

export default WelcomeInfo;
