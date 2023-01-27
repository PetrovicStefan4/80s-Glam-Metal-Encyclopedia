// import { connect } from "http2";
import mongoose from 'mongoose'

let isConnected: mongoose.ConnectionStates

const dbConnect = async () => {
  if (isConnected || !process.env.MONGO_URI) {
    return
  }

  const db: mongoose.Mongoose = await mongoose.connect(process.env.MONGO_URI)

  isConnected = db.connections[0].readyState
}

export default dbConnect
