import asyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/user.js";
// import errorHandler from "../middleware/customErrorhandler.js";

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json({ data: newUser, msg: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
});

export { signup };
