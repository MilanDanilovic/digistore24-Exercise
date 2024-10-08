import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import { loadPlugins } from "./utils/pluginLoader";
import path from "path";
const cors = require("cors");

dotenv.config();

const app = express();

var whitelist = ["http://localhost:4200"];
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Loading a Chatbot plugins, which will be used to send a message to the user
// The plugins are located in the plugins folder
// The plugin should have an init function which will be called when the plugin is loaded
const pluginsPath = path.join(__dirname, "plugins");
loadPlugins(pluginsPath);

// Routes
app.use("", authRoutes);
app.use("", messageRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
