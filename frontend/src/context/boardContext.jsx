import { createContext } from "react";
import { useReducer, useCallback } from "react";
import { boardReducer } from "../reducer/boardReducer";
import { useContext } from "react";

const BoardContext = createContext();

//  Structure of sections in global state Context
// const sections = {
//     section1: { id: "section1", name: "To Do", taskIds: [1, 2, 3, 4] },
//     section2: {
//         id: "section2",
//         name: "In Progress",
//         taskIds: [5, 8, 9],
//     },
//     section3: {
//         id: "section3",
//         name: "Done",
//         taskIds: [10, 11, 12, 13, 14, 15],
//     },
// };

// Structure of Tasks in global state Context
// const tasks = {
//     1: { id: 1, title: "Introduction to JavaScript", tag: "Programming" },
//     2: { id: 2, title: "Node.js Basics", tag: "Backend" },
//     3: { id: 3, title: "Express.js API Development", tag: "Backend" },
//     4: { id: 4, title: "Building REST APIs", tag: "API" }
// };

// users data to assign a user while creating a task
const users = [
    {
        id: 1,
        name: "Emily Johnson",
        avatar: "https://dummyjson.com/icon/emilys/128",
    },
    {
        id: 2,
        name: "Michael Williams",
        avatar: "https://dummyjson.com/icon/michaelw/128",
    },
    {
        id: 3,
        name: "James Davis",
        avatar: "https://dummyjson.com/icon/jamesd/128",
    },
    {
        id: 4,
        name: "Emma Miller",
        avatar: "https://dummyjson.com/icon/emmaj/128",
    },
    {
        id: 5,
        name: "Alexander Jones",
        avatar: "https://dummyjson.com/icon/alexanderj/128",
    },
];

// Initial state for the board (sections and tasks are set to null initially)
const initialState = {
    sections: null,
    tasks: null,
    isTaskEditing: false,
    isSectionEditing: true,
    users,
};

export const BoardProvider = ({ children }) => {
    // useReducer to manage state using the boardReducer function
    const [state, dispatch] = useReducer(boardReducer, initialState);

    // Dispatching action to reorder tasks within the same section
    const reorderTask = useCallback((sectionId, sourceIndex, destIndex) => {
        dispatch({
            type: "REORDER_SECTION",
            payload: { sectionId, sourceIndex, destIndex },
        });
    }, []);

    //Dispatching action to add a new section to the board
    const moveTask = useCallback(
        (sourceSectionId, destSectionId, sourceIndex, destIndex) => {
            dispatch({
                type: "MOVE_TASK",
                payload: {
                    sourceSectionId,
                    destSectionId,
                    sourceIndex,
                    destIndex,
                },
            });
        },
        []
    );
    // Dispatching action to create new task
    const addNewTask = useCallback((task, sectionId) => {
        dispatch({ type: "ADD_TASK", payload: { task, sectionId } });
    }, []);
    // Dispatching action to delete task
    const deleteTask = useCallback((taskId, sectionId) => {
        dispatch({ type: "DELETE_TASK", payload: { taskId, sectionId } });
    }, []);
    // Dispatching action to add new Section
    const addNewSection = useCallback((section) => {
        dispatch({ type: "ADD_SECTION", payload: section });
    }, []);
    // Setting the tasks data initially after page load
    const setTasks = useCallback((tasks) => {
        dispatch({ type: "SET_TASKS", payload: tasks });
    }, []);
    // Setting the Sections data initially after page load
    const setSections = useCallback((sections) => {
        dispatch({ type: "SET_SECTIONS", payload: sections });
    }, []);
    // Action to toggle state between normal and editing state for Task
    const updateTask = useCallback((task) => {
        dispatch({ type: "UPDATE_TASK", payload: task });
    }, []);
    // Action to toggle state between normal and editing state for Section
    const updateSection = useCallback((section) => {
        dispatch({ type: "UPDATE_SECTION", payload: section });
    }, []);
    const deleteSection = useCallback((sectionId) => {
        dispatch({ type: "DELETE_SECTION", payload: sectionId });
    }, []);

    return (
        <BoardContext.Provider
            value={{
                ...state,
                reorderTask,
                moveTask,
                addNewTask,
                deleteTask,
                addNewSection,
                setTasks,
                setSections,
                updateTask,
                updateSection,
                deleteSection,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
// Custom hook to subscribe to the specific parts of the board context easily in other components
export const useBoardContext = () => {
    return useContext(BoardContext);
};

export const getTaskById = (id) => {
    const { tasks } = useContext(BoardContext);
    return tasks[id];
};
