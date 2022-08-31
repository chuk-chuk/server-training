import * as dotenv from "dotenv";
import { createConnection, disconnect } from "mongoose";
import { InitMongoModels } from "./models/initModels";

const connectToExternalDatabase = async () => {
  dotenv.config();

  console.log("=> new connection to database");

  const connection = await createConnection(process.env.MONGO_URI!);
  console.log("✅ Successfully established connection");

  return InitMongoModels.init(connection);
};

export const connectToDatabase = async () => {
  return await connectToExternalDatabase();
};

export const closeAllConnections = async () => {
  return await disconnect();
};
