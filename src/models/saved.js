import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  isSaved: { type: Boolean, default: false } 
});

const Save = mongoose.model('Save', saveSchema);

export default Save;
