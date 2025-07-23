const Reservation = require("../models/reservations");

exports.getAll = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.status(200).json(reservations);
};

exports.getOne = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  if (!reservation)
    return res.status(404).json({ message: "Réservation introuvable" });
  res.status(200).json(reservation);
};

exports.create = async (req, res) => {
  const newResa = new Reservation({
    catwayNumber: req.params.id,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  await newResa.save();
  res.status(201).json({ message: "Réservation créée", newResa });
};

exports.update = async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(
    req.params.idReservation,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Réservation modifiée", updated });
};

exports.remove = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.idReservation);
  res.status(200).json({ message: "Réservation supprimée" });
};
