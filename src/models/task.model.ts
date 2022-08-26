import { Schema, model } from "mongoose";

interface ITask {
  name: string;
}

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const TaskModel = model<ITask>("User", TaskSchema);
