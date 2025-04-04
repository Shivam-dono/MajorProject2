import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import connectCloudinary  from './config/cloudnary.js';
import userRouter from './routes/usersRoute.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5174");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });
// app.post("/api/admin/login", (req, res) => {
//   console.log(req.body); // Debug request body
//   res.json({ message: "Login route is working!" });
// });

app.use(express.json()); 

connectCloudinary();

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use("/api/user", userRouter);
// Basic route
app.get('/', (req, res) => {
  res.send('Server is running 😎');
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with failure code
  }
};

startServer();