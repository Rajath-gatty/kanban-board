import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useBoardContext, getTaskById } from "../../../context/boardContext";
import useFetch from "../../../hooks/useFetch";
import { format } from "date-fns";

const TaskInput = ({
    isOpen,
    handleCloseTaskModal,
    currentSection,
    selectedTask,
}) => {
    const { addNewTask, users, updateTask } = useBoardContext();
    const taskToUpdate = getTaskById(selectedTask);

    const initializeFormState = () => {
        if (selectedTask) {
            return taskToUpdate;
        } else {
            return {
                title: "",
                description: "",
                user: users[0].id,
                dueDate: format(new Date(), "yyyy-MM-dd"),
                tag: "",
            };
        }
    };

    const [formState, setFormState] = useState(initializeFormState);

    const { loading, makeRequest } = useFetch();
    const { loading: isUpdating, makeRequest: postUpdateTask } = useFetch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        // Constructing task object
        const user = users.find((u) => u.id === +formState.user);
        const task = {
            ...formState,
            sectionId: currentSection,
            user: user,
        };

        try {
            if (selectedTask) {
                task.id = selectedTask;
                task.user = taskToUpdate.user;
                await postUpdateTask(
                    "/update-task",
                    { body: { task } },
                    "POST"
                );
                updateTask(task);
            } else {
                // Make the API request to save the task to the database
                const response = await makeRequest(
                    "/task",
                    { body: task },
                    "POST"
                );

                // Check if the request was successful and the result contains the task data
                addNewTask(
                    { ...response.result, id: response.result._id },
                    currentSection
                );
            }

            handleCloseTaskModal();

            // Reset form state after successful submission
            setFormState({
                title: "",
                description: "",
                user: users[0].id,
                dueDate: format(new Date(), "yyyy-MM-dd"),
                tag: "",
            });
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseTaskModal}>
            <h2 className="text-2xl font-medium mx-4 my-4">
                {selectedTask ? "Edit Task" : "New Task"}
            </h2>
            <form className="px-8 pb-4 space-y-3" onSubmit={handleTaskSubmit}>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="title">Name</label>
                    <input
                        id="title"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Task title"
                        name="title"
                        required
                        value={formState.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Add Description"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        name="description"
                        required
                        value={formState.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="user">Assign User</label>
                    <select
                        id="user"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        name="user"
                        value={formState.user}
                        onChange={handleInputChange}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="date"
                        name="dueDate"
                        required
                        // Restricting to only select future date
                        min={
                            !selectedTask
                                ? format(new Date(), "yyyy-MM-dd")
                                : "2024-09-01"
                        }
                        value={format(formState.dueDate, "yyyy-MM-dd")}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="tag">Tag</label>
                    <input
                        id="tag"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Add Tag"
                        name="tag"
                        value={formState.tag}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <Button
                        type="button" // Ensure this button doesn't interfere with form submission
                        className="w-[90px]"
                        onClick={handleCloseTaskModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit" // This button must be of type "submit" to trigger the form submission on Enter key
                        className="bg-gray-900 text-white flex gap-4 w-[90px]"
                    >
                        {loading || isUpdating ? (
                            <span className="w-full">
                                {selectedTask ? "Saving..." : "Add..."}
                            </span>
                        ) : (
                            <span className="w-full">
                                {selectedTask ? "Save" : "Add"}
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskInput;
