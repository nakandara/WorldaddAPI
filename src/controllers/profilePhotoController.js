import ProfilePhoto from '../models/profilePhoto.js';

export const createProfilePhoto = async (req, res) => {
 
  const body = req.body;

  console.log(body);
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
  const { image } = req.body; // The image URL sent from frontend

  try {
    // Find existing profile photo or create a new one
    const updatedPhoto = await ProfilePhoto.findOneAndUpdate(
      { userId },
      { image }, // Update the image
      { new: true, upsert: true } // Create a new document if not found
    );

    console.log(updatedPhoto, 'Profile photo updated/created');

    res.status(200).json({
      message: 'Profile photo successfully updated or created',
      updatedPhoto,
    });
  } catch (error) {
    console.error('Error updating/creating profile photo:', error);
    res.status(500).json({ error: error.message });
  }
};
  