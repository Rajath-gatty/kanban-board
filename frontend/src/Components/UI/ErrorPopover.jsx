import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ErrorPopover = ({ message = "Something went wrong" }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // hide the popover after 5 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div className="fixed bottom-4 left-1/2 bg-red-100 text-gray-700 font-bold p-4 rounded shadow-lg">
            <p>{message}</p>
        </div>,
        document.getElementById("error")
    );
};

export default ErrorPopover;
