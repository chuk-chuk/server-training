import { Schema } from "mongoose";
import { ITask } from "../modules/task/types";

export const TaskSchema = new Schema<ITask>(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const TasksCollection = "tasks";
