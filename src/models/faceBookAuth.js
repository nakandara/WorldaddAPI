import mongoose from 'mongoose';

const faceBookAuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  facebookId: { type: String, unique: false },
});

const faceBookAuth = mongoose.model('faceBookAuth', faceBookAuthSchema);

export default faceBookAuth;