import { Ellipsis, Plus } from "lucide-react";
import Card from "../../UI/Card";
import Tasks from "../Tasks/Tasks";
import { Droppable } from "@hello-pangea/dnd";

const Section = ({
    id,
    title,
    taskIds,
    handleOpenTaskModal,
    isTasksLoading,
}) => {
    return (
        <Card className="w-[350px]">
            <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                <div className="flex items-center gap-2">
                    {/* Plus icon to add a new task */}
                    <Plus
                        className="text-gray-400 cursor-pointer"
                        onClick={() => handleOpenTaskModal(id)}
                        size={20}
                    />
                    <Ellipsis
                        className="text-gray-400 cursor-pointer"
                        size={20}
                    />
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
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Card>
    );
};

export default Section;
