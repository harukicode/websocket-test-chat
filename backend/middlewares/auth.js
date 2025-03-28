function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Authorization is required" });
  }
}

module.exports = { isAuthenticated };
