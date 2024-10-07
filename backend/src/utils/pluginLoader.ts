import { EventEmitter } from "events";
import fs from "fs";
import path from "path";

export const eventBus = new EventEmitter();

//This loader will load all the plugins from the plugins folder
export const loadPlugins = (pluginsPath: string) => {
  console.log("Loading plugins...");

  const pluginFiles = fs.readdirSync(pluginsPath);

  pluginFiles.forEach((file) => {
    const pluginPath = path.join(pluginsPath, file);
    const plugin = require(pluginPath);
    if (plugin && plugin.init) {
      plugin.init();
      console.log(`Plugin ${file} loaded successfully.`);
    }
  });
};
