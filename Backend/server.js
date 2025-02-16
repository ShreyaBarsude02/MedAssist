import express from "express";
import connectToMongoDB from "./database/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
// import {app, server} from './socket/socket.js'
import path from "path"
import cookieParser from "cookie-parser";

const PORT = 6000;
const __dirname = path.resolve();
const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser()); 
app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
	optionsSuccessStatus: true
  }));
app.use(express.static('public'));
app.use(express.json({ limit: "100mb" }));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/prediction", predictionRoutes);

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port localhost http://localhost:${PORT}`);
});
