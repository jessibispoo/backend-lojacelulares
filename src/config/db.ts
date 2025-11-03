import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};
//import { MongoClient } from 'mongodb';
//const client = new MongoClient(process.env.MONGO_URI!)
//await client.connect()
//const db = client.db(process.env.MONGO_DB)

//export { db };//