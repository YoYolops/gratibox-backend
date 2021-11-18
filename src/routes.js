import { Router } from "express";
import { login, register } from "./controllers/auth.js";
import validateToken from "./middlewares/tokenValidator.js";

const routes = Router();

routes.get("/health", (req, res) => { return res.send("Healthy") })

routes.post("/register", register)
routes.post("/login", validateToken, login)

export default routes;