const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes pour servir les autres fichiers HTML
app.get('/HTMLPage1', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTMLPage1.html'));
});

app.get('/HTMLPage2', (req, res) => {
    res.sendFile(path.join(__dirname, 'HtmlPage2.html'));
});

app.get('/HTMLPage3', (req, res) => {
    res.sendFile(path.join(__dirname, 'HtmlPage3.html'));
});

// Route pour servir les fichiers CSS
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
const uri = "mongodb+srv://stjean:stjeandatabase@cluster0.xf7f4.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connecté à MongoDB');
    }).catch((error) => {
        console.error('Erreur de connexion à MongoDB:', error);
    });

// Schéma pour stocker les données de sûreté
const SafetySchema = new mongoose.Schema({
    className: String,
    status: String,
    description: String
});

const Safety = mongoose.model('Safety', SafetySchema);

// Route pour mettre à jour la sûreté
app.post('/update-safety', async (req, res) => {
    const { className, status, description } = req.body;
    try {
        const existingSafety = await Safety.findOne({ className });
        if (existingSafety) {
            existingSafety.status = status;
            existingSafety.description = description;
            await existingSafety.save();
        } else {
            const newSafety = new Safety({ className, status, description });
            await newSafety.save();
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Erreur lors de la mise à jour de la sûreté');
    }
});

// Route pour obtenir la sûreté et description d'une classe
app.get('/get-safety/:className', async (req, res) => {
    const { className } = req.params;
    try {
        const safety = await Safety.findOne({ className });
        if (safety) {
            res.json(safety);
        } else {
            res.status(404).send('Sûreté non trouvée');
        }
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
