const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// accueil
router.get("/", (req, res) => {
  res.render("index");
});

// // tableau de bord (protégé)
// router.get("/dashboard", verifyToken, async (req, res) => {
//   const reservations = await reservations.find();
//   res.render("dashboard", {
//     user: req.user,
//     date: new Date().toLocaleDateString(),
//     reservations,
//   });
// });
router.get("/dashboard-test", async (req, res) => {
  const user = { username: "jeanne", email: "jmlp@example.fr" };
  const reservations = await reservations.find();
  res.render("dashboard", {
    user: req.user,
    date: new Date().toLocaleDateString(),
    reservations,
  });
});

module.exports = router;
