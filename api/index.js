import express from "express";
import connectDB from "../api/connectBD/DBconfig.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1", userRoute);
app.use("/api/v1/auth", authRoute);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} and Database successfully connected!`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
