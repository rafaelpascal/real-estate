import asyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/user.js";
import errorHandler from "../middleware/customErrorhandler.js";
import { StatusCodes } from "http-status-codes";

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res
      .status(StatusCodes.CREATED)
      .json({ data: newUser, msg: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(new errorHandler("User not found!", StatusCodes.NOT_FOUND));
    }
    const ispasswordCorrect = await validUser.comparePassword(password);
    if (!ispasswordCorrect) {
      return next(
        new errorHandler("Wrong Credentials", StatusCodes.BAD_REQUEST)
      );
    }
    const accessToken = validUser.createJWT();
    const { password: pass, ...userData } = validUser._doc;
    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(StatusCodes.OK)
      .json({
        msg: "Login User Successfully",
        data: { ...userData, accessToken },
      });
  } catch (error) {
    next(error);
  }
});

export { signup, signin };
