import React from "react";
import Task from "./Task";
import Card from "../../UI/Card";
import { useBoardContext } from "../../../context/boardContext";
import { Draggable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import Loader from "../../UI/Loader";
import useFetch from "../../../hooks/useFetch";

const Tasks = ({
    sectionId,
    taskIds,
    handleOpenTaskModal,
    isTasksLoading,
    isDraggingOver,
    setSelectedTask,
}) => {
    const { tasks, deleteTask } = useBoardContext();

    const { makeRequest: postDeleteTask } = useFetch();

    // Handler to delete task
    const handleTaskDelete = async (id) => {
        deleteTask(id, sectionId);
        await postDeleteTask(
            "/delete-task",
            { body: { taskId: id, sectionId } },
            "POST"
        );
    };

    const handleTaskEdit = (taskId) => {
        handleOpenTaskModal(sectionId);
        setSelectedTask(taskId);
    };

    return (
        <Card
            className={`${
                isDraggingOver ? "bg-blue-300/20" : "bg-gray-100/80"
            } space-y-2 min-h-screen `}
        >
            {/* Render tasks if they exist */}
            {tasks &&
                taskIds.map((taskId, i) => (
                    <Draggable
                        draggableId={taskId.toString()}
                        index={i}
                        key={taskId}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                {/* Render individual task */}
                                <Task
                                    item={tasks[taskId]}
                                    handleTaskDelete={handleTaskDelete}
                                    handleTaskEdit={handleTaskEdit}
                                />
                            </div>
                        )}
                    </Draggable>
                ))}
            {/* Show the 'Add Task' button if there are no tasks */}
            {!isTasksLoading && !isDraggingOver && (
                <Card>
                    <div
                        className="flex gap-2 w-full justify-center cursor-pointer"
                        onClick={() => handleOpenTaskModal(sectionId)}
                    >
                        <Plus className="text-gray-400" size={20} />
                        <span className="text-md text-gray-400 text-center font-medium">
                            Add Task
                        </span>
                    </div>
                </Card>
            )}
            {/* Show loader if tasks are loading */}
            {isTasksLoading && (
                <div className="w-full mt-10 flex justify-center">
                    <Loader color="#cbd5e1" />
                </div>
            )}
        </Card>
    );
};

export default Tasks;
