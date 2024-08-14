// const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//     const authe = req.headers['authorization'] ;

//     if(!authe){
//         return res.status(401).json({message : "Unauthorized, JWT token is required"});
//     }
//     try{
//         const decoded = jwt.verify(authe, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch(err){
//         return res.status(403).json({message:"Unauthorized, JWT token wrong or expired"});
//     }
// }

// module.exports = ensureAuthenticated;

const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authe = req.headers["authorization"];

  if (!authe) {
    return res
      .status(401)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    const decoded = jwt.verify(authe, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = ensureAuthenticated;

