const express = require("express");
const CreatePath = require("./helpers/create-path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");

const app = express();

app.set("view engine", "ejs")

const PORT = 3000;
const db = "mongodb+srv://roman:791YKRRd@atlascluster.ukhzxzu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) =>{
	if(error) {
		console.log(`Error listening port: ${error}`);
	} else {
		console.log(`Listening port ${PORT}`);
	}
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("./lessons/lesson12/styles"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(postRoutes);
app.use(contactRoutes);

app.get("/", (req, response) => {
	const title = "Home";
	response.render(CreatePath("index"), { title });
})

app.get("/about", (req, response) => {
	response.redirect(CreatePath("contacts"));
})

app.use((req, res) => {
	const title = "Error page";
	res
	  .status(404)
	  .render(CreatePath("error"), { title });
});
