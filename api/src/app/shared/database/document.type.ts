import { Document as MongooseDocument } from "mongoose";

export type Document<T> = T & MongooseDocument;
