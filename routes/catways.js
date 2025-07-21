const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

// ✅ GET /catways
router.get("/", async (req, res) => {
  const catways = await Catway.find();
  res.status(200).json(catways);
});

// ✅ GET /catways/:id
router.get("/:id", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway introuvable" });
  res.status(200).json(catway);
});

// ✅ POST /catways
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json({ message: "Catway créé", newCatway });
  } catch (err) {
    console.error("err POST /catways:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ✅ PUT /catways/:id
router.put("/:id", verifyToken, async (req, res) => {
  const update = { catwayState: req.body.catwayState }; // seul l'état est modifiable
  const updated = await Catway.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.status(200).json({ message: "État mis à jour", updated });
});

// ✅ DELETE /catways/:id
router.delete("/:id", verifyToken, async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Catway supprimé" });
});

module.exports = router;
