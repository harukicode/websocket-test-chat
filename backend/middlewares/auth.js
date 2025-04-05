function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
}

module.exports = { isAuthenticated };