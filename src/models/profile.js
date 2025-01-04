import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    username: { type: String, required: true },
    birthday: { type: Date, required: false},
    gender: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    city: { type: String, required: false},
    country:{ type: String, required: false},
    state: { type: String, required: false},
    email:{ type: String, required: false},
    address:{ type: String, required: false},
    country: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    phoneNumber:  { type: String, required: false },
    zipCode: { type: String, required: false },
    isVerified:{ type: Boolean, required: false },
    status: { type: String, required: false },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
