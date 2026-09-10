require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("./models/Game");

const initialGames = [
  { coord: "C7-01", name: "Minecraft", description: "Servidor propio, construcción libre y modo supervivencia por temporadas.", order: 1 },
  { coord: "C7-02", name: "Free Fire", description: "Squads de escuadra fija para ranked, más partidas casuales el resto del tiempo.", order: 2 },
  { coord: "C7-03", name: "Roblox", description: "Rotación de juegos según lo que el equipo proponga cada semana.", order: 3 },
  { coord: "C7-04", name: "Among Us", description: "Rondas rápidas para las noches en las que el equipo está completo.", order: 4 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const count = await Game.countDocuments();

  if (count > 0) {
    console.log(`Ya hay ${count} juegos en la base, no se vuelve a sembrar.`);
  } else {
    await Game.insertMany(initialGames);
    console.log("Juegos iniciales cargados.");
  }

  await mongoose.disconnect();
}

seed();