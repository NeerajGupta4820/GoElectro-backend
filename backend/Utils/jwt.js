import jwt from 'jsonwebtoken';  

const generateToken = (userId,type) => {
 
  const payload = { id: userId, type:type };

 
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn:'30d',  
  });

  return token;
};

const checkAdmin = (req,res,next)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.type === "user") {
            return res.status(403).json({ success: false, message: "Access denied, admin privileges required" });
        }

        req.user = decoded;
        next();
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server Error"});
  }
}

export {generateToken,checkAdmin};
