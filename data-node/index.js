const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://144singhsarthak:2C8AmRViNzakr6Ii@cluster0.xqv8yjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const dataSchema = new mongoose.Schema({
    heading: String,
    firstName: String,
    age: Number,
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());

app.post('/api/data', async (req, res) => {
    try {
        const { data } = req.body;
        const savedData = [];

        for (const item of data) {
            const newData = new Data(item);
            savedData.push(await newData.save());
        }

        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find({}, '-_id -__v').lean();

        if (data.length === 0) {
            return res.status(200).json({ schema: [], data: [] });
        }

        const firstDoc = data[0];
        const schema = Object.keys(firstDoc).map((key, index) => ({
            [key]: 'text',
            apiMap: `map${index + 1}`
        }));

        const mappedData = data.map(item => {
            const mappedItem = {};
            Object.keys(item).forEach((key, index) => {
                mappedItem[`map${index + 1}`] = item[key].toString();
            });
            return mappedItem;
        });

        res.status(200).json({ schema, data: mappedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
