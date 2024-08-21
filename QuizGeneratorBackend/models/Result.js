const mongoose = require('mongoose')
const {Schema} = mongoose

const resultSchema = new Schema({
    selectedOptions:{
        type:Map,
        of: String
    },
    topic:{
        type:String,
        required: true
    },
    submitted: {
        type: Date,
        default: Date.now 
    }
})

const Results = mongoose.model("Results", resultSchema)

module.exports = Results