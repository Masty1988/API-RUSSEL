const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("❌ Pas de header Authorization");
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("❌ Format incorrect du token");
    return res.status(401).json({ message: "Token non fourni correctement" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ Token invalide ou expiré :", err.message);
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }
    console.log("✅ Token validé :", user);
    req.user = user;
    next();
  });
};
