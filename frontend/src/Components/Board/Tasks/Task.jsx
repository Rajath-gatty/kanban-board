import React from "react";
import Card from "../../UI/Card";
import Badge from "../../UI/Badge";
import { Trash2 } from "lucide-react";
import { isToday, isTomorrow, isYesterday, format } from "date-fns";

const Task = ({ item, handleTaskDelete, handleTaskEdit }) => {
    let date;
    if (isToday(item.dueDate)) {
        date = <span className="font-medium text-gray-800 text-sm">Today</span>;
    } else if (isYesterday(item.dueDate)) {
        date = (
            <span className="font-medium text-red-600 text-sm">Yesterday</span>
        );
    } else if (isTomorrow(item.dueDate)) {
        date = (
            <span className="font-medium text-blue-600 text-sm">Tomorrow</span>
        );
    } else {
        date = (
            <span className=" text-gray-400 text-sm">
                {format(item.dueDate, "d MMM")}
            </span>
        );
    }

    return (
        // Rendering individual task UI
        <Card
            className="bg-white select-none relative group border border-gray-200/70"
            onClick={() => handleTaskEdit(item.id)}
        >
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
                    {date}
                </div>
                <Badge>{item.tag}</Badge>
            </div>
        </Card>
    );
};

export default Task;
