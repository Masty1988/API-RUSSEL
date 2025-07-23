const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const catwayCtrl = require("../controllers/catway.controller");

// ✅ GET /catways
router.get("/", catwayCtrl.getAll);

// ✅ GET /catways/:id
router.get("/:id", catwayCtrl.getOne);

// ✅ POST /catways
router.post("/", verifyToken, catwayCtrl.create);

// ✅ PUT /catways/:id
router.put("/:id", verifyToken, catwayCtrl.updateState);

// ✅ DELETE /catways/:id
router.delete("/:id", verifyToken, catwayCtrl.remove);

module.exports = router;
