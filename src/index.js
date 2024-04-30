const express = require("express");
const app = express();
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
mongoose.set('strictQuery', false); // Set strictQuery to false to suppress the warning

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.send("Notes API From Knightcoder");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port no. " + PORT);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
