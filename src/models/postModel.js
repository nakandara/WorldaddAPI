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
    brand: { type: String, required: false },
    model: { type: String, required: false },
    trimEdition: { type: String },
    yearOfManufacture: { type: String, required: false },
    mileage: { type: String, required: false },
    engineCapacity: { type: String, required: false },
    fuelType: { type: [String], enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    transmission: { type: [String], enum: ['Manual', 'Automatic', 'Semi-Automatic'], required: true },
    bodyType: { type: String, required: false },
    category: [{ type: String, required: false }],
    images: [imageSchema], // Array of objects with imageUrl field
    negotiable: { type: Boolean, default: false },
    description: { type: String, required: false },
    plane: { type: String, required: false },
    title: { type: String, required: false },
    city: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    price: { type: String, required: true },
    socialIcon: [{ type: String, required: true }],
    verify: { type: Boolean, default: false },
    condition: { type: String, enum: ['New', 'Used', 'Recondition'], required: true },
    tags: { type: [String], default: [] } // Add this line for tags array
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
