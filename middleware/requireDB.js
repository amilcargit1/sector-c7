const { isDBConnected } = require("../config/db");

function requireDB(req, res, next) {
  if (!isDBConnected()) {
    return res.status(503).json({
      error: "La base de datos todavía no está conectada. Esta función no está disponible por ahora.",
    });
  }
  next();
}

module.exports = requireDB;