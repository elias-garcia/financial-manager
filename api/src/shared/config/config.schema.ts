import * as yup from "yup";

import { Config } from "./config.interface";

export const configSchema: yup.Schema<Config> = yup.object().shape({
  API_PORT: yup.number(),
  DB_URI: yup.string(),
  DB_NAME: yup.string()
});
