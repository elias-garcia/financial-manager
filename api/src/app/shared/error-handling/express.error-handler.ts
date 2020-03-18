import { Response, Request, NextFunction } from "express";

import { HttpErrorResponse } from "../http/http-error-response.type";
import { ValidationError } from "yup";
import { injectable } from "tsyringe";
import { DocumentNotFoundError } from "../database/document-not-found.error";

@injectable()
export class ExpressErrorHandler {
  routeNotFoundErrorHandler(
    _request: Request,
    response: Response<HttpErrorResponse<string | string[]>>,
    _next: NextFunction
  ): Response<HttpErrorResponse<string | string[]>> {
    return response.status(404).json({ message: "Resource not found" });
  }

  globalErrorHandler(
    error: Error,
    _request: Request,
    response: Response<HttpErrorResponse<string | string[]>>,
    _next: NextFunction
  ): Response<HttpErrorResponse<string | string[]>> {
    if (error instanceof DocumentNotFoundError) {
      return response.status(404).json({ message: "Resource not found" });
    }
    if (error instanceof ValidationError) {
      return response.status(422).json({ message: error.errors });
    }
    return response.status(500).json({ message: "Internal server error" });
  }
}
