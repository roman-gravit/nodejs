const express = require("express");
const path = require("path");


//The app object has methods for
//
// - Routing HTTP requests; see for example, app.METHOD and app.param.
// - Configuring middleware; see app.route.
// - Rendering HTML views; see app.render.
// - Registering a template engine; see app.engine.
const app = express();

const PORT = 3000;
const CreatePath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

// app.listen([port[, host[, backlog]]][, callback])
// Binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().
//
// If port is omitted or is 0, the operating system will assign an arbitrary unused port, 
// which is useful for cases like automated tasks (tests, etc.).
app.listen(PORT, (error) =>{
	if(error) {
		console.log(`Error listening port: ${error}`);
	} else {
		console.log(`Listening port ${PORT}`);
	}
});


// app.get(path, callback [, callback ...])
// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get("/", (req, response) => {

	// text
	// response.send("Hello World");

	// html
	// response.send("<h1>Hello World</h1>");

	// file
	response.sendFile(CreatePath("index"));
})

app.get("/contacts", (req, response) => {
	response.sendFile(CreatePath("contacts"));
})

// Redirect
app.get("/about", (req, response) => {
	response.redirect(CreatePath("contacts"));
})


// app.use([path,] callback [, callback...])
// Mounts the specified middleware function or functions at the specified path: the middleware function 
// is executed when the base of the requested path matches path.
//
// Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
// For example, this middleware function will be executed for every request to the app:

// NOTE: Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
app.use((req, res) => {
	res
	  .status(404)
	  .sendFile(CreatePath("error"));
});


// Error-handling middleware
//
// Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. 
// Even if you don’t need to use the next object, you must specify it to maintain the signature. 
// Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors. 
// For details about error-handling middleware, see: Error handling.
// 
// Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, 
// specifically with the signature (err, req, res, next)):