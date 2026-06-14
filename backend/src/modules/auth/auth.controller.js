const { registerSchema } = require("./auth.validation");
const { registerUser } = require("./auth.service");

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

module.exports = {
  register,
};