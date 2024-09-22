const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const upload = multer(); // For handling file uploads

// POST Method to handle the data
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, email, roll_number } = req.body;

    // Extract numbers and alphabets from the data array
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length ? [Math.max(...lowercaseAlphabets)] : [];

    // Handle file validation (base64)
    const file_valid = req.file ? true : false;
    const file_mime_type = req.file ? req.file.mimetype : null;
    const file_size_kb = req.file ? (req.file.size / 1024).toFixed(2) : null;

    // Respond with JSON
    res.json({
        is_success: true,
        user_id: `your_name_01012000`, // Replace with your full name and dob
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// GET Method for operation_code
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
