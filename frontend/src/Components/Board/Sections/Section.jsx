import { Ellipsis, Plus } from "lucide-react";
import Card from "../../UI/Card";
import Tasks from "../Tasks/Tasks";
import { Droppable } from "@hello-pangea/dnd";
import Popover from "../../UI/Popover";
import { useBoardContext } from "../../../context/boardContext";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../UI/Loader";

const Section = ({
    id,
    title: initialTitle,
    taskIds,
    handleOpenTaskModal,
    setSelectedTask,
    isTasksLoading,
}) => {
    const { deleteSection } = useBoardContext();
    const [title, setTitle] = useState(initialTitle);
    const [newTitle, setNewTitle] = useState(initialTitle);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const { makeRequest: postUpdateSectionTitle } = useFetch();
    const { loading: deleteSectionLoading, makeRequest: postDeleteSection } =
        useFetch();

    const handleUpdateTitle = async (e) => {
        e.preventDefault();
        if (newTitle.trim() === "") {
            return;
        }
        const result = await postUpdateSectionTitle(
            "/rename-section",
            {
                body: {
                    sectionId: id,
                    name: newTitle,
                },
            },
            "POST"
        );
        if (result.success) {
            setTitle(newTitle);
            setPopoverOpen(false);
        } else {
            setTitle(initialTitle);
        }
    };

    const handleDeleteSection = async () => {
        await postDeleteSection(
            "/delete-section",
            { body: { sectionId: id } },
            "POST"
        );
        deleteSection(id);
    };

    return (
        <Card className="w-[350px]">
            <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                <div className="flex items-center justify-center gap-2">
                    {/* Plus icon to add a new task */}
                    <Plus
                        className="text-gray-400 cursor-pointer"
                        onClick={() => handleOpenTaskModal(id)}
                        size={20}
                    />
                    <Popover
                        buttonLabel={
                            <Ellipsis
                                className="text-gray-400 cursor-pointer pt-2"
                                size={25}
                            />
                        }
                        isOpen={popoverOpen}
                        setIsOpen={setPopoverOpen}
                    >
                        <div>
                            <h4 className="font-medium text-md mb-3">Rename</h4>
                            <form
                                className="flex flex-col gap-2"
                                onSubmit={handleUpdateTitle}
                            >
                                <input
                                    type="text"
                                    className="border rounded-md border-gray-300 p-2"
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                    autoFocus
                                    required
                                    name="sectionTitle"
                                />
                                <button className="bg-gray-800 text-white py-2 text-sm rounded-md">
                                    Done
                                </button>
                            </form>
                            <button
                                className="flex gap-2 w-full items-center justify-center p-2 rounded mt-4 hover:bg-gray-100 border border-gray-100"
                                onClick={handleDeleteSection}
                            >
                                {deleteSectionLoading && (
                                    <Loader
                                        width={18}
                                        height={18}
                                        thickness={1}
                                        color="#bbbbbb"
                                    />
                                )}
                                {/* <Trash2 className="text-red-500" size={18} /> */}
                                <span className="text-sm text-red-600  ">
                                    Delete Section
                                </span>
                            </button>
                        </div>
                    </Popover>
                </div>
            </div>
            {/* Droppable area for drag-and-drop tasks */}
            <Droppable key={id} droppableId={id} type="TASK">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Tasks
                            taskIds={taskIds}
                            handleOpenTaskModal={handleOpenTaskModal}
                            sectionId={id}
                            isTasksLoading={isTasksLoading}
                            isDraggingOver={snapshot.isDraggingOver}
                            setSelectedTask={setSelectedTask}
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Card>
    );
};

export default Section;
