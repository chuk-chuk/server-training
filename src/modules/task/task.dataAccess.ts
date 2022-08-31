import { Types } from "mongoose";
import { Task } from "../../models/initModels";
import { ITask } from "./types";

export const findAllTasks = async (): Promise<ITask[]> => {
  const tasks = await Task.find({});

  return tasks || [];
};

export const createTask = async (payload: {
  description: string;
}): Promise<ITask> => {
  const result = await Task.create(payload);

  return result;
};

export const findTaskByContent = async (
  content: string
): Promise<ITask | null> => {
  const result = await Task.findOne({ description: content });
  console.log("result", result);

  return result;
};

export const findTaskById = async (
  id: Types.ObjectId
): Promise<ITask | null> => {
  const result = await Task.findOne({ _id: id });

  return result;
};

export const deleteTask = async (
  id: Types.ObjectId
): Promise<{ deletedCount: number }> => {
  const result = await Task.deleteOne({
    _id: id,
  });

  return result;
};

export const updateTask = async (
  id: Types.ObjectId,
  updatedObject: { description: string }
): Promise<ITask | null> => {
  const result = await Task.findOneAndUpdate({ _id: id }, updatedObject, {
    new: true,
    upsert: true,
  });

  return result;
};
