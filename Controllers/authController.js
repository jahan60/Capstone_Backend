import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by Email field
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare plain text passwords
    if (password !== user.Password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { Id: user.Id, Role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default login;


