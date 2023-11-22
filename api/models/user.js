import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.JWTSECRET,
    { expiresIn: "30d" }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
