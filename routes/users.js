const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email déjà utilisé" });
    } else {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// 🔍 GET /users/:email → Récupérer les détails d’un utilisateur
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ✏️ PUT /users/:email → Modifier un utilisateur
router.put("/:email", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur modifié", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ❌ DELETE /users/:email → Supprimer un utilisateur
router.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      email: req.params.email,
    });
    if (!deletedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res
      .status(200)
      .json({ message: "Utilisateur supprimé", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
