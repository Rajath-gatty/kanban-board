import { Section } from "../Model/Section.js";
import { Task } from "../Model/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTasks = asyncHandler(async (req, res) => {
    const result = await Task.find();
    res.json({ success: true, result });
});

export const postTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, user, tag, sectionId } = req.body;
    const newTask = new Task({
        title,
        description,
        dueDate,
        user,
        tag,
    });

    const result = await newTask.save();
    await Section.findByIdAndUpdate(sectionId, {
        $push: { taskIds: result._id },
    });
    res.json({ success: true, result });
});

export const deleteTask = asyncHandler(async (req, res) => {
    const { taskId, sectionId } = req.body;
    await Task.findByIdAndDelete(taskId);
    await Section.findByIdAndUpdate(sectionId, {
        $pull: { taskIds: taskId },
    });
    res.json({ success: true });
});

export const reorderTask = asyncHandler(async (req, res) => {
    const { sectionId, sourceIndex, destIndex } = req.body;

    const destSection = await Section.findById(sectionId);

    const taskIds = destSection.taskIds;
    const [removedTaskId] = taskIds.splice(sourceIndex, 1);
    taskIds.splice(destIndex, 0, removedTaskId);

    await Section.findByIdAndUpdate(sectionId, {
        taskIds,
    });
    res.json({ success: true });
});

export const moveTask = asyncHandler(async (req, res) => {
    const { taskId, sourceSectionId, destSectionId, destIndex } = req.body;
    const destSection = await Section.findById(destSectionId);
    const taskIds = destSection.taskIds;
    taskIds.splice(destIndex, 0, taskId);

    await Section.findByIdAndUpdate(destSectionId, {
        taskIds,
    });
    await Section.findByIdAndUpdate(sourceSectionId, {
        $pull: { taskIds: taskId },
    });
    res.json({ success: true });
});

export const getSections = asyncHandler(async (req, res) => {
    const result = await Section.find();
    res.json({ success: true, result });
});

export const postSection = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const result = new Section({ name, taskIds: [] });
    await result.save();
    res.json({ success: true, result });
});
