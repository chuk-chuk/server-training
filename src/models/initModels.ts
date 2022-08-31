import * as mongoose from "mongoose";
import { ITask } from "../modules/task/types";
import { TaskSchema, TasksCollection } from "./task.model";

export let Task: mongoose.Model<ITask>;

export let mongoConnection: any;

export class InitMongoModels {
  public static init(connection: any): void {
    Task = connection.model("Task", TaskSchema, TasksCollection);

    mongoConnection = connection;
  }
}
