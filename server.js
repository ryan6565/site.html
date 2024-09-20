const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Ajoute cette ligne

const app = express();
app.use(cors());
app.use(express.json());

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour servir les fichiers CSS
app.use('/public', express.static(path.join(__dirname, 'public'))); // Ajoute cette ligne

// Connexion � MongoDB
const uri = "mongodb+srv://stjean:stjeandatabase@cluster0.xf7f4.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connect� � MongoDB');
    }).catch((error) => {
        console.error('Erreur de connexion � MongoDB:', error);
    });

// Sch�ma pour stocker les donn�es de s�ret�
const SafetySchema = new mongoose.Schema({
    className: String,
    status: String,
    description: String
});

const Safety = mongoose.model('Safety', SafetySchema);

// Route pour mettre � jour la s�ret�
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
        res.status(500).send('Erreur lors de la mise � jour de la s�ret�');
    }
});

// Route pour obtenir la s�ret� et description d'une classe
app.get('/get-safety/:className', async (req, res) => {
    const { className } = req.params;
    try {
        const safety = await Safety.findOne({ className });
        if (safety) {
            res.json(safety);
        } else {
            res.status(404).send('S�ret� non trouv�e');
        }
    } catch (error) {
        res.status(500).send('Erreur lors de la r�cup�ration des donn�es');
    }
});

// D�marrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en �coute sur le port ${port}`);
});
