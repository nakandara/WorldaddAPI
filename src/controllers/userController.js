import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nakandarapramod@gmail.com",
    pass: "rksu sabo zjbc yahr",
  },
});

export const registerUser = async (req, res) => {
  const { name, email, password, method } = req.body;

  console.log(name, email, password, method);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser && method === "FACEBOOK") {
      console.log("User already exists for Facebook login");
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET || ""
      );
      return res.json({ token, existingUser });
    } else if (existingUser) {
      console.log("User with this email already exists");
      return res
        .status(409)
        .json({ success: false, error: "User with this email already exists" });
    }

    // If user doesn't exist, create a new one
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      method,
      token: "", // Initialize token field
    });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || ""
    );
    newUser.token = token; // Save token to user object

    await newUser.save();

    res.status(200).json({ success: true, token, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user && user._id }, process.env.JWT_SECRET || "");


    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users from the database

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const user = await User.findOne({ userId: userId });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, error: "Something went wrong" });
    }

    user.set(req.body);
    const updatedUser = await user.save();

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ user, message: "Deleted User Account" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return res.status(404).send("User not found");
  }
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
    expiresIn: "5m",
  });
  const link = `${process.env.API_URL}/api/reset-password/${oldUser._id}/${token}`;

  // Save the updated user object back to the database

  const mailOptions = {
    from: "your.email@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text:
      `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `${link}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.send("Password reset email sent");
  });
};

export const resetGetPassword = async (req, res) => {
  const { id, token } = req.params;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  const secret = process.env.JWT_SECRET;
  try {
    const verify = jwt.verify(token, secret);
    const locals = {
      email: verify.email,
      status: "Not Verified",
      WEBSITE_URL: `${process.env.WEBSITE_URL}/home`,
    };

    console.log(verify, "555555555555");
    res.render("index", locals);
  } catch (error) {
    res.send("Not Verified");
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  console.log(req.body, "erfefefefefe");

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET;
  console.log(secret, token, password, id);

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    res.json({ status: "Something Went Wrong" });
  }
};
