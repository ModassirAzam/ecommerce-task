import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const test = async (req,res)=>{
  res.json({status:true,message:"success"});
}

export const signup = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
      if (err) {
        return next(err);
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "User already present with this email" });
      }

      db.query(
        "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword],
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.status(201).json({ message: "User created successfully!" });
        }
      );
    });
  } catch (error) {
    next(error);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  db.query("SELECT * from user where email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcryptjs.compare(password,result[0].password,(error,response)=> {
        if(response){
          const id = result[0].id;
          const token = jwt.sign({id,email}, "mysecret",{
            expiresIn: 100000,
          });
          res.json({auth: true, token:token, result:result});

        }else{
          res.json({auth: false,message:"Wrong credentials"});
        }
      })
    } else {
      res.json({auth: false,message:"No user exists!"});
    }
  });
};


  export const getOrders = async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "mysecret");  
      const email = decoded.email;
      
      if (!email) {
        return res.status(403).json({ message: "Forbidden: Invalid token payload" });
      }
        db.query(
        `SELECT p.productName,p.productDescription,p.productPrice
         FROM user u
         JOIN Orders o ON o.userId = u.userId
         JOIN OrderItems oi ON oi.OrderId = o.OrderId
         JOIN Products p ON oi.ProductId = p.ProductId
         WHERE u.email = ?`,
        [email],
        (err,result)=>{
          if(err){
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
          }          
          return res.status(200).json({ result:result });
        }
      );

    } catch (error) {
      console.error("Error:", error.message);
      return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
  };
  


