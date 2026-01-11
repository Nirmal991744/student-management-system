require("dotenv").config();

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// connect to database
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", studentRoutes);

app.get("/", (req, res) =>
  res.send("Student & Teacher Management API running...")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
