const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
connectDB();
app.use(express.json()); //Accept JSON data 
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server running at PORT:${PORT} ...`));
