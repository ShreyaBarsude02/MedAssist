import express from 'express';
import authRoutes from "./routes/authRoutes.js"
import connectToMongoDB from "./database/db.js"
import cors from "cors";
// import {app, server} from './socket/socket.js'
const PORT = 5000;

const app = express()  

app.use(express.json({ limit: '100mb' }));
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true, 
  })); 
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}))
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port localhost http://localhost:${PORT}`);
});