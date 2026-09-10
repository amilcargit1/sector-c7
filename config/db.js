const mongoose = require("mongoose");

// Ya no detiene el servidor si falla o si falta la URI.
// Solo avisa en los logs y deja que el resto del sitio siga funcionando.
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "MONGODB_URI no está configurada. El sitio va a correr sin base de datos " +
      "(juegos fijos, sin registro/login) hasta que la conectes."
    );
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("Conectado a MongoDB");
    return true;
  } catch (err) {
    console.warn(
      "No se pudo conectar a MongoDB, el sitio sigue funcionando sin base de datos:",
      err.message
    );
    return false;
  }
}

function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDBConnected };