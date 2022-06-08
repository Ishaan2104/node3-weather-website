const request = require('request')

const geocode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=d0df85beb5bf44c0e1aba96a7e6351ad&query='+address+'&limit=1'
    
    request({url, json:true} , (error,{body}) => {
        if(error){
            callback('Unable to connect to web services',undefined)
        }else if(body.data.length===0){
            callback('Unable to find loaction',undefined)
        }else{
            callback(undefined, {
                lat : body.data[0].latitude,
                longi : body.data[0].longitude,
                label : body.data[0].label
            })
        }
    })
}

module.exports = geocode