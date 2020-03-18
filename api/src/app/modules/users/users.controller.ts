import { singleton } from "tsyringe";
import { Request, Response, NextFunction } from "express";

import { UsersService } from "./users.service";
import { HttpOkResponse } from "../../shared/http/http-ok-response.type";
import { CreateUserDto } from "./dtos/create-user-dto.interface";
import { UserDtoConverter } from "./dtos/user.dto-converter";
import { UserDto } from "./dtos/user-dto.interface";
import { ValidationService } from "../../shared/validation/validation.service";
import { idParamValidationSchema } from "../../shared/validation/id-param.validation-schema";

@singleton()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userDtoConverter: UserDtoConverter,
    private readonly validationService: ValidationService
  ) {}

  async post(
    request: Request,
    response: Response<HttpOkResponse<UserDto>>,
    next: NextFunction
  ): Promise<Response<HttpOkResponse<UserDto>> | void> {
    try {
      const createUserDto: CreateUserDto = this.userDtoConverter.toCreateUserDto(
        request.body
      );
      const userDocument = await this.usersService.createUser(createUserDto);
      const userDto = this.userDtoConverter.toUserDto(userDocument);
      return response.status(200).json({ data: userDto });
    } catch (error) {
      return next(error);
    }
  }

  async getOne(
    request: Request,
    response: Response<HttpOkResponse<UserDto>>,
    next: NextFunction
  ): Promise<Response<HttpOkResponse<UserDto>> | void> {
    try {
      const userId = this.validationService.validate(
        request.params.id,
        idParamValidationSchema
      );
      const userDocument = await this.usersService.findUser(userId);
      const userDto = this.userDtoConverter.toUserDto(userDocument);
      return response.status(200).json({ data: userDto });
    } catch (error) {
      return next(error);
    }
  }
}
