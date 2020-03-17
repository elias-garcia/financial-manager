import { Model, FilterQuery } from "mongoose";

import { Document } from "./document.type";

export class GenericRepository<T> {
  constructor(private readonly model: Model<Document<T>>) {}

  async createOne(document: T): Promise<Document<T>> {
    return this.model.create(document);
  }

  async findById(id: string): Promise<Document<T>> {
    const document: Document<T> | null = await this.model.findById(id);
    if (document === null) {
      throw new Error();
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
    newDocument: T
  ): Promise<Document<T>> {
    const document: Document<T> = await this.findById(id);
    await document.update(newDocument).exec();
    return document;
  }

  async deleteOne(id: Document<T>["_id"]): Promise<void> {
    const document: Document<T> = await this.findById(id);
    await document.remove(id);
  }
}
