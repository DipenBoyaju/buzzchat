import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    // if you are using only one DB then use (mongoose.connection.on)
    // if you are using multiple DB then use (conn.connection.on)
    console.log(`Mongo Connection: ${conn.connection.host}`);

    mongoose.connection.on('error', (error) => {
      console.log('Something is wrong in mongodb', error);
    })
  } catch (error) {
    console.log("Error connection to MongoDB", error.message);
    process.exit(1)
  }
}