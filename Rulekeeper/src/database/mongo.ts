import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Bot connected to mongodb");
  } catch (err: any) {
    console.error(`Connection failed : ${err.message}`);
  }
};
