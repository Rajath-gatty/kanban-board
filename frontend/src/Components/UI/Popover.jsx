import React, { useState, useRef, useEffect } from "react";

const Popover = ({ buttonLabel, children, isOpen, setIsOpen }) => {
    const popoverRef = useRef(null);

    const togglePopover = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <button onClick={togglePopover}>{buttonLabel}</button>
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute bg-white border border-gray-100 rounded shadow-lg p-4 mt-2"
                    style={{ zIndex: 10 }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popover;
