"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const pluginLoader_1 = require("./utils/pluginLoader");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Loading a Chatbot plugins, which will be used to send a message to the user
// The plugins are located in the plugins folder
// The plugin should have an init function which will be called when the plugin is loaded
const pluginsPath = path_1.default.join(__dirname, "plugins");
(0, pluginLoader_1.loadPlugins)(pluginsPath);
// Routes
app.use("/api", authRoutes_1.default);
app.use("/api", messageRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
