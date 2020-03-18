import { injectable } from "tsyringe";
import { hashSync, genSaltSync } from "bcrypt";

import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";
import { Document } from "../../shared/database/document.type";
import { CreateUserDto } from "./dtos/create-user-dto.interface";

@injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<Document<User>> {
    const hashedPassword: string = hashSync(
      createUserDto.password,
      genSaltSync()
    );
    return this.usersRepository.createOne({
      ...createUserDto,
      password: hashedPassword
    });
  }

  async findUser(userId: string): Promise<Document<User>> {
    return this.usersRepository.findOneById(userId);
  }
}
