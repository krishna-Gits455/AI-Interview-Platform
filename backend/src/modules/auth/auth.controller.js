const { registerSchema } = require("./auth.validation");
const { registerUser } = require("./auth.service");
const { loginSchema } = require("./auth.validation");
const { loginUser } = require("./auth.service");
const generateToken = require("../../utils/generateToken");

const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUser(validatedData);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  register,
  login,
  logout,
};