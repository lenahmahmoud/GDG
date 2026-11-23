import mongoose from "mongoose";

export default async function dbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://lenahmahmoud08_db_user:RHVvOQJhnQDYI5ue@cluster0.ttctaf7.mongodb.net/?compressors=zlib",
    );

    console.log("connected ");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
