import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './router/auth.route.js'
import UserRoutes from './router/user.route.js'
import { server, app } from './socket/index.js';
import { connectDB } from './config/ConnectDB.js';

dotenv.config();
const PORT = process.env.PORT || 8000;


// const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('<h1>Welcom to my server</h1>')
})

app.use('/api', AuthRoutes)
app.use('/api', UserRoutes)

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is live at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB. Server not started.', error);
    process.exit(1);
  });

app.use('/', (req, res) => {
  res.send('<h1>welcom to server</h1>')
})
