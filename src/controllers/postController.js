import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  const body = req.body;
  

  console.log(body);

  try {
    const postDB = new Post(body);
    await postDB.save();
    res
      .status(200)
      .json({ success: true, message: "Post created Successfully " });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPosts = async (req, res) => {
    const { userId } = req.params;
  
  try{
    Post.find({userId}).then(data => {
        res.json(data)
    }).catch(error => {
        res.status(408).json({ error })
    })
}catch(error){
    res.json({error})
}
  };

  export const getPost = async (req, res) => {
    const { userId,postId} = req.params;
  
    try {
      const PostByID = await Post.find({ userId,postId });
  
      if (!PostByID || PostByID.length === 0) {
        return res.status(404).json({ success: false, message: "Posts not found" });
      }
  
      // Map all posts to construct image URLs
      const postWithUrls = PostByID.map(post => ({
        PostImageUrl: `${req.protocol}://${req.get("host")}/uploads/${post.image}`,
        PostDetails: post
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
        return res.status(404).json({ success: false, message: "Post not found" });
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
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, deletedPost ,message:"deleted post"});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
