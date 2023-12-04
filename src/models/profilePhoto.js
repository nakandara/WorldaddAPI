import mongoose from "mongoose";

const profilePhotoSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    image:{ type: String, required: true },
  
});

const ProfilePhoto = mongoose.model("ProfilePhoto", profilePhotoSchema);

export default ProfilePhoto;
