import { Router } from "express";
import { login, register } from "./controllers/auth.js";
import { signature, getSignatures } from "./controllers/plans.js";
import validateToken from "./middlewares/tokenValidator.js";

const routes = Router();

routes.get("/health", (req, res) => { return res.send("Healthy") })
routes.get("/signature", validateToken, getSignatures)

routes.post("/register", register)
routes.post("/login", login)
routes.post("/signature", validateToken, signature)

export default routes;