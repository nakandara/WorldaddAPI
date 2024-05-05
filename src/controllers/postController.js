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
    const { userId, description, category } = req.body;

    const imageUrls = [];
    const images = []; // Array to store image objects

    // Assuming req.files is an array of image files
    for (const file of req.files) {
      const imageUrl = await uploadImageToS3("world-api-demo", file);
      imageUrls.push(imageUrl);
      images.push({ imageUrl }); // Push image object to images array
    }

    // Create a single Post object with all images
    const postDB = new Post({
      userId,
      images,
      description,
      category,
      socialIcon: ["heart"]
    });
    await postDB.save();

    // Sending response
    res.status(200).json({ success: true, message: "Post created Successfully" });
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
    const posts = await Post.find();
    
    if (!posts) {
      return res.status(404).json({ success: false, message: 'No posts found' });
    }
    
    res.status(200).json({ success: true, message: 'Posts found', data: posts });
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
    const { description, category } = req.body;

    // Check if the post exists
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Update the post fields
    existingPost.description = description;
    existingPost.category = category;

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
