const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const jsonFilePath = path.join(__dirname, 'data.json');

// Kayıt işlemi (POST)
app.post('/register', (req, res) => {
    const { name, email, message } = req.body;
    const user = { name, email, message };
    
    // Verilerin doğru şekilde alındığını kontrol et
    console.log('Received Data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Verilerin eksik olup olmadığını kontrol et
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Tüm alanları doldurun.' });
    }

    // JSON dosyasını oku
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            // Dosya yoksa yeni dosya oluştur
            if (err.code === 'ENOENT') {
                fs.writeFile(jsonFilePath, JSON.stringify([user], null, 2), (err) => {
                    if (err) {
                        console.error('Veri yazma hatası:', err);
                        return res.status(500).send('Veri yazma hatası');
                    }
                    res.status(201).json({ message: 'Kullanıcı kaydedildi' });
                });
            } else {
                console.error('Veri okuma hatası:', err);
                return res.status(500).send('Veri okuma hatası');
            }
        } else {
            let users = [];
            if (data) {
                // JSON dosyasındaki mevcut verileri oku
                users = JSON.parse(data);
            }

            // Yeni kullanıcıyı mevcut verilere ekle
            users.push(user);

            // Yeni verileri JSON dosyasına kaydet
            fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Veri yazma hatası:', err);
                    return res.status(500).send('Veri yazma hatası');
                }

                res.status(201).json({ message: 'Kullanıcı kaydedildi' });
            });
        }
    });
});


// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
