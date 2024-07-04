


import Post from "../models/postModel.js";
import AWS from "aws-sdk";
import fs from "fs";
const s3 = new AWS.S3();

function uploadImageToS3(bucketName, file) {
  const params = {
    Bucket: "world-api-demo",
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

export const createPost = async (req, res) => {
  try {
    const { userId,bodyType,negotiable, category,brand,model,trimEdition,yearOfManufacture,mileage,engineCapacity,fuelType,transmission,description, city, mobileNumber, whatsappNumber, price, title, verify,plane } = req.body;
console.log(category,'trteeeeeeeeeee');
    // Create an array of image objects
    const images = req.files.map(file => ({
      imageUrl: file.location
    }));

    // Create a single Post object with all images
    const postDB = new Post({
      userId,
      plane,
      category:[category],
      city,
      title,
      mobileNumber,
      whatsappNumber,
      price,
      images, // Assign the array of images
      description,
      socialIcon: ["heart"],
      verify,
      bodyType,negotiable, brand,model,trimEdition,yearOfManufacture,mileage,engineCapacity,fuelType,transmission
    });

    const savedPost = await postDB.save();
    // Sending response
    res.status(200).json({ success: true, message: "Post created Successfully", post: savedPost });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    Post.find({ userId })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
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
    console.log();
    
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
    const { description, bodyType, category, negotiable, brand, model, trimEdition, yearOfManufacture, mileage, engineCapacity, fuelType, transmission, city, mobileNumber, whatsappNumber, price, title, verify, plane } = req.body;

    // Check if the post exists
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
