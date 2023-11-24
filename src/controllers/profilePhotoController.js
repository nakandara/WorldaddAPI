import ProfilePhoto from '../models/profilePhoto.js';

export const createProfilePhoto = async (req, res) => {
    const { userId } = req.body;
  if (!req.files.image ) {
    return res.status(400).json({ message: ' image is required' });
  }

  
  const image = req.files.image[0].filename;
  console.log(req.files.image,'ddddddddddd');
  

  const ProfilePhotoDB = new ProfilePhoto({image,userId});

  try {
    await ProfilePhotoDB.save();
    res.status(200).json({ success: true, message: 'News created profile photo ' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const getProfilePhoto = async (req, res) => {
    const { userId } = req.params;
  
    try {
      
      const profilePhoto = await ProfilePhoto.findOne({ userId });
   const    imageUrl= `${req.protocol}://${req.get('host')}/uploads/${profilePhoto.image}`
  
      if (!profilePhoto) {
        return res.status(404).json({ success: false, message: 'Profile photo not found' });
      }
  
      
      res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const editProfilePhoto = async (req, res) => {
    const { userId } = req.params;
   
    try {
     
      const existingProfilePhoto = await ProfilePhoto.findOne({ userId });
     
  
      if (!existingProfilePhoto) {
        return res.status(404).json({ success: false, message: 'Profile photo not found' });
      }
  
   
      if (req.files.image) {
        const newImage = req.files.image[0].filename;
        existingProfilePhoto.image = newImage;
      }
  
     
      await existingProfilePhoto.save();
  
    
      res.status(200).json({ success: true, message: 'Profile photo updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  
  
  

  