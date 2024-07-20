import mongoose from 'mongoose';

console.log('mongoDB URI in db:', process.env.MONGODB_URI);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('MongoDB connected');
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
