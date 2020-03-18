import { singleton } from "tsyringe";

import { GenericRepository } from "../../shared/database/generic.repository";
import { User } from "./user.interface";
import { userModel } from "./user.model";

@singleton()
export class UsersRepository extends GenericRepository<User> {
  constructor() {
    super(userModel);
  }
}
