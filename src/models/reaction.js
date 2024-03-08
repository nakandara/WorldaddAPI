import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference to the Post model
      required: true,
    },
    type: {
      type: String,
      enum: ['animateLike', 'animateSmile', 'animateHeart'], // Define possible reaction types
      required: true,
    },
  });
  
  const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
