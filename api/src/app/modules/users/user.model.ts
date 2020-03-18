import { Schema, model } from "mongoose";

import { User } from "./user.interface";
import { Document } from "../../shared/database/document.type";

const userSchema = new Schema<User>(
  {
    email: Schema.Types.String,
    password: Schema.Types.String
  },
  { timestamps: true }
);

export const userModel = model<Document<User>>("User", userSchema);
