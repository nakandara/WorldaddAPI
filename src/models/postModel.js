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
    description: { type: String, required: false },
    title: { type: String, required: false },
    city: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    price: { type: String, required: true },
    category: [{ type: String, required: true }],
    socialIcon: [{ type: String, required: true }],
    verify: { type: Boolean, default: false } // Boolean field for verification status
}, { timestamps: true }); // Add timestamps option

const Post = mongoose.model("Post", postSchema);

export default Post;
