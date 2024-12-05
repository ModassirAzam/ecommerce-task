import db from "../config/db.js"

export const getAllProducts = async(req,res) =>{
    try{
        db.query("SELECT *from products",(err,result)=>{
            if(err){
                res.json({
                    status:false,
                    message:"something went wrong while fetching data"
                })
            }else{
                res.status(200).json({status:true,result})
            }
        })
    }catch(error){
        res.json({status:false,message:error.message})
    }
}

export const getProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        db.query("SELECT *from products where productID = ? ",id,(err,result)=>{
            if(err){
                res.json({status:false,message:"something went wrong"})
            }else{
                res.status(200).json({status:true,result})
            }
        });
    }catch(error){
        res.jgon({status:false,message:error.message})
    }
}