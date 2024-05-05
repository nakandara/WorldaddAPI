import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }
});

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        },
        required: true,
        unique: true,
    },
    images: [imageSchema], // Array of objects with imageUrl field
    description: { type: String, required: true },
    category: [{ type: String, required: true }],
    socialIcon: [{ type: String, required: true }]
});

const Post = mongoose.model("Post", postSchema);

export default Post;
