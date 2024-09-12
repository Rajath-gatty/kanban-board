export const boardReducer = (state, action) => {
    // Handling reordering of task within section
    if (action.type === "REORDER_SECTION") {
        const { sectionId, sourceIndex, destIndex } = action.payload;
        // Get task IDs of the section
        const sectionTaskIds = state.sections[sectionId].taskIds;
        // Create a copy of the current task IDs
        const newTaskIds = [...sectionTaskIds];
        // Remove the task from the source index
        const [removed] = newTaskIds.splice(sourceIndex, 1);
        // Insert the removed task at the destination index
        newTaskIds.splice(destIndex, 0, removed);
        // Update state with reordered tasks
        return {
            ...state,
            sections: {
                ...state.sections,
                [sectionId]: {
                    ...state.sections[sectionId],
                    taskIds: newTaskIds,
                },
            },
        };
        // Handle moving a task from one section to another
    } else if (action.type === "MOVE_TASK") {
        const { sourceSectionId, destSectionId, sourceIndex, destIndex } =
            action.payload;

        const sourceTaskIds = state.sections[sourceSectionId].taskIds;
        const newSourceTaskIds = [...sourceTaskIds];
        // Remove task from source section
        const [movedItemId] = newSourceTaskIds.splice(sourceIndex, 1);

        // selecting Destination section task IDs
        const destTaskIds = [...state.sections[destSectionId].taskIds];
        const newDestTaskIds = [...destTaskIds];
        // Insert task into destination section
        newDestTaskIds.splice(destIndex, 0, movedItemId);

        return {
            ...state,
            sections: {
                ...state.sections,
                [sourceSectionId]: {
                    ...state.sections[sourceSectionId],
                    taskIds: newSourceTaskIds,
                },
                [destSectionId]: {
                    ...state.sections[destSectionId],
                    taskIds: newDestTaskIds,
                },
            },
        };
        // Handling adding a new task to a section
    } else if (action.type === "ADD_TASK") {
        const { sectionId, task } = action.payload;
        // Add the new task ID to the section's task list
        const newSectionTaskIds = [...state.sections[sectionId].taskIds];
        newSectionTaskIds.push(task.id);
        // Adding new Task to the tasks list
        const newTasks = { ...state.tasks, [task.id]: task };
        // Return updated state with the new task
        return {
            ...state,
            sections: {
                ...state.sections,
                [sectionId]: {
                    ...state.sections[sectionId],
                    taskIds: newSectionTaskIds,
                },
            },
            tasks: newTasks,
        };
        // Handle deleting a task from a section
    } else if (action.type === "DELETE_TASK") {
        const { taskId, sectionId } = action.payload;
        // Remove the task from the tasks state
        const newTaskList = Object.fromEntries(
            Object.entries(state.tasks).filter(
                ([_, item]) => item.id !== taskId
            )
        );
        // Remove the task ID from the section's task list
        const newSectionTaskIds = [...state.sections[sectionId].taskIds];
        const updatedTaskIds = newSectionTaskIds.filter((id) => id !== taskId);
        // Return updated state after task deletion
        return {
            ...state,
            sections: {
                ...state.sections,
                [sectionId]: {
                    ...state.sections[sectionId],
                    taskIds: updatedTaskIds,
                },
            },
            tasks: newTaskList,
        };
    } else if (action.type === "ADD_SECTION") {
        const { name, id } = action.payload;
        const newSections = {
            ...state.sections,
            [id]: { id, name, taskIds: [] },
        };

        return {
            ...state,
            sections: newSections,
        };
    } else if (action.type === "DELETE_SECTION") {
        const taskIds = state.sections[action.payload].taskIds;
        const updatedSections = Object.fromEntries(
            Object.entries(state.sections).filter(
                ([_, val]) => val.id !== action.payload
            )
        );
        const updatedTasks = Object.fromEntries(
            Object.entries(state.tasks).filter(
                ([_, val]) => !taskIds.includes(val.id)
            )
        );

        return {
            ...state,
            sections: updatedSections,
            tasks: updatedTasks,
        };
    } else if (action.type === "SET_TASKS") {
        return {
            ...state,
            tasks: action.payload,
        };
    } else if (action.type === "SET_SECTIONS") {
        const sections = {
            ...state,
            sections: action.payload,
        };
        return sections;
    } else if (action.type === "UPDATE_TASK") {
        const updatedTask = { ...state.tasks };
        updatedTask[action.payload.id] = action.payload;
        return {
            ...state,
            tasks: updatedTask,
        };
    } else if (action.type === "UPDATE_SECTION") {
        const updatedSection = { ...state.sections };
        updatedSection[action.payload.id] = action.payload;
        return {
            ...state,
            sections: updatedSection,
        };
    }
};
