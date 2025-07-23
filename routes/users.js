const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const userCtrl = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", userCtrl.getAll);

router.post("/", userCtrl.create);

router.post("/login", userCtrl.login);

// 🔍 GET /users/:email → Récupérer les détails d’un utilisateur
router.get("/:email", verifyToken, userCtrl.getOne);

// ✏️ PUT /users/:email → Modifier un utilisateur
router.put("/:email", verifyToken, userCtrl.update);

// ❌ DELETE /users/:email → Supprimer un utilisateur
router.delete("/:email", verifyToken, userCtrl.remove);

module.exports = router;
