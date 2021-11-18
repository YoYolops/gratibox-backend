import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "dev" ? ".env" : ".env.test";
console.log("env: ", envFile)

dotenv.config({
	path: envFile,
});