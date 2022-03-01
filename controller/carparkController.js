const pool = require("../db.js");

const GetAllCarpark = async (req,res)=>{
    try{
        const queryResult = await pool.query("SELECT * FROM Carpark");

        if(!queryResult) throw Error("fail to retrieve from database");

        return res.status(200).json({
            message: "success",
            data: queryResult.rows,
            error : false
        });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            data: [],
            error: true,
        });
    }
}

const GetCarpark = async(req,res)=>{
    try{
        
    } catch(error){
        return res.status(400).json({
            message: error.message,
            data: [],
            error: true,
        });
    }
    
}

const CarparkController = {
    GetAllCarpark,
    GetCarpark,
}
module.exports=CarparkController