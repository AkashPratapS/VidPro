const sessionAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Access denied. Please log in." });
  }
  req.user = req.session.user;
  next();
};

module.exports = { sessionAuth };
