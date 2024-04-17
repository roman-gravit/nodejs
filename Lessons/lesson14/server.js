const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();

// Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 
//  view engine: The default engine extension to use when omitted.
//  view cache | views | trust proxy | subdomain offset | strict routing | query parser | json spaces | json replacer | json escape | etag | env
app.set("view engine", "ejs")

const PORT = 3000;
const db = "mongodb+srv://roman:791YKRRd11@atlascluster.ukhzxzu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

const CreatePath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);


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

// add middleware for logging
// NOTE: Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
//app.use((req, res, next) => {
//	console.log(`path: ${req.path}`);
//	console.log(`method: ${req.method}`);
//	next();
//});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static("./lessons/lesson12/styles"));

// express.urlencoded([options])
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. 
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.urlencoded({ extended: false }));


// Renders a view and sends the rendered HTML string to the client. Optional parameters:
// 
// - locals, an object whose properties define local variables for the view.
// - callback, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform 
//   an automated response. When an error occurs, the method invokes next(err) internally.
// The view argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the views setting. 
// If the path does not contain a file extension, then the view engine setting determines the file extension. If the path does contain a file extension,
// then Express will load the module for the specified template engine (via require()) and render it using the loaded module’s __express function.
app.get("/", (req, response) => {
	const title = "Home";
	response.render(CreatePath("index"), { title });
})

app.get("/contacts", (req, response) => {
	const title = "Contacts";
	const contacts = [
		{ name: 'Mike' },
		{ name: 'John' },
		{ name: 'Anna' },
	  ];
	response.render(CreatePath("contacts"), { title, contacts });
})

app.get("/posts/:id", (req, response) => {
	const title = "Post";
	const post = {
		id: '1', 
		text: 'Hello: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
		title: 'Post title new',
		date: '16.04.2024',
		author: 'Mike',
	};
	response.render(CreatePath("post"), { title, post } );
})

app.get("/posts", (req, response) => {
	const title = "Posts";
	const posts = [{
		id: '1', 
		text: 'Hello: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
		title: 'Post title new',
		date: '16.04.2024',
		author: 'Mike',
	}];
	response.render(CreatePath("posts"), { title, posts });
})

app.post("/add-post", (req, res) => {
	const { title, author, text } = req.body;
	const post = new Post({ title, author, text});
	post
		.save()
		.then((result) => res.send(result))
		.catch((error) => {
			console.log(`add-post: error: ${error}`);
			res.render(CreatePath("error"), { title: "Error" });
		})
	
	/*const post = {
		id: new Date(), 
		text: text,
		title: title,
		date: (new Date()).toLocaleDateString(),
		author: author
	};
	res.render(CreatePath("post"), { title, post } );*/
})

app.get("/add-post", (req, response) => {
	const title = "Add Post";
	response.render(CreatePath("add-post"), { title } );
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
