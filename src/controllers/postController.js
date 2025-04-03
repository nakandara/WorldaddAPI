import Post from "../models/postModel.js";
import Save from "../models/saved.js";

export const createPost = async (req, res) => {
  try {
    const {
      userId,
      bodyType,
      negotiable,
      category,
      brand,
      model,
      trimEdition,
      yearOfManufacture,
      mileage,
      engineCapacity,
      fuelType,
      transmission,
      description,
      city,
      mobileNumber,
      whatsappNumber,
      price,
      title,
      verify,
      plane,
      tags,
      condition,
      image
    } = req.body;

    console.log(req.body); // Log the entire request body

    // Convert image to an array if it's not already an array
    const images = Array.isArray(image) ? image : [image];

    // Map image URLs to an array of objects with imageUrl field
    const imageObjects = images.map((url) => ({ imageUrl: url }));

    // Create a single Post object with all images
    const postDB = new Post({
      userId,
      plane,
      category: [category],
      city,
      title,
      mobileNumber,
      whatsappNumber,
      price,
      images: imageObjects, // Assign the array of image objects
      description,
      socialIcon: ["heart"],
      verify,
      bodyType,
      negotiable,
      brand,
      model,
      trimEdition,
      yearOfManufacture,
      mileage,
      engineCapacity,
      condition,
      tags,
      fuelType,
      transmission
    });

    const savedPost = await postDB.save();

    const newSave = new Save({
      name: title, // You can adjust the name field as needed
      userId,
      postId: postDB._id,
      isSaved: false
    });

    await newSave.save();

    // Sending response
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all posts by userId (since user can have multiple posts)
    const posts = await Post.find({ userId });

    console.log(userId, 'Searching for posts by userId:', userId);

    if (posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }

    res.json(posts);  // Return all matching posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    
    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: 'No posts found' });
    }

    res.status(200).json({ success: true, message: 'Posts found', data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getVerifyAllPosts = async (req, res) => {
 
  try {
    // Find posts where verify is true
    const posts = await Post.find({ verify: true }).sort({ createdAt: -1 });;

    
    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: 'No verified posts found' });
    }
    
    res.status(200).json({ success: true, message: 'Verified posts found', data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};



export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const PostByID = await Post.find({ postId });

    
    if (!PostByID || PostByID.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }

    // Map all posts to construct image URLs
    const postWithUrls = PostByID.map((post) => ({
      PostImageUrl: post.image,
      PostDetails: post,
    }));

    res.status(200).json({ success: true, allPosts: postWithUrls });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is passed in the URL parameters
    const { description, bodyType,tags, category, negotiable, brand, model, trimEdition, yearOfManufacture, mileage, condition,engineCapacity, fuelType, transmission, city, mobileNumber, whatsappNumber, price, title, verify, plane } = req.body;

 
    const existingPost = await Post.findOne({ postId });
    if (!existingPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Update the post fields
    existingPost.description = description || existingPost.description;
    existingPost.category = category || existingPost.category;
    existingPost.plane = plane || existingPost.plane;
    existingPost.city = city || existingPost.city;
    existingPost.mobileNumber = mobileNumber || existingPost.mobileNumber;
    existingPost.whatsappNumber = whatsappNumber || existingPost.whatsappNumber;
    existingPost.condition = condition || existingPost.condition;
    existingPost.price = price || existingPost.price;
    existingPost.title = title || existingPost.title;
    existingPost.verify = verify !== undefined ? verify : existingPost.verify;
    existingPost.bodyType = bodyType || existingPost.bodyType;
    existingPost.negotiable = negotiable !== undefined ? negotiable : existingPost.negotiable;
    existingPost.brand = brand || existingPost.brand;
    existingPost.model = model || existingPost.model;
    existingPost.trimEdition = trimEdition || existingPost.trimEdition;
    existingPost.yearOfManufacture = yearOfManufacture || existingPost.yearOfManufacture;
    existingPost.mileage = mileage || existingPost.mileage;
    existingPost.engineCapacity = engineCapacity || existingPost.engineCapacity;
    existingPost.fuelType = fuelType || existingPost.fuelType;
    existingPost.transmission = transmission || existingPost.transmission;
    existingPost.tags = tags || existingPost.tags;

    // Save the updated post
    const updatedPost = await existingPost.save();

    // Sending response
    res.status(200).json({ success: true, message: "Post updated successfully", body: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};



export const deletePost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    // Find and delete the post based on userId and postId
    const deletedPost = await Post.findOneAndDelete({ userId, postId });
    console.log(deletedPost);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res
      .status(200)
      .json({ success: true, deletedPost, message: "deleted post" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
