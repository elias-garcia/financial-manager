import { Router } from "express";

export class GenericRouter {
  constructor(
    private readonly rootPath: string,
    private readonly router: Router
  ) {}

  getRootPath(): string {
    return this.rootPath;
  }

  getRouter(): Router {
    return this.router;
  }
}
