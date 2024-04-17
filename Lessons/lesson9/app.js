const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

function CreatePath(page) {
	return path.resolve(__dirname, 'views', `${page}.html`);
}

const server = http.createServer((request, response) => {
	console.log("Server request");

	response.setHeader("Content-Type", "text/html")

	let basePath = "";

	switch (request.url) {
		case "/index.html":
		case "/home":
		case "/": 
			basePath = CreatePath("index");
			response.statusCode = 200;
			break;

		// About-us is an old page which was removed
		// Redirect to the new page: contacts.html
		case "/about":
			response.statusCode = 301;
			response.setHeader("Location", "/contacts");
			response.end();
			break;

		case "/contacts":
			basePath = CreatePath("contacts");
			response.statusCode = 200;
			break;

		default:
			basePath = CreatePath("error");
			response.statusCode = 404;
			break;
	}

	fs.readFile(basePath, (error, data) => {
		if(error) {
			console.log(`Error reading file: ${error}`);
			response.statusCode = 500;
			response.end();
			
		} else {
			response.write(data);
			response.end();
		}
	});

});

server.listen(PORT, "localhost", (error) =>{
	if(error) {
		console.log(`Error listening port: ${error}`);
	} else {
		console.log(`Listening port ${PORT}`);
	}
});