import { Model, FilterQuery, Types } from "mongoose";
import { Document } from "./document.type";

export class GenericRepository<T> {
  private model: Model<Document<T>>;

  constructor(model: Model<Document<T>>) {
    this.model = model;
  }

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
    return document.update(newDocument).exec();
  }

  async deleteOne(id: Document<T>["_id"]): Promise<void> {
    const document: Document<T> = await this.findById(id);
    await document.remove(id);
  }
}
