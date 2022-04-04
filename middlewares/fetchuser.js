const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) {
      return res.status(400).json({ error: "please authenticate the user" });
    }
  try {
      const data = jwt.verify(token, secret);
      req.user = data.user;  
      next()
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
      
  }

};
module.exports=fetchuser