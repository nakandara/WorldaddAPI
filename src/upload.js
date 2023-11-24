import multer from 'multer';


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop(); // Get the original file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  // Validate the file type if needed
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};



const upload = multer({ storage, fileFilter });

export default upload;
