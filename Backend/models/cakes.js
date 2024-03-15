const mongoose = require('mongoose')

const CakesSchema = new mongoose.Schema({
    Popularity : String,
    Cakes_name : String,
})

const cakemodel = mongoose.model("popularity",CakesSchema)
module.exports = cakemodel


