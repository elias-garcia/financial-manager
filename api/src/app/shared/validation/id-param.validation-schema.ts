import * as yup from "yup";

export const idParamValidationSchema: yup.Schema<string> = yup
  .string()
  .required();
