# Automatic Image Upload to Google Drive

This Node.js application watches a specific folder on your local system and automatically uploads any new images to a specified folder on your Google Drive account. It uses the `chokidar` library to monitor the folder for changes and `Google Drive API` for cloud interaction.

## Index

- [Setup](#setup)
- [Execution](#execution)
- [Google Drive Permissions](#google-drive-permissions)
- [Running Node.js Application in the Background](#running-nodejs-application-in-the-background-using-pm2)
- [References](#references)

## Setup

1. **Folder to Watch**: Specify the folder you want the application to watch. This folder will be monitored for new images to upload.
   
2. **Google Drive Folder ID**: Replace the placeholder folder ID in the code with the ID of your Google Drive folder where you want to upload images.

![image](https://github.com/HarshaLakkaraju/upload_to_drive_using_node/assets/96900085/2993a4b5-43b0-4bae-b678-0e5e1bbf0372)

5. **Credentials**: Obtain and add your own `cred.json` file in the project directory. This file contains OAuth 2.0 credentials to interact with Google Drive.

6. **Error Logging**: Error logging functionality is included to log and display any errors during the upload process.

### Obtaining Google Cloud Credentials

1. Go to the [Google Cloud Console](https://cloud.google.com/).
2. Enable the [Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com).
3. Create a service account and generate a `cred.json` file.
4. Save the `cred.json` file in your project directory.

## Google Drive Permissions

1. **Manage Folder Permissions**:
    - Share the Google Drive folder with the email associated with your API client.
    - Add your API email to the folder with necessary permissions as an editor.
  
2. **IAM and Admin Permissions**:
    - Go to the IAM and Admin section.
    - Add the service account with appropriate permissions to your requested users.

For more detailed guidance on permissions and settings, follow the reference video pinned below.

## Execution

1. **Install Node.js**: Make sure Node.js is installed on your system.

2. **Install Dependencies**:
    - Navigate to the project directory and run:
        ```shell
        npm install
        ```

3. **Run the Application**:
    - Start the application:
        ```shell
        node app.js
        ```

After execution, the application will start monitoring the specified folder and uploading new files to the cloud.

## Running Node.js Application in the Background Using `pm2`

1. **Install `pm2`**:
    ```shell
    npm install -g pm2
    ```

2. **Start the Application**:
    ```shell
    pm2 start app.js
    ```

3. **Manage Application**:
    - List processes: `pm2 list`
    - Restart: `pm2 restart app.js`
    - Stop: `pm2 stop app.js`
    - Delete: `pm2 delete app.js`

4. **Auto-Restart**:
    Start the app with watch mode for auto-restart:
    ```shell
    pm2 start app.js --watch
    ```

5. **Save and Start on Boot**:
    - Save the current process list: `pm2 save`
    - Start on boot:
        - Linux: `pm2 startup systemd`
        - Windows: `pm2 startup`

## References

- [Video Tutorial](https://www.youtube.com/watch?v=jaNo14iQdxk)
- [GitHub Repository](https://github.com/phegondev/uploadImageToGoogleDrive/tree/angular-java)
- [Medium Article](https://medium.com/@dev003/how-to-upload-and-read-files-from-google-drive-in-a-java-application-a2f17b7fafa7)
