import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
          return new mongoose.Types.ObjectId();
        },
        required: true,
        unique: true,
      },
    image: [{ type: String, required: true }],
    description: { type: String, required: true},
    category: [{ type: String, required: true }],
  
});

const Post = mongoose.model("Post", postSchema);

export default Post;
