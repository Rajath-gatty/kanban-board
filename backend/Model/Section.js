import mongoose, { Schema } from "mongoose";
const sectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        taskIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Section = mongoose.model("Sections", sectionSchema);
