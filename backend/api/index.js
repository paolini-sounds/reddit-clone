import '../src/config/envConfig.js';
import app from '../src/app.js';
import connectDB from '../src/config/db.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});
