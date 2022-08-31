import { Types, Document } from "mongoose";

export interface ITask extends Document {
  description: string;
  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}

export type ResultType = {
  code: number;
  data: { message: string; id?: Types.ObjectId };
};
