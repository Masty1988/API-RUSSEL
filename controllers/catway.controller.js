const Catway = require("../models/Catway");

exports.getAll = async (req, res) => {
  const catways = await Catway.find();
  res.status(200).json(catways);
};

exports.getOne = async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway introuvable" });
  res.status(200).json(catway);
};

exports.create = async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json({ message: "Catway créé", newCatway });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.updateState = async (req, res) => {
  const updated = await Catway.findByIdAndUpdate(
    req.params.id,
    { catwayState: req.body.catwayState },
    { new: true }
  );
  res.status(200).json({ message: "État mis à jour", updated });
};

exports.remove = async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Catway supprimé" });
};
