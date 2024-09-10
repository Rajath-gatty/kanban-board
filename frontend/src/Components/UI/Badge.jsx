import React from "react";

const Badge = ({ children }) => {
    return (
        <div className="rounded-[15px] bg-gray-100">
            <span className="text-xs text-gray-400 p-3">{children}</span>
        </div>
    );
};

export default Badge;
