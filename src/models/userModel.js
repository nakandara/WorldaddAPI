import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  viewPassword: { type: String, required: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
