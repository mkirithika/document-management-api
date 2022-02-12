import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect("mongodb://localhost/dms");
    console.log("DB Connected");
  } catch {
    console.log("Error in connecting DB");
  }
};
