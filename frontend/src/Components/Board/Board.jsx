import React, { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import Card from "../UI/Card";
import { useBoardContext } from "../../context/boardContext";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskInput from "./Tasks/TaskInput";
import SectionInput from "./Sections/SectionInput";
import Sections from "./Sections/Sections";
import useFetch from "../../hooks/useFetch";
import ErrorPopover from "../UI/ErrorPopover";

const Board = () => {
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [sectionModalOpen, setSectionModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const { reorderTask, moveTask, setTasks, setSections } = useBoardContext();

    // Custom hook to make API requests
    const { data: tasks, loading: tasksLoading } = useFetch("/tasks");
    const { data: sections, loading: sectionsLoading } = useFetch("/sections");

    const { error: moveTaskError, makeRequest: postMoveTask } = useFetch();
    const { error: reorderError, makeRequest: postReorderTask } = useFetch();

    useEffect(() => {
        // Creating the normalized Section structure from the results
        if (sections) {
            const transformedSections = sections.result.reduce((acc, cur) => {
                acc[cur._id] = { ...cur, id: cur._id };
                return acc;
            }, {});
            // Dispatching to set the transformed section in the context
            setSections(transformedSections);
        }
    }, [sections]);

    useEffect(() => {
        // Creating the normalized tasks structure from the results
        if (tasks) {
            const transformedTasks = tasks.result.reduce((acc, cur) => {
                acc[cur._id] = { ...cur, id: cur._id };
                return acc;
            }, {});
            // Setting the transformed tasks to the context
            setTasks(transformedTasks);
        }
    }, [tasks]);

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // Check if the task was dropped in the same position
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Check if the task is being reordered within the same section
        if (
            destination.droppableId == source.droppableId &&
            destination.index !== source.index
        ) {
            // Update the state locally for the reordering
            reorderTask(source.droppableId, source.index, destination.index);
            // Send a POST request to update the task order on the server
            await postReorderTask(
                "/reorder-task",
                {
                    body: {
                        sectionId: source.droppableId,
                        sourceIndex: source.index,
                        destIndex: destination.index,
                    },
                },
                "POST"
            );
        } else {
            // The task is being moved to a different section
            moveTask(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            );
            const data = {
                taskId: draggableId,
                destSectionId: destination.droppableId,
                sourceSectionId: source.droppableId,
                destIndex: destination.index,
            };
            // Send a POST request to update the task order on the server
            await postMoveTask("/move-task", { body: data }, "POST");
        }
    };
    // Functions to handle Modal states
    const handleCloseTaskModal = useCallback(() => {
        setCurrentSection(null);
        setSelectedTask(null);
        setTaskModalOpen(false);
    }, []);

    const handleOpenTaskModal = useCallback((sectionId) => {
        setCurrentSection(sectionId);
        setTaskModalOpen(true);
    }, []);

    const handleCloseSectionModal = useCallback(() => {
        setSectionModalOpen(false);
    }, []);

    const handleOpenSectionModal = useCallback(() => {
        setSectionModalOpen(true);
    }, []);

    return (
        <div className="flex gap-3 w-full overflow-x-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Sections
                    isSectionsLoading={sectionsLoading}
                    isTasksLoading={tasksLoading}
                    handleOpenTaskModal={handleOpenTaskModal}
                    setSelectedTask={setSelectedTask}
                />
            </DragDropContext>
            {!sectionsLoading && (
                <Card>
                    <div
                        className="flex gap-2 w-full justify-center cursor-pointer"
                        onClick={handleOpenSectionModal}
                    >
                        <Plus className="text-gray-400" size={20} />
                        <span className="text-md text-gray-400 text-center font-medium">
                            Add Section
                        </span>
                    </div>
                </Card>
            )}
            {/* Modal to add new task */}
            {taskModalOpen && (
                <TaskInput
                    isOpen={taskModalOpen}
                    currentSection={currentSection}
                    selectedTask={selectedTask}
                    handleCloseTaskModal={handleCloseTaskModal}
                />
            )}
            {/* Modal to add new section */}
            {sectionModalOpen && (
                <SectionInput
                    isOpen={sectionModalOpen}
                    handleCloseSectionModal={handleCloseSectionModal}
                />
            )}
            {/* Error handing popover */}
            {(reorderError || moveTaskError) && (
                <ErrorPopover message="Task updation Failed" />
            )}
        </div>
    );
};

export default Board;
