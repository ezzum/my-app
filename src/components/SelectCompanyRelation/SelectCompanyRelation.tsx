import { FC } from "react";

import { ApplicantIndividualCompanyRelation } from "../../generated/graphql";

import { CustomSelect } from "../CustomSelect";
import { Errors } from "../FormView";

type SelectCompanyRelationProps = {
  options: ApplicantIndividualCompanyRelation[];
  error?: Errors[string];
};

export const SelectCompanyRelation: FC<SelectCompanyRelationProps> = ({
  options,
  error,
  ...props
}) => <CustomSelect {...props} multiple options={options} label="Relations" error={error} />;
