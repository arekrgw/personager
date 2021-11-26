import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC, useState, memo, forwardRef } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type PasswordInputProps = Omit<TextFieldProps, "type">;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ InputProps, ...allProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        ref={ref}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        {...allProps}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default memo(PasswordInput);
