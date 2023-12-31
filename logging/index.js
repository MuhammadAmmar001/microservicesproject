const express = require('express');
const bodyParser = require('body-parser');
const LogModel = require("./models/Log");
const { default: mongoose } = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
const port = 3002;

// Middleware to parse JSON in requests
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


try {
  
  mongoose.connect('mongodb+srv://ahmadareeb3026:1234@cluster0.u0yv2iy.mongodb.net/cloud_log_svc?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}


// Route to save a log entry
app.post('/log', async (req, res) => {
    try {
        const { userId, transactionType, fileSize } = req.body;
        console.log(req.body);
        // Create a log entry
        const logEntry = new LogModel({
            userId: userId,
            transactionType: transactionType,
            fileSize: fileSize,
        });


        await logEntry.save();

        res.status(200).json({ message: 'Log entry created successfully' });
    } catch (error) {
        console.error('Error creating log entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all logs
app.get('/logs', async (req, res) => {
    try {
        const logs = await LogModel.find();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get logs for a specific user
app.get('/logs/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;       

        // Get logs for the specified user
        const logs = await LogModel.find({ userId: userId });
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`LOGGING Server is running on http://localhost:${port}`);
});
