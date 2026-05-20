const express = require('express');
const multer = require('multer');
const { scan, Verdict } = require('pompelmi');
const fs = require('fs');
const path = require('path');
const app = express();

// Store files in a temporary 'uploads' folder
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('document'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const filePath = path.join(__dirname, req.file.path);

    try {
        // Now we pass the real file path as a string
        const verdict = await scan(filePath);
        
        console.log('Scanner Verdict:', verdict);

        // Delete the file after scanning to keep the server clean
        fs.unlinkSync(filePath);

        if (verdict === Verdict.Malicious) {
            return res.status(403).json({ error: 'Malicious content blocked.' });
        }
        res.status(200).json({ message: 'File scan clean.' });
    } catch (err) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.status(500).json({ error: 'Scan error: ' + err.message });
    }
});

app.listen(3000, () => console.log('Security Server active on port 3000'));