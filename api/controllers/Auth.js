import asyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/user.js";
import errorHandler from "../middleware/customErrorhandler.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";

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
      .json({ ...userData, accessToken });
  } catch (error) {
    next(error);
  }
});

const googleAuth = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const accessToken = user.createJWT();
      const { password: pass, ...userData } = user._doc;
      res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(StatusCodes.OK)
        .json({ ...userData, accessToken });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      console.log(newUser);
      await newUser.save();
      const accessToken = newUser.createJWT();
      const { password: pass, ...userData } = newUser._doc;
      res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(StatusCodes.OK)
        .json({ ...userData, accessToken });
    }
  } catch (error) {
    next(error);
  }
});

export { signup, signin, googleAuth };
