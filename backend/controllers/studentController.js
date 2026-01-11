const Student = require("../models/Student");
const mongoose = require("mongoose");
const isValidDate = (date) => !isNaN(Date.parse(date));

const createUser = async (req, res) => {
  try {
    const { name, email, dateOfBirth, rollNo, role, course } = req.body;

    if (!name || !email || !dateOfBirth || !rollNo || !role || !course) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    if (!["student", "teacher"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Role must be either 'student' or 'teacher' " });
    }

    if (!isValidDate(dateOfBirth)) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }

    const existingEmail = await Student.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingRoll = await Student.findOne({ rollNo });
    if (existingRoll)
      return res.status(400).json({ message: "Roll number already exists" });

    const user = new Student({
      name,
      email,
      dateOfBirth,
      rollNo,
      role,
      course,
    });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Student.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const currentUser = await Student.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Normalize email
    if (req.body.email) {
      const newEmail = req.body.email.trim().toLowerCase();
      if (newEmail !== currentUser.email.toLowerCase().trim()) {
        const emailExists = await Student.findOne({
          email: newEmail,
          _id: { $ne: new mongoose.Types.ObjectId(userId) },
        });
        if (emailExists) {
          return res.status(400).json({ message: "Email already exists" });
        }
        req.body.email = newEmail; // update body with normalized email
      }
    }

    // Normalize rollNo
    if (req.body.rollNo) {
      const newRollNo = req.body.rollNo.trim();
      if (newRollNo !== currentUser.rollNo.trim()) {
        const rollExists = await Student.findOne({
          rollNo: newRollNo,
          _id: { $ne: new mongoose.Types.ObjectId(userId) },
        });
        if (rollExists) {
          return res
            .status(400)
            .json({ message: "Roll number already exists" });
        }
        req.body.rollNo = newRollNo;
      }
    }

    // Update user
    const updatedUser = await Student.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Student.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
