import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_DB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local",
  );
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGODB_URL, {
    bufferCommands: false,
  });

  return mongoose.connection;
}

export default connectToDatabase;
