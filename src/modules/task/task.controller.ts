import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../../models/task.model";
import { Error } from "mongoose";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { task } = req.body;
    const existingTask = await TaskModel.findOne({
      task,
    });

    if (existingTask) {
      res.status(409);
      const error = new Error("Task already exists");
      return next(error);
    }

    const newTask = await TaskModel.create(task);
    console.log("New task has been created");
    res.status(200).json(newTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findOne({ _id: id });

    if (!task) {
      return next();
    }

    await TaskModel.remove({
      _id: id,
    });

    res.json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TaskModel.find({});
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const existingTask = await TaskModel.findOne({
      _id: id,
    });

    if (!existingTask) {
      return next();
    }

    const updatedTask = await TaskModel.findOneAndUpdate({ _id: id }, task, {
      new: true,
      upsert: true,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export default { createTask, deleteTask, getTasks, updateTask };
