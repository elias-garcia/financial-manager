import { Model, FilterQuery } from "mongoose";

import { Document } from "./document.type";
import { DocumentNotFoundError } from "./document-not-found.error";

export class GenericRepository<T> {
  constructor(private readonly model: Model<Document<T>>) {}

  async createOne(
    document: Omit<T, "createdAt" | "updatedAt">
  ): Promise<Document<T>> {
    return this.model.create(document);
  }

  async findOneById(id: string): Promise<Document<T>> {
    const document: Document<T> | null = await this.model.findById(id);
    if (document === null) {
      throw new DocumentNotFoundError(this.model.modelName, id);
    }
    return document;
  }

  async findMany(
    query: FilterQuery<Document<T>>,
    skip: number,
    limit: number
  ): Promise<Document<T>[]> {
    return this.model
      .find(query)
      .skip(skip)
      .limit(limit);
  }

  async updateOne(
    id: Document<T>["_id"],
    newDocument: Partial<T>
  ): Promise<Document<T>> {
    const document: Document<T> = await this.findOneById(id);
    await document.update(newDocument).exec();
    return document;
  }

  async deleteOne(id: Document<T>["_id"]): Promise<void> {
    const document: Document<T> = await this.findOneById(id);
    await document.remove(id);
  }
}
