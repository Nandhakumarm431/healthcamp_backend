const db = require('../models')
const patientDB = db.patientDetls
const patientReportDB = db.patientReports
const fs = require('fs');
const path = require('path');

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
            fileUrl = file.location; // S3 file URL provided in the middleware

            const newReport = await patientReportDB.create({
                patientDetlId: patient.id,
                reportFileName: file.name,
                reporDownloadtUrl: fileUrl,
                reportType: reportType,
                description: description,
                reportfileSize: file.size,
                userId: userId,
                uploadedBy: userId,
                reportUploadDate: new Date()
            });

            res.status(200).json(newReport);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

async function downloadFileFromShare(shareName, directoryName, fileName, downloadPath) {
    const shareServiceClient = ShareServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const shareClient = shareServiceClient.getShareClient(shareName);
    const directoryClient = shareClient.getDirectoryClient(directoryName);
    const fileClient = directoryClient.getFileClient(fileName);
    const exists = await fileClient.exists();
    if (!exists) {
        throw new Error(`File "${fileName}" not found in directory "${directoryName}".`);
    }
    const downloadFilePath = path.join(downloadPath, fileName);
    await fileClient.downloadToFile(downloadFilePath);
    return downloadFilePath;
}

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
                logger.warn(`Audio file not found: ${filename}`);
                return res.status(404).json({ 'Audio file not found': err });
            }
            res.setHeader('Content-Type', data.ContentType || 'audio/mpeg');
            logger.info(`Playing audio file - ${filename}`);
            res.send(data.Body);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = {
    uploadPatientReports,
    getAllPatientReports,
    downloadReports
}
