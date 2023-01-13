const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status().json({ message: "you are not unauthenticated" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status().json({ message: "you are not unauthenticated" });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secret_key"
    );

    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return res.status().json({ message: "you are not unauthenticated" });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
