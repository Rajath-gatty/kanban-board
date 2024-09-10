import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BoardProvider } from "./context/boardContext.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BoardProvider>
            <App />
        </BoardProvider>
    </StrictMode>
);
