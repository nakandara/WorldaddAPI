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
    // Extracting data from form data
    const { userId, description, category } = req.body;

    // Uploading image to S3
    const imageUrl = await uploadImageToS3("world-api-demo", req.file);
    
    // Saving post to the database
    const postDB = new Post({
      userId,
      image: imageUrl,
      description,
      category,
      socialIcon:"heart"
    });
    await postDB.save();

    // Sending response
    res.status(200).json({ success: true, message: "Post created Successfully", body: postDB });
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
      PostImageUrl: `${req.protocol}://${req.get("host")}/uploads/${
        post.image
      }`,
      PostDetails: post,
    }));

    res.status(200).json({ success: true, allPosts: postWithUrls });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const editPost = async (req, res) => {
  const { userId, postId } = req.params;
  const { image, description, category } = req.body;

  try {
    // Find and update the post based on userId and postId
    const updatedPost = await Post.findOneAndUpdate(
      { userId, postId },
      { image, description, category },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    // Find and delete the post based on userId and postId
    const deletedPost = await Post.findOneAndDelete({ userId, postId });

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
