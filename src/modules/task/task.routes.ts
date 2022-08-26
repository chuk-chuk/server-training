import express from "express";
import controller from "./task.controller";

const router = express.Router();

router.post("/", controller.createTask);
router.delete("/:id", controller.deleteTask);
router.get("/", controller.getTasks);
router.put("/:id", controller.updateTask);

export = router;
