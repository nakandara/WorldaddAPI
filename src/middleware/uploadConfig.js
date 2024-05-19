
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket:process.env.AWS_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname); // Unique key for each file
    }
  })
});

export default upload;
