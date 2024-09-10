import express from "express";
import "dotenv/config.js";
import cors from "cors";
import { connectDB } from "./database/db.js";
import boardRoutes from "./Routes/boardRoutes.js";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use(boardRoutes);

app.use((err, _, res, next) => {
    console.log(err);
    res.status(500).send({ err: "something went wrong" });
});

app.listen(8080, async () => {
    try {
        await connectDB();
        console.log("Connected to Database");
    } catch (err) {
        throw new Error("Database connection failed");
    }
});
