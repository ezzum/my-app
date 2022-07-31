import { FC, SyntheticEvent, useCallback, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  TextField,
} from "@mui/material";
import { prop, or } from "ramda";

import {
  ApplicantIndividualCompanyPosition,
  ApplicantIndividualCompanyRelation,
} from "../../generated/graphql";

import { Errors } from "../FormView";

type Option =
  | ApplicantIndividualCompanyRelation
  | ApplicantIndividualCompanyPosition;

type CustomSelectProps = {
  options: Array<Option>;
  label: string;
  multiple?: boolean;
  error?: Errors[string];
  onChange?: (value: Option | Option[] | null) => void;
};

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  label,
  multiple,
  error,
  onChange,
}) => {
  const isError = Boolean(error?.errorMessage);
  const errorMessage = error?.errorMessage as string;

  const preparedLabel = useMemo(
    () => or(errorMessage, label),
    [errorMessage, label]
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField {...params} label={preparedLabel} error={isError} />
    ),
    [isError, preparedLabel]
  );

  const getOptionLabel = useCallback(
    (option: Option) => prop("name", option),
    []
  );

  const handleChange = useCallback(
    (
      _event: SyntheticEvent<Element, Event>,
      value: Option | Option[] | null
    ) => {
      if (onChange) onChange(value);
    },
    [onChange]
  );

  return (
    <Box mb={1}>
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={renderInput}
        onChange={handleChange}
      />
    </Box>
  );
};
