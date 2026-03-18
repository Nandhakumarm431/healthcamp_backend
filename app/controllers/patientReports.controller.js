const db = require('../models')
<<<<<<< HEAD
const patientDetlsDB = db.patientDetls
const patientReportDB = db.patientReports
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.BLOB_STORAGE_ACC



async function createContainerIfNotExists(containerName) {

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const exists = await containerClient.exists();

    if (!exists) {
        console.log(`Creating new container: ${containerName}`);
        const createContainerResponse = await containerClient.create();
        console.log(`Container "${containerName}" created successfully`);
    } else {
        console.log(`Container "${containerName}" already exists`);
    }
    return containerClient;
}


const uploadPatientReports = async (req, res) => {
    try {
        const patientID = req.body.patientID;

        if (!req.files || !patientID) {
            return res.status(400).send('Files and patientID are required.');
        }

        // Ensure container exists for patient
        const containerClient = await createContainerIfNotExists(patientID.toLowerCase());

        // Handle multiple file uploads in parallel
        const uploadFilesPromises = req.files.map(async (file) => {
            const fileName = file.originalname;
            const blobName = `${Date.now()}-${fileName}`;

            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.size, {
                blobHTTPHeaders: { blobContentType: file.mimetype } // Set proper content type
            });

            if (uploadBlobResponse._response.status !== 201) {
                throw new Error('Failed to upload some files to Azure Blob Storage.');
            }

            const blobUrl = blockBlobClient.url;

            // Save report data to DB
            return patientReportDB.create({
                patientID: patientID,
                reportFileName: fileName,
                reporDownloadtUrl: blobUrl, // Save blob URL
                reportType: req.body.reportType,
                reportfileSize: file.size,
                uploadedBy: req.body.uploadedBy,
                reportUploadDate: new Date() // Capture current date
            });
        });

        // Wait for all files to be uploaded and saved
        const reportData = await Promise.all(uploadFilesPromises);

        // Send success response
        res.status(200).send({
            message: 'Files uploaded and report data saved successfully.',
            data: reportData
        });
    } catch (err) {
        console.error('Error during file upload:', err);
        res.status(500).send('An error occurred while uploading files.');
    }

}


module.exports = {
    uploadPatientReports
=======
const patientDB = db.patientDetls
const patientReportDB = db.patientReports
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const axios = require('axios');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
});
const s3 = new AWS.S3();

const uploadPatientReports = async (req, res) => {
    try {
        const file = req.file;
        const { patientID, reportType, description, userId } = req.body;

        if (!file || !patientID) {
            return res.status(400).send('Files and patientID are required.');
        }
        patientDB.findOne({
            where: {
                patientID: patientID
            }
        }).then(async patient => {
            let fileUrl;
            fileUrl = file.location;
            const newReport = await patientReportDB.create({
                patientDetlId: patient.id,
                reportFileName: file.name,
                reportFilePath: file.path,
                reporDownloadtUrl: fileUrl,
                reportType: reportType,
                description: description,
                reportfileSize: file.size,
                userId: userId,
                uploadedBy: userId,
                isDeleted: false,
                reportUploadDate: new Date()
            });

            res.status(200).json(newReport);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const downloadReports = async (req, res) => {
    try {
        const { patientID, filename } = req.body;
        if (!patientID || !filename) {
            return res.status(400).send('patientID and fileName are required.');
        }
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `patientReports/${filename}`, // Assumes the file was stored under 'uploads/'
        };
        s3.getObject(params, (err, data) => {
            if (err) {
                return res.status(404).json({ 'File not found': err });
            }
            res.setHeader('Content-Type', data.ContentType);
            res.send(data.Body);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const downloadAttachments = async (req, res) => {
    try {
        const { filePath } = req.body;
        if (!filePath) {
            return res.status(400).json({ error: 'File path is required in the request body' });
        }

        //Lambda URL
        const lambdaUrl = process.env.AWS_LAMBDA_URL_DOWNLOAD_FILE;
        const lambdaResponse = await axios.post(lambdaUrl, { file_path: filePath });

        if (!lambdaResponse.data || !lambdaResponse.data.download_url) {
            return res.status(500).json({ error: 'Failed to fetch presigned URL' });
        }

        const presignedUrl = lambdaResponse.data.download_url;
        const audioResponse = await axios.get(presignedUrl, { responseType: 'stream' });

        // Set appropriate headers
        res.setHeader('Content-Type', audioResponse.headers['content-type']);
        res.setHeader('Content-Disposition', `inline; filename="${filePath.split('/').pop()}"`);

        audioResponse.data.pipe(res);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

const getAllPatientReports = async (req, res) => {
    try {
        const patientID = req.params.patientID
        let patientReports = await patientReportDB.findAll({
            where: {
                patientDetlId: patientID
            }
        })
        res.status(200).send(patientReports)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteAttachment = async (req, res) => {
    let id = req.params.id
    try {
        const deletAtt = await patientReportDB.update({ isDeleted: true }, { where: { id: id } });
        res.json({
            status: "SUCCESS",
            message: "Attachment details deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Delete failed",
        });
    }
}

module.exports = {
    uploadPatientReports,
    getAllPatientReports,
    downloadAttachments,
    downloadReports,
    deleteAttachment
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
}
