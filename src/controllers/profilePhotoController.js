import ProfilePhoto from '../models/profilePhoto.js';

export const createProfilePhoto = async (req, res) => {
 
  const body = req.body;
    try{
        const newImage = await ProfilePhoto.create(body)
        newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
};



export const getProfilePhoto = async (req, res) => {
  const { userId } = req.params;
  try{
    ProfilePhoto.find({userId}).then(data => {
        res.json(data)
    }).catch(error => {
        res.status(408).json({ error })
    })
}catch(error){
    res.json({error})
}
};






export const editProfilePhoto = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body; // This should contain the updated data for the profile photo

  try {
    const updatedPhoto = await ProfilePhoto.findOneAndUpdate({ userId }, updateData, { new: true });
    if (updatedPhoto) {
      res.status(200).json({ msg: "Profile photo updated successfully", updatedPhoto });
    } else {
      res.status(404).json({ msg: "Profile photo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

  