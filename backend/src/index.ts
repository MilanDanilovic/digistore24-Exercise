import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", messageRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
