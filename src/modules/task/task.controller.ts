import { Request, Response, NextFunction } from "express";
import {
  createNewTask,
  deleteExistingTask,
  getAllTasks,
  updateExistingTask,
} from "./task.businessLogic";

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllTasks();
    res.status(code).send(data);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving all tasks" });
    next(error);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdObject = req.body || {};
    const { code, data } = await createNewTask(createdObject);
    res.status(code).json(data);
  } catch (error) {
    res.status(500).send({ message: "Error creating a new task" });
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const { code, data } = await deleteExistingTask(id);
    res.status(code).json(data);
  } catch (error) {
    res.status(500).send({ message: "Error deleting a task" });
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const updatedObject = req.body || {};
    const { code, data } = await updateExistingTask(id, updatedObject);
    res.status(code).json(data);
  } catch (error) {
    res.status(500).send({ message: "Error updating the task" });
    next(error);
  }
};

export default { createTask, deleteTask, getTasks, updateTask };
