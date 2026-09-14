const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const allowedRoles = [
  "family",
  "police",
  "hospital",
  "ngo",
  "volunteer"
];

const generateToken = (id) => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

const registerUser = async (req, res) => {
  try {
    console.log("Register request body:", req.body);

    const {
      name,
      email,
      password,
      role
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and role are required"
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email)
      .trim()
      .toLowerCase();
    const cleanRole = String(role)
      .trim()
      .toLowerCase();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters"
      });
    }

    if (!allowedRoles.includes(cleanRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected"
      });
    }

    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Use another email."
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: cleanRole
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const cleanEmail = String(email)
      .trim()
      .toLowerCase();

    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};