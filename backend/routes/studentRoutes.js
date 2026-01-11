const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/studentController");
const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
