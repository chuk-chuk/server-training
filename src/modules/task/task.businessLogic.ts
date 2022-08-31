import { Types } from "mongoose";
import {
  createTask,
  deleteTask,
  findAllTasks,
  findTaskByContent,
  findTaskById,
  updateTask,
} from "./task.dataAccess";
import { ResultType, ITask } from "./types";

export const getAllTasks = async (): Promise<{
  code: number;
  data: ITask[];
}> => {
  const result = await findAllTasks();
  return { code: 200, data: result };
};

export const createNewTask = async (createdObject: {
  description: string;
}): Promise<ResultType> => {
  if (!createdObject.description) {
    return { code: 400, data: { message: "Task description is required" } };
  }

  const existingTask = await findTaskByContent(createdObject.description);

  console.log(existingTask);

  if (existingTask) {
    return {
      code: 409,
      data: {
        message: "Record already exists.",
      },
    };
  }

  const taskToCreate = await createTask(createdObject);

  return {
    code: 200,
    data: {
      message: "Created successfully",
      id: taskToCreate._id,
    },
  };
};

export const deleteExistingTask = async (
  id: Types.ObjectId
): Promise<ResultType> => {
  const taskToDelete = await findTaskById(id);

  if (!taskToDelete) {
    return {
      code: 409,
      data: {
        message: "Record doesn't exist or already deleted",
      },
    };
  }

  await deleteTask(taskToDelete._id);

  return {
    code: 200,
    data: {
      message: "Deleted successfully",
      id: taskToDelete._id,
    },
  };
};

export const updateExistingTask = async (
  id: Types.ObjectId,
  updatedObject: { description: string }
): Promise<ResultType> => {
  const taskToUpdate = await findTaskById(id);
  console.log("YU", updatedObject);
  if (!taskToUpdate) {
    return {
      code: 409,
      data: {
        message: "Record doesn't exist",
      },
    };
  }

  if (!updatedObject.description) {
    return {
      code: 400,
      data: {
        message: `Task description is required to be updated`,
      },
    };
  }

  await updateTask(taskToUpdate._id, updatedObject);

  return {
    code: 200,
    data: { message: "Updated successfully", id },
  };
};
