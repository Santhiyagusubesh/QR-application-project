const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const QRCode = require('qrcode');
require('dotenv').config();
const Jimp = require('jimp');


const Card = require('./models/Card');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Route: Create Card & Generate QR
app.post('/api/card', async (req, res) => {
    try {
        const { name, company, phone, email, website, image } = req.body;

        const vCardData = `
            BEGIN:VCARD
            VERSION:3.0
            FN:${name}
            ORG:${company}
            TEL:${phone}
           EMAIL:${email}
           URL:${website}
           END:VCARD
        `;

        // Generate QR as buffer
        const qrBuffer = await QRCode.toBuffer(vCardData, {
            errorCorrectionLevel: 'H', // High error correction for logo
            width: 400
        });

        const qrImage = await Jimp.read(qrBuffer);

        // If image/logo exists
        if (image) {
            const logo = await Jimp.read(Buffer.from(image.split(',')[1], 'base64'));

            logo.resize(100, 100); // Resize logo
            const x = (qrImage.bitmap.width - logo.bitmap.width) / 2;
            const y = (qrImage.bitmap.height - logo.bitmap.height) / 2;

            qrImage.composite(logo, x, y); // Merge logo into QR
        }

        const finalQR = await qrImage.getBase64Async(Jimp.MIME_PNG);

        const card = await Card.create({
            name,
            company,
            phone,
            email,
            website,
            image,
            qrCode: finalQR
        });

        res.json(card);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(5000, () => console.log("Server running on port 5000"));
