const mongoose = require('mongoose');
// const uri = "mongodb://localhost:27017/inotebook?readPreference=primary&tls=false&directConnection=true"
// const mongoURI = "mongodb://localhost:27017";
const uri = `mongodb+srv://balupal9891:21668017balupal@cluster0.9bo0wz4.mongodb.net/${process.env.DB_NAME}`


const connectToMongo = async () =>{
    let connected = await mongoose.connect(uri)
    if(connected){
        console.log("Mongoose connected !!!")
    }
    else{
        console.log("Failed to connected with mongodb")
    }
}

module.exports = connectToMongo