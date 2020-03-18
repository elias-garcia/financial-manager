import { Router } from "express";
import { injectable } from "tsyringe";

import { UsersController } from "./users.controller";
import { GenericRouter } from "../../shared/routing/generic.router";

@injectable()
export class UsersRouter extends GenericRouter {
  constructor(private readonly usersController: UsersController) {
    super(
      "/users",
      Router()
        .get("/:id", (req, res, next) =>
          this.usersController.getOne(req, res, next)
        )
        .post("/", (req, res, next) =>
          this.usersController.post(req, res, next)
        )
    );
  }
}
