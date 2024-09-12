import React from "react";
import { useBoardContext } from "../../../context/boardContext";
import Section from "./Section";
import Loader from "../../UI/Loader";

const Sections = ({
    handleOpenTaskModal,
    isSectionsLoading,
    isTasksLoading,
    setSelectedTask,
}) => {
    const { sections } = useBoardContext();
    return (
        <>
            {/* Rendering sections */}
            {sections &&
                Object.values(sections).map((section) => {
                    return (
                        <Section
                            key={section.id}
                            id={section.id}
                            title={section.name}
                            taskIds={section.taskIds}
                            handleOpenTaskModal={handleOpenTaskModal}
                            isTasksLoading={isTasksLoading}
                            setSelectedTask={setSelectedTask}
                        />
                    );
                })}
            {/* Displaying loader if its loading */}
            {isSectionsLoading && (
                <div className="flex items-center justify-center h-[70vh] w-full">
                    <Loader />
                </div>
            )}
        </>
    );
};
export default React.memo(Sections);
