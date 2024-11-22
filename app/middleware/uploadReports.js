const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const logger = require('../logger/logger');

// const uploadReports = multer({
//     storage: multer.memoryStorage() 
// });


// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
});
const s3 = new AWS.S3();

// Configure multer to use memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase().substring(1);
        cb(null, true);
    }
}).single('file');

// Middleware to handle S3 upload
async function uploadReports(req, res, next) {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            logger.error(`Multer error: ${err.message}`);
            return res.status(400).json({ error: err.message });
        } else if (err) {
            logger.error(`File upload error: ${err.message}`);
            return res.status(400).json({ error: err.message });
        }

        // Ensure a file is uploaded
        if (!req.file) {
            const errorMessage = 'No file uploaded';
            logger.warn(errorMessage);
            return res.status(400).json({ error: errorMessage });
        }

        // const ext = path.extname(req.file.originalname).toLowerCase().substring(1);
        const folder = 'patientReports';
        const s3Key = `${folder}/${Date.now()}-${req.file.originalname}`;

        // S3 upload parameters
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: s3Key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        try {
            const s3Response = await s3.upload(params).promise();
            console.log(`File uploaded to S3: ${s3Response.Location}`);
            logger.info(`File uploaded to S3: ${s3Response.Location}`);

            // Attach the S3 URL to the request for further processing
            req.file.location = s3Response.Location;
            next();
        } catch (s3Err) {
            logger.error(`Failed to upload file to S3: ${s3Err.message}`);
            return res.status(500).json({ error: 'Failed to upload file to S3' });
        }
    });
}

module.exports = uploadReports; 
