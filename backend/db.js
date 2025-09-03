const mongoose = require('mongoose');

const connectToMongo = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true  
        });
        console.log("✅ Connected to MongoDB Atlas successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
};
          
        
module.exports = connectToMongo;  