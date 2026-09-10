const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "Falta MONGODB_URI en las variables de entorno. " +
      "En local: crea un archivo .env (mira .env.example). " +
      "En Render: agrégala en Settings → Environment."
    );
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Conectado a MongoDB");
}

module.exports = connectDB;