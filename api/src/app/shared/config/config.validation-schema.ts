import * as yup from "yup";

import { Config } from "./config.interface";

export const configValidationSchema: yup.Schema<Config> = yup.object().shape({
  API_PORT: yup.number().required(),
  DB_URI: yup.string().required()
});
