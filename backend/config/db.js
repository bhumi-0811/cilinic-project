import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'MONGO_URI=mongodb+srv://bhumikathakre100_clinicuser:bhumi1108@cluster0.efx1bfu.mongodb.net/vijaya_clinics?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(uri)
    console.log(`MongoDB connected: ${uri}`)
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}
