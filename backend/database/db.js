const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const Db = process.env.MONGO_URL;

    try {
        await mongoose.connect(Db);
        console.log(" MongoDB connected");
    } catch (error) {
        console.log(" MongoDB not Connected:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
