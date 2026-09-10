const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
};

function signToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || password.length < 6) {
    return res.status(400).json({
      error: "Usuario requerido y contraseña de al menos 6 caracteres",
    });
  }

  const exists = await User.findOne({ username: username.toLowerCase() });
  if (exists) {
    return res.status(409).json({ error: "Ese usuario ya existe" });
  }

  const isFirstUser = (await User.countDocuments()) === 0;

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    username,
    passwordHash,
    role: isFirstUser ? "admin" : "member",
  });

  const token = signToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(201).json({ username: user.username, role: user.role });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: (username || "").toLowerCase() });

  if (!user || !(await user.checkPassword(password || ""))) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }

  const token = signToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ username: user.username, role: user.role });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});

module.exports = router;