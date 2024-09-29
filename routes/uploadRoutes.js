const express = require('express');
const router = express.Router();
const upload = require('../useMulter/uploadConfig');

router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    return res.status(200).json({
        message: 'File uploaded successfully',
        file: file
    });
});

module.exports = router;
