

const express = require('express');
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const fs = require('fs');
const chokidar = require('chokidar');
const stream = require('stream');

const app = express();

// Google Drive setup
const KEYFILE_PATH = path.join(__dirname, 'cred.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const PARENT_FOLDER_ID = '1-2Ma1FdyxkJo79FSn8YJbbGZc80Akbyv'; // Replace with your Drive folder ID

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILE_PATH,
    scopes: SCOPES,
});

// Initialize Google Drive API client
const drive = google.drive({ version: 'v3', auth });

// Specify the local folder to monitor
const watchFolder = path.join(__dirname, 'frames'); // Change this to your desired folder

// Function to log errors
const logError = (message, response = null) => {
    console.error(`Error: ${message}`);
    if (response) {
        console.error(`HTTP response: ${response}`);
    }
};

// Function to upload files to Google Drive
const uploadFileToDrive = async (filePath) => {
    try {
        const fileName = path.basename(filePath);

        // Create a file stream
        const fileStream = fs.createReadStream(filePath);

        // Upload file to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [PARENT_FOLDER_ID],
            },
            media: {
                mimeType: 'image/jpeg', // Set the appropriate MIME type for your files
                body: fileStream,
            },
            fields: 'id,name',
        });

        console.log(`Uploaded file: ${response.data.name} (ID: ${response.data.id})`);
    } catch (error) {
        logError(`Failed to upload file ${filePath}: ${error.message}`, error.response ? error.response.data : null);
    }
};

// Watch for added files in the specified folder
const watcher = chokidar.watch(watchFolder, {
    persistent: true,
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    ignoreInitial: true, // Ignore initial files
    interval: 100,
    usePolling: false,
});

// Watch for added files
watcher.on('add', (filePath) => {
    console.log(`Detected new file: ${filePath}`);
    uploadFileToDrive(filePath);
});

// Start the Express server
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
