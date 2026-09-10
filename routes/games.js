const express = require("express");
const Game = require("../models/Game");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await Game.find().sort({ order: 1 });
  res.json(games);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { coord, name, description, order } = req.body;
  if (!coord || !name) {
    return res.status(400).json({ error: "Faltan coord o name" });
  }
  const game = await Game.create({ coord, name, description, order });
  res.status(201).json(game);
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!game) return res.status(404).json({ error: "No encontrado" });
  res.json(game);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;