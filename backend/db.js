const mongoose = require('mongoose');

const connectToMongo = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true  
        });
        console.log("✅ Connected to Database successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
};
          
        
module.exports = connectToMongo;  