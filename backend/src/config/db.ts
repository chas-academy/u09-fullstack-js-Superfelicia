import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : process.env.NODE_ENV === "test" 
  ? ".env.test" : ".env.development";
  dotenv.config({ path: envFile });

  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error('MONGO_URI not defined');
    }
    await mongoose.connect(dbUri as string);
    console.log(`MongoDB connected in ${process.env.NODE_ENV} mode`);
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    } else {
      throw new Error("MongoDB connection failed in test environment");
    }
  }
};

export default connectDB;
