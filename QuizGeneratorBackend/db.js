const mongoose = require('mongoose')


const ConnectToMongodb= async (req, res)=>{
    try {
        
       await mongoose.connect('mongodb://localhost:27017/question')
        console.log("connected to mongoDb")
    } catch (error) {
        console.log("error connecting to mongoDb")
    }
}

module.exports = ConnectToMongodb