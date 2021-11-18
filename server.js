import "./src/setup.js";
import app from "./src/app.js";


/* dotenv.config(); */


app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});