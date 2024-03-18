import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    username: { type: String, required: true },
    birthday: { type: Date, required: false},
    gender: { type: String, required: false },
   
    district: { type: String, required: false},
    city: { type: String, required: false},
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    country: { type: String, required: false },
    OtherDetails: { type: String, required: false },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
