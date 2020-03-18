import * as yup from "yup";

import { CreateUserDto } from "./create-user-dto.interface";

export const createUserDtoValidationSchema: yup.Schema<CreateUserDto> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  });
