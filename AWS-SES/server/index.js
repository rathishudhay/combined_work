const express = require('express');
const bodyParser = require('body-parser');
const { SESClient, VerifyEmailIdentityCommand, SendEmailCommand } = require('@aws-sdk/client-ses');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const fs = require('fs');
const admin = require('./firebaseAdmin.js');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;  // Make sure to add this in your .env file

const sesClient = new SESClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

exports.whitelistEmail = async (req, res) => {
    const emailAddress = req.body.email;

    if (!emailAddress) {
        return res.status(400).json({ message: 'Missing email address' });
    }

    const params = {
        EmailAddress: emailAddress
    };

    try {
        await sesClient.send(new VerifyEmailIdentityCommand(params));
        res.json({ message: 'Email address whitelisted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error whitelisting email address' });
    }
};

exports.sendEmail = async (req, res) => {
    const senderEmail = req.body.senderEmail;
    const recipientEmail = req.body.recipientEmail;
    const body = req.body.body;
    const subject = req.body.subject;

    if (!senderEmail || !recipientEmail || !body) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const params = {
        Source: senderEmail,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: body
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject ?? "This is sent using SES AWS"
            }
        }
    };

    try {
        await sesClient.send(new SendEmailCommand(params));
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    }
};

exports.sendFile = async (req, res) => {
    const filePath = "./Danfo-Regular.ttf";
    const fileName = 'font_file.ttf';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }

        res.setHeader('Content-Type', 'application/font-sfnt');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(data);
    });
};

exports.uploadFileToS3 = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileContent = fs.readFileSync(file.path);

    const params = {
        Bucket: bucketName,
        Key: `text/${file.originalname}`,  // Save under the text folder
        Body: fileContent
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        fs.unlinkSync(file.path);  // Delete the file from local storage after upload
        res.json({ message: 'File uploaded successfully', fileUrl: `https://${bucketName}.s3.${region}.amazonaws.com/text/${file.originalname}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

exports.uploadImageToS3 = async (req, res) => {
    const image = req.file;

    if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const imageContent = fs.readFileSync(image.path);

    const params = {
        Bucket: bucketName,
        Key: `favicon/${image.originalname}`,  // Save under the favicon folder
        Body: imageContent,
        ContentType: 'image/jpeg'  // Adjust this based on your image type
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        fs.unlinkSync(image.path);  // Delete the image from local storage after upload
        res.json({ message: 'Image uploaded successfully', imageUrl: `https://${bucketName}.s3.${region}.amazonaws.com/favicon/${image.originalname}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};

exports.sendNotification = async (req, res) => {
    const { token, title, body } = req.body;

    if (!token || !title || !body) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    try {
        const response = await admin.messaging().send(message);
        res.json({ message: 'Notification sent successfully', response });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};

app.post('/api/whitelist', exports.whitelistEmail);
app.post('/api/send-mail', exports.sendEmail);
app.get("/file", exports.sendFile);
app.post('/api/upload-text', upload.single('text'), exports.uploadFileToS3);
app.post('/api/upload-image', upload.single('image'), exports.uploadImageToS3);
app.post('/api/send-notification', exports.sendNotification);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
