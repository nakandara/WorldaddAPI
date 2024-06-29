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


    brand: { type: String, required: true },
    model: { type: String, required: true },
    trimEdition: { type: String },
    yearOfManufacture: { type: String, required: true },
    mileage: { type: String, required: true },
    engineCapacity: { type: String, required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    transmission: { type: String, enum: ['Manual', 'Automatic', 'Semi-Automatic'], required: true },
    bodyType: { type: String, enum: ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck'], required: true },

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
    verify: { type: Boolean, default: false } // Boolean field for verification status
}, { timestamps: true }); // Add timestamps option

const Post = mongoose.model("Post", postSchema);

export default Post;
