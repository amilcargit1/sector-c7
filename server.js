const express = require("express");
const path = require("path");

const app = express();

// Render inyecta el puerto por variable de entorno; en local usamos 3000
const PORT = process.env.PORT || 3000;

// Sirve todo lo que esté en /public como sitio estático
app.use(express.static(path.join(__dirname, "public")));

// Ruta de salud, útil para verificar que el deploy en Render funciona
app.get("/health", (req, res) => {
  res.json({ status: "ok", team: "Sector C7" });
});

app.listen(PORT, () => {
  console.log(`Sector C7 corriendo en el puerto ${PORT}`);
});
