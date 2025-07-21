const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams = récupère le :id du parent
const Reservation = require("../models/reservations");

// ✅ GET /catways/:id/reservations
router.get("/", async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.status(200).json(reservations);
});

// ✅ GET /catways/:id/reservations/:idReservation
router.get("/:idReservation", async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  if (!reservation)
    return res.status(404).json({ message: "Réservation introuvable" });
  res.status(200).json(reservation);
});

// ✅ POST /catways/:id/reservations
router.post("/", async (req, res) => {
  const newResa = new Reservation({
    catwayNumber: req.params.id,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  await newResa.save();
  res.status(201).json({ message: "Réservation créée", newResa });
});

// ✅ PUT /catways/:id/reservations
router.put("/:idReservation", verifyToken, async (req, res) => {
  const update = {
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  const updated = await Reservation.findByIdAndUpdate(
    req.params.idReservation,
    update,
    { new: true }
  );
  res.status(200).json({ message: "Réservation modifiée", updated });
});

// ✅ DELETE /catways/:id/reservations/:idReservation
router.delete("/:idReservation", verifyToken, async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.idReservation);
  res.status(200).json({ message: "Réservation supprimée" });
});

module.exports = router;
