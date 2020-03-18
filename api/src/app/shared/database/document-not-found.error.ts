export class DocumentNotFoundError extends Error {
  constructor(readonly modelName: string, readonly id: string) {
    super(`Document with id ${id} not found for model ${modelName}`);
    this.name = this.constructor.name;
  }
}
