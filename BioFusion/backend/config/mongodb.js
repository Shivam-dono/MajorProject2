import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    const dbURI = process.env.MONGODB_URI; // Ensure correct database name
    console.log("🛠 Connecting to MongoDB:", dbURI);

    await mongoose.connect(dbURI,);

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

