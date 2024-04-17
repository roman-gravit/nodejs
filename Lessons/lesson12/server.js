const express = require("express");
const path = require("path");

const app = express();

// Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 
//  view engine: The default engine extension to use when omitted.
//  view cache | views | trust proxy | subdomain offset | strict routing | query parser | json spaces | json replacer | json escape | etag | env
app.set("view engine", "ejs")

const PORT = 3000;
const CreatePath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) =>{
	if(error) {
		console.log(`Error listening port: ${error}`);
	} else {
		console.log(`Listening port ${PORT}`);
	}
});


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
	response.render(CreatePath("post"), { title } );
})

app.get("/posts", (req, response) => {
	const title = "Posts";
	response.render(CreatePath("posts"), { title });
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
