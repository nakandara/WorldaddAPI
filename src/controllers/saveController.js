// saveController.js
import Save from '../models/saved.js';
import Post from '../models/postModel.js';

export const savePost = async (req, res) => {
  const { userId, postId, name } = req.body;

  try {
    let save = await Save.findOne({ userId, postId });

    if (save) {
      // Toggle the isSaved value
      save.isSaved = !save.isSaved;
    } else {
      // Create a new save record if it doesn't exist
      save = new Save({ userId, postId, name, isSaved: true });
    }

    await save.save();
    res.status(200).json({ success: true, isSaved: save.isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSaveById = async (req, res) => {
  const { userId } = req.params;

  try {
    const savedPosts = await Save.find({ userId, isSaved: true });
    res.status(200).json({ success: true, savedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }}

// Get all Save documents
export const getAllSaves = async (req, res) => {
  try {
    const saves = await Save.find().populate('postId');
    res.status(200).json(saves);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single Save document by ID
// export const getSaveById = async (req, res) => {
//   const { userId } = req.params;
//   console.log(userId, 'wwwwwwwwww');

//   try {
//     const saves = await Save.find({ userId }).populate('postId');
//     if (saves.length === 0) return res.status(404).json({ message: 'No saves found for this user' });
//     res.status(200).json({ savedPosts: saves });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


// Update the save boolean value
export const updateSave = async (req, res) => {
  const { id } = req.params;
  const { save } = req.body;

  try {
    const updatedSave = await Save.findByIdAndUpdate(
      id,
      { save },
      { new: true }
    );
    if (!updatedSave) return res.status(404).json({ message: 'Save not found' });
    res.status(200).json(updatedSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Save document
export const deleteSave = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSave = await Save.findByIdAndDelete(id);
    if (!deletedSave) return res.status(404).json({ message: 'Save not found' });
    res.status(200).json({ message: 'Save deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
