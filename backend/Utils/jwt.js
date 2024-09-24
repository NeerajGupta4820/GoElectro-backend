import jwt from 'jsonwebtoken';  

const generateToken = (userId) => {
 
  const payload = { id: userId };

 
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn:'30d',  
  });

  return token;
};

export default generateToken;
