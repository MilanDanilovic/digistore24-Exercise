"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugins = exports.eventBus = void 0;
const events_1 = require("events");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.eventBus = new events_1.EventEmitter();
//This loader will load all the plugins from the plugins folder
const loadPlugins = (pluginsPath) => {
    console.log("Loading plugins...");
    const pluginFiles = fs_1.default.readdirSync(pluginsPath);
    pluginFiles.forEach((file) => {
        const pluginPath = path_1.default.join(pluginsPath, file);
        const plugin = require(pluginPath);
        if (plugin && plugin.init) {
            plugin.init();
            console.log(`Plugin ${file} loaded successfully.`);
        }
    });
};
exports.loadPlugins = loadPlugins;
