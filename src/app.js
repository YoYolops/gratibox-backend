import express from "express";
import cors from "cors";
import routes from "./routes.js";
import path from "node:path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use( cors() )
app.use( express.json() )
app.use( routes );
app.use(express.static(path.join(__dirname, 'build')))

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

export default app;