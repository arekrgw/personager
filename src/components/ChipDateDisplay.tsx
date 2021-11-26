import { Chip, Stack, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import dayjs from "dayjs";
import { FC } from "react";

type ChipDateDisplayProps = {
  startDate: string;
  endDate: string;
  sx?: SxProps;
};

const ChipDateDisplay: FC<ChipDateDisplayProps> = ({
  startDate,
  endDate,
  sx,
}) => (
  <Stack direction="row" sx={sx}>
    {dayjs(startDate).isSame(endDate, "day") ? (
      <>
        <Chip
          label={dayjs(startDate).format("DD.MM.YYYY")}
          color="primary"
          sx={{ mr: 0.5 }}
          size="small"
        />
        <Chip
          label={`${dayjs(startDate).format("HH:mm")} - ${dayjs(endDate).format(
            "HH:mm"
          )}`}
          color="warning"
          size="small"
        />
      </>
    ) : (
      <>
        <Chip
          label={dayjs(startDate).format("DD.MM.YYYY")}
          color="primary"
          size="small"
          sx={{ mr: 0.5 }}
        />
        <Chip
          label={dayjs(startDate).format("HH:mm")}
          color="warning"
          size="small"
        />
        <Typography sx={{ mx: 1 }}>-</Typography>
        <Chip
          label={dayjs(endDate).format("DD.MM.YYYY")}
          color="primary"
          size="small"
          sx={{ mr: 0.5 }}
        />
        <Chip
          label={dayjs(endDate).format("HH:mm")}
          color="warning"
          size="small"
        />
      </>
    )}
  </Stack>
);

export default ChipDateDisplay;
