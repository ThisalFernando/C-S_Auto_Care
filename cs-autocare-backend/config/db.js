const mongoose = require('mongoose');
const colors = require('colors');

const connnectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`✅ MongoDB Connected: ${con.connection.host}`.cyan.underline)
    }catch(error){
        console.error(`❌ Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connnectDB;