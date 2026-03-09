import User from "../Models/userSchema.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    const { Id, Name, Email, Password, Role } = req.body;

    const user = await User.create({
      Id,
      Name,
      Email,
      Password,
      Role
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by Id (your custom Id, not MongoDB _id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ Id: req.params.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ Id: req.params.id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createUser, getUserById, updateUser, deleteUser };