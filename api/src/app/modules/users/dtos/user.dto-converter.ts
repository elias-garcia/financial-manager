import { singleton } from "tsyringe";

import { CreateUserDto } from "./create-user-dto.interface";
import { User } from "../user.interface";
import { createUserDtoValidationSchema } from "./create-user-dto.validation-schema";
import { Document } from "../../../shared/database/document.type";
import { UserDto } from "./user-dto.interface";
import { ValidationService } from "../../../shared/validation/validation.service";

@singleton()
export class UserDtoConverter {
  constructor(private readonly validationService: ValidationService) {}

  // tslint:disable-next-line: no-any
  toCreateUserDto(raw: any): CreateUserDto {
    return this.validationService.validate<CreateUserDto>(
      raw,
      createUserDtoValidationSchema
    );
  }

  toUserDto(document: Document<User>): UserDto {
    return {
      // tslint:disable-next-line: no-unsafe-any
      id: document.id,
      email: document.email,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    };
  }
}
