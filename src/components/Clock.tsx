import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

const Clock: FC = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const handler = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(handler);
  }, []);
  return <Typography variant="h4">{time.format("HH:mm:ss")}</Typography>;
};

export default Clock;
