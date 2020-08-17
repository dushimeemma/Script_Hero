import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;
const db = config[process.env.NODE_ENV].mongoURI;

const connectDB = async () => {
  const con = await mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log('MongoDB connected successfully');
  return con;
};
//db connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'ok',
    msg: 'Welcome to KIGC | BLOG',
  });
});

app.listen(port, () => console.log(`Server started on port:${port}`));

export default app;
