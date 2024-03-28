import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  viewPassword: { type: String, required: false },
  method: { type: String, required: false },

  token: { type: String, required: false } // New field to store token
});

const User = mongoose.model("User", UserSchema);

export default User;
