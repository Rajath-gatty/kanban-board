import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        user: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
        },
        dueDate: {
            type: Date,
            required: true,
        },
        tag: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Tasks", taskSchema);
