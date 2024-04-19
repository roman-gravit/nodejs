const UserRouter = require("./src/user-router");
const Application = require("./framework/application");
const JsonParser = require("./framework/parse-json");
const UrlParser = require("./framework/parse-url");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
const connect_url = process.env.MONGO2_URL || "";

const app = new Application();

// middlewares
app.Use(JsonParser);
app.Use(UrlParser("http://localhost:5000"));

app.AddRouter(UserRouter);

const start = async() => {
	try {

		await mongoose.connect(connect_url);
		console.log("db connected....");
		app.ListenPort(PORT, () => {console.log(`Listening to port: ${PORT}`);});

	} catch(e) {
		console.log(e);
	}
}

start();