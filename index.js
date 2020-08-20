import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import authRoutes from './routes/auth';
import queryRoutes from './routes/queries';
import queryArticles from './routes/articles';

const app = express();
const port = process.env.PORT || 5000;
const { name, dbPort, host } = config[process.env.NODE_ENV];
const db = `mongodb://${host}:${dbPort}/${name}`;

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
app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/articles', queryArticles);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'ok',
    msg: 'Welcome to KIGC | BLOG',
  });
});

app.listen(port, () => console.log(`Server started on port:${port}`));

export default app;
