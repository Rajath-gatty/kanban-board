import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useBoardContext } from "../../../context/boardContext";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../UI/Loader";

const TaskInput = ({ isOpen, handleCloseTaskModal, currentSection }) => {
    const { addNewTask, users } = useBoardContext();

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        user: users[0].id,
        dueDate: "",
        tag: "",
    });

    const { loading, makeRequest } = useFetch();

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
            // Make the API request to save the task to the database
            const response = await makeRequest("/task", { body: task }, "POST");

            // Check if the request was successful and the result contains the task data
            addNewTask(
                { ...response.result, id: response.result._id },
                currentSection
            );

            handleCloseTaskModal();

            // Reset form state after successful submission
            setFormState({
                title: "",
                description: "",
                user: users[0].id,
                dueDate: "",
                tag: "",
            });
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseTaskModal}>
            <h2 className="text-2xl font-medium mx-4 my-4">New Task</h2>
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
                        min={new Date().toISOString().split("T")[0]}
                        value={formState.dueDate}
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
                    <Button onClick={handleCloseTaskModal}>Cancel</Button>
                    <Button
                        type="submit"
                        className="bg-gray-900 text-white flex gap-4"
                    >
                        {loading && (
                            <Loader
                                width={20}
                                height={20}
                                thickness={1}
                                color="#e5e7eb"
                            />
                        )}
                        <span>Add</span>
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskInput;
