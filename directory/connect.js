import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://kirithika:kirithika@cluster0.yjfka.mongodb.net/dms?retryWrites=true&w=majority"
    );
    console.log("DB Connected");
  } catch {
    console.log("Error in connecting DB");
  }
};
