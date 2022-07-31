import { FC } from "react";

import { ApplicantIndividualCompanyPosition } from "../../generated/graphql";

import { CustomSelect } from "../CustomSelect";
import { Errors } from "../FormView";

type SelectCompanyPositionProps = {
  options: ApplicantIndividualCompanyPosition[];
  error?: Errors[string];
};

export const SelectCompanyPosition: FC<SelectCompanyPositionProps> = ({
  options,
  error,
  ...props
}) => <CustomSelect {...props} options={options} label="Position" error={error} />;
