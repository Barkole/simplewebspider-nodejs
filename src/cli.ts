import { config } from "./config.js";

const message = `Hello World ${config.username}:\ntimestamp: ${config.build.timestamp}`;
console.log(message);
