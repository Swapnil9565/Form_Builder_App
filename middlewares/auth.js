const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authUSer = (req, res, next) => {
  const token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ message: 'This action is not allowed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

};
module.exports = authUSer;
