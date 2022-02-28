const pool = require('../db.js');

const GetReviewByCarpark = async (req, res) => {
    try{
        const carpark_id = req.body.carpark_id;
        
        const queryReviews = await pool.query("SELECT * FROM Review WHERE carpark_id=($1)", [carpark_id]);
        
        const reviews = queryReviews.rows;
        
        const responseData = [];
        for(var i=0; i< reviews.length; i++){
            const user_id = reviews[i].user_id;
            const queryUser = await pool.query("SELECT username FROM Account WHERE user_id=($1)", [user_id]);
            const username = queryUser.rows[0].username;
            responseData.push({
                username : username,
                carpark_id : carpark_id,
                comment : reviews[i].comment,
                rating : reviews[i].rating
            })
        }
        return res.status(200).json({
            message: "success",
            data: responseData,
            error: false,
        });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            data: [],
            error: true,
        });
    }
};

const PostReview = async (req,res)=>{
    try{
        const user = req.user;
        
        const userId = user.id;
        const carparkId = req.body.carparkId;
        const comment = req.body.comment;
        const rating = req.body.rating;

        if(!userId || !carparkId || !comment || !rating) throw Error("Missing data");

        const queryReview = await pool.query("INSERT INTO Review(user_id, carpark_id, comment, rating) VALUES($1,$2,$3,$4) RETURNING *",
                            [userId, carparkId, comment, rating]);
        
        if(!queryReview) throw Error("fail to insert to the database");

        return res.status(200).json({
            message: "success",
            data: queryReview.rows[0],
            error: false,
        });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            data: [],
            error: true,
        });
    }
}

const ReviewController = {
    GetReviewByCarpark,
    PostReview
}

module.exports = ReviewController