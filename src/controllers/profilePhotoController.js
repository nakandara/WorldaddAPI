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

  // export const editProfilePhoto = async (req, res) => {
  //   const { userId } = req.params;
   
  //   try {
     
  //     const existingProfilePhoto = await ProfilePhoto.findOne({ userId });
     
  
  //     if (!existingProfilePhoto) {
  //       return res.status(404).json({ success: false, message: 'Profile photo not found' });
  //     }
  
   
  //     if (req.files.image) {
  //       const newImage = req.files.image[0].filename;
  //       existingProfilePhoto.image = newImage;
  //     }
  
     
  //     await existingProfilePhoto.save();
  
    
  //     res.status(200).json({ success: true, message: 'Profile photo updated successfully' });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error.message });
  //   }
  // };
  
  
  
  

  