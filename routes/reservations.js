const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams = récupère le :id du parent

const verifyToken = require("../middlewares/verifyToken");
const resaCtrl = require("../controllers/reservations.controller");

// ✅ GET /catways/:id/reservations
router.get("/", resaCtrl.getAll);

// ✅ GET /catways/:id/reservations/:idReservation
router.get("/:idReservation", resaCtrl.getOne);

// ✅ POST /catways/:id/reservations
router.post("/", resaCtrl.create);

// ✅ PUT /catways/:id/reservations
router.put("/:idReservation", verifyToken, resaCtrl.update);

// ✅ DELETE /catways/:id/reservations/:idReservation
router.delete("/:idReservation", verifyToken, resaCtrl.remove);

module.exports = router;
