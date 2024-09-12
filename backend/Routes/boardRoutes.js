import express from "express";
import * as boardController from "../Controllers/boardController.js";
const router = express.Router();

router.get("/sections", boardController.getSections);
router.post("/section", boardController.postSection);
router.post("/rename-section", boardController.renameSection);
router.post("/delete-section", boardController.deleteSection);

router.get("/tasks", boardController.getTasks);
router.post("/task", boardController.postTask);
router.post("/update-task", boardController.updateTask);
router.post("/delete-task", boardController.deleteTask);
router.post("/move-task", boardController.moveTask);
router.post("/reorder-task", boardController.reorderTask);

export default router;
