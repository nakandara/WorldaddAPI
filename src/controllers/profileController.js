import bcrypt from "bcrypt";
import Profile from "../models/profile.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createProfile = async (req, res) => {
  const {
    userId,
    username,
    birthday,
    gender,
    district,
    city,
    height,
    weight,
    country,
    OtherDetails,
  } = req.body;

  console.log(userId, "userId");
  try {
    const existingProfile = await User.findOne({ userId });
    console.log(existingProfile, "existingProfile");
    if (!existingProfile) {
      return res
        .status(500)
        .json({ success: false, error: "Not existing Profile" });
    }
    const ProfileDB = new Profile({
      userId,
      username,
      birthday,
      gender,
      district,
      city,
      height,
      weight,
      country,
      OtherDetails,
    });
    console.log(ProfileDB);
    await ProfileDB.save();

    res.status(200).json({ success: true, ProfileDB });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getProfile = async (req, res) => {
  const { userId } = req.params; // Extract userId from req.params

  try {
    const profile = await Profile.findOne({ userId }); // Fetch the profile using the userId

    if (!profile) {
      return res
        .status(200)
        .json({ success: false,message:"profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingProfile = await Profile.findOne({ userId });
    console.log(existingProfile, "existingProfile");
    if (!existingProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    existingProfile.username = req.body.username;
    existingProfile.city = req.body.city;
    existingProfile.district = req.body.district;
    existingProfile.race = req.body.race;
    existingProfile.gender = req.body.gender;
    existingProfile.religion = req.body.religion;

    await existingProfile.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        profile: existingProfile,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
