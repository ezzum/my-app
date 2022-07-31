import { FC, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import { or } from "ramda";

import { Errors } from "../FormView";

type TextInputProps = {
  label: string;
  value?: string;
  error?: Errors[string];
};

export const TextInput: FC<TextInputProps> = ({
  label,
  value = "",
  error,
  ...props
}) => {
  const isError = Boolean(error?.errorMessage);
  const errorMessage = error?.errorMessage as string;

  const preparedLabel = useMemo(
    () => or(errorMessage, label),
    [errorMessage, label]
  );

  return (
    <Box mb={1}>
      <TextField
        {...props}
        label={preparedLabel}
        value={value}
        fullWidth
        inputProps={{ maxLength: 10 }}
        error={isError}
      />
    </Box>
  );
};
