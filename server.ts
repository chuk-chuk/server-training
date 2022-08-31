import express, { Express } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import taskRoutes from "./src/modules/task/task.routes";
import { connectToDatabase } from "./src/database";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 6060;
const app: Express = express();

/**
 *  App Configuration
 */
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Routes */
app.use("/tasks", taskRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");
  return res.status(404).json({
    message: error.message,
  });
});

/**
 * Connect to the DB
 */
connectToDatabase();

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
