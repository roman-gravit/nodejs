const http = require("http");


const PORT = 3000;

const server = http.createServer((request, response) => {
	console.log("Server request");
	console.log(request.url ,request.method);

	// Text
	//response.setHeader("Content-Type", "text/plain");
	//response.write("Hello world");

	// html
	//response.setHeader("Content-Type", "text/html");

	//response.write("<head><link rel='stylesheet' href='#'></head>");
	//response.write("<h1>Hello world</h1>");
	//response.write("<p>My name is John Doe</p>");

	// Data/json
	response.setHeader("Content-Type", "application/json");
	const data = JSON.stringify([
		{ name: "Mike", age: 35 },
		{ name: "John", age: 45 }
	]);


	response.end(data);
});

server.listen(PORT, "localhost", (error) => {
	if(error) {
		console.log(`Error: ${error}`);

	} else {
		console.log(`listening port ${PORT}`);
	}
})