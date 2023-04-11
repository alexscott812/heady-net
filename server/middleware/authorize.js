const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
};

module.exports = authorize;
