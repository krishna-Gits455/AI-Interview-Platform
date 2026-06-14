const bcrypt = require("bcryptjs");
const User = require("./auth.model");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};