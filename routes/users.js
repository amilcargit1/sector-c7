const express = require("express");
const User = require("../models/User");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const requireDB = require("../middleware/requireDB");

const router = express.Router();
router.use(requireDB);

router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find().select("username role createdAt").sort({ createdAt: 1 });
  res.json(users);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["member", "admin"].includes(role)) {
    return res.status(400).json({ error: "Rol inválido" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select(
    "username role"
  );
  if (!user) return res.status(404).json({ error: "No encontrado" });
  res.json(user);
});

module.exports = router;