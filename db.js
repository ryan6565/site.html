const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://stjean:<stjeandatabase>@cluster0.xf7f4.mongodb.net/?retryWrites=true&w=majority"; // Remplace <db_password> par ton mot de passe
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connecté à MongoDB");
    } catch (err) {
        console.error(err);
    }
}

module.exports = { client, connectDB };
