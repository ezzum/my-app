import { FC, useCallback, useMemo, useState } from "react";
import { Form } from "antd";
import { Button, Card, CardHeader, Grid } from "@mui/material";
import { head, map, pathOr, mergeAll, or } from "ramda";

import { FieldData, ValidateErrorEntity } from "rc-field-form/lib/interface";

import {
  ApplicantIndividualCompanyPosition,
  ApplicantIndividualCompanyRelation,
  usePositionsQuery,
  useRelationsQuery,
} from "../../generated/graphql";

import { SelectCompanyRelation } from "../SelectCompanyRelation";
import { SelectCompanyPosition } from "../SelectCompanyPosition";
import { TextInput } from "../TextInput";
import { TextArea } from "../TextArea";

type Values = {
  relations: ApplicantIndividualCompanyRelation[];
  position: ApplicantIndividualCompanyPosition;
  textInput: string;
  textArea: string;
};

export type Errors = {
  [field: string]: {
    errorMessage: string | undefined;
  };
};

const FIELDS = {
  RELATIONS: "relations",
  POSITION: "position",
  TEXT_INPUT: "textInput",
  TEXT_AREA: "textArea",
};

export const FormView: FC = () => {
  const { data: relationsData } = useRelationsQuery();
  const { data: positionsData } = usePositionsQuery();

  const [errors, setErrors] = useState<Errors>({});

  const relations = useMemo(
    () =>
      pathOr<ApplicantIndividualCompanyRelation[]>(
        [],
        ["relations", "data"],
        relationsData
      ),
    [relationsData]
  );

  const positions = useMemo(
    () =>
      pathOr<ApplicantIndividualCompanyPosition[]>(
        [],
        ["positions", "data"],
        positionsData
      ),
    [positionsData]
  );

  const onFinish = (values: Values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
    console.log("Failed:", errorInfo);

    const { errorFields } = errorInfo;
   
    const errors = map(({ name, errors }) => {
      const field = head(name) as string;
      return {
        [field]: {
          errorMessage: head(errors),
        },
      };
    }, errorFields);

    setErrors(mergeAll(errors));
  };

  const handleFieldsChange = useCallback((_: any, allFields: FieldData[]) => {
    const errors = map((item) => {
      const name = item.name as string[];
      const errors = item.errors as string[];
      const field = or(head(name), "");

      return {
        [field]: {
          errorMessage: head(errors),
        },
      };
    }, allFields);

    setErrors(mergeAll(errors));
  }, []);

  return (
    <Form
      name="form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={handleFieldsChange}
    >
      <Card sx={{ p: 3, maxWidth: 500, m: "10% auto" }}>
        <Grid container>
          <Grid item md={4} xs={12}>
            <CardHeader title="Form" />
          </Grid>
          <Grid item md={8} xs={12}>
            <Form.Item
              help
              name={FIELDS.RELATIONS}
              rules={[
                {
                  required: true,
                  message: "Please select relations!",
                },
              ]}
            >
              <SelectCompanyRelation
                options={relations}
                error={errors[FIELDS.RELATIONS]}
              />
            </Form.Item>
            <Form.Item
              help
              name={FIELDS.POSITION}
              rules={[
                {
                  required: true,
                  message: "Please select position!",
                },
              ]}
            >
              <SelectCompanyPosition
                options={positions}
                error={errors[FIELDS.POSITION]}
              />
            </Form.Item>
            <Form.Item
              help
              name={FIELDS.TEXT_INPUT}
              rules={[
                {
                  required: true,
                  message: "Please enter  5 to 10 characters!",
                  min: 5,
                },
              ]}
            >
              <TextInput label="TextInput" error={errors[FIELDS.TEXT_INPUT]} />
            </Form.Item>
            <Form.Item
              help
              name={FIELDS.TEXT_AREA}
              rules={[
                {
                  required: true,
                  message: "Please enter  5 to 10 characters!",
                  min: 5,
                },
              ]}
            >
              <TextArea label="TextArea" error={errors[FIELDS.TEXT_AREA]} />
            </Form.Item>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Form>
  );
};
