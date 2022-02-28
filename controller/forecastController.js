const axios = require('axios');

const GetForecast = async (req,res)=>{
    try{
        var today = new Date();
        if(!today) throw Error("fail to retrive date");
        var date = today.getFullYear() + '-';
    
        if(today.getMonth() + 1 < 10) date += '0' + (today.getMonth()+1) + '-';
        else date += (today.getMonth()+1) + '-';
    
        if(today.getDate() < 10) date += '0' + (today.getDate()); 
        else date += (today.getDate());
    
        var time = '';
        if(today.getHours() < 10) time += '0' + today.getHours() +':';
        else time += today.getHours() + ':';
    
        if(today.getMinutes() < 10) time += '0' + today.getMinutes() +':';
        else time += today.getMinutes() + ':';
    
        if(today.getSeconds() < 10) time += '0' + today.getSeconds(); 
        else time += today.getSeconds();
    
        const now = date + 'T' + time;
        
        const api_url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";

        const result = await axios.get(api_url, {
            params: {
                date_time : now
            }
        });

        if(!result) throw Error("Fail to fetch the api");
    
        return res.status(200).json({
            message: "success",
            data: result.data.items[0].forecasts,
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

const ForecastController = {
    GetForecast
}

module.exports = ForecastController