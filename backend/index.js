const express = require("express");
const app = express();

app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name } = req.body;
  students.push(name);
  res.json({ message: "student added successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
