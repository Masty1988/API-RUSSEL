const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "Accès refusé. Token manquant." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attache les infos décryptées à la requête
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide ou expiré." });
  }
};
