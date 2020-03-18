import { singleton } from "tsyringe";
import { Schema, ValidateOptions } from "yup";

@singleton()
export class ValidationService {
  private readonly validateOptions: ValidateOptions = {
    strict: true,
    stripUnknown: true
  };

  // tslint:disable-next-line: no-any
  validate<T>(raw: any, schema: Schema<T>): T {
    return schema.validateSync(raw, this.validateOptions);
  }
}
