import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vijaya_clinics'
    await mongoose.connect(uri)
    console.log(`MongoDB connected: ${uri}`)
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}
