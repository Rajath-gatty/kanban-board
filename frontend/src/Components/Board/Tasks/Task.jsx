import React from "react";
import Card from "../../UI/Card";
import Badge from "../../UI/Badge";
import { Trash2 } from "lucide-react";

const Task = ({ item, handleTaskDelete }) => {
    // Formatting Date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        return `${day} ${month}`;
    };

    return (
        // Rendering individual task UI
        <Card className="bg-white select-none relative group">
            <div
                className=" absolute right-0 top-0 invisible group-hover:visible bg-white p-2 rounded-full cursor-pointer"
                onClick={() => handleTaskDelete(item.id)}
            >
                <Trash2 className="text-red-600" size={17} />
            </div>

            <div className="mb-3">
                <p className="text-lg text-gray-700">{item.title}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img
                        src={item.user.avatar}
                        className="w-[20px] h-[20px] object-cover rounded-full"
                        alt="User"
                    />
                    <span className="text-sm text-gray-400">
                        {formatDate(item.dueDate)}
                    </span>
                </div>
                <Badge>{item.tag}</Badge>
            </div>
        </Card>
    );
};

export default Task;
