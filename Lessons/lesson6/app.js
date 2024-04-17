const fs = require("fs");

{
	// Read 
	const read_stream = fs.createReadStream("./lessons/lesson6/test.txt");
	// Write
	const write_strean = fs.createWriteStream("./lessons/lesson6/new-test.txt");

	read_stream.on("data", (chunk) =>{
		write_strean.write("\n---CHUNK START---\n");
		write_strean.write(chunk);
		write_strean.write("\n---CHUNK END---\n");
	});
}

{
	// Duplex
	const write_strean_pipe = fs.createWriteStream("./lessons/lesson6/new-test-pipe.txt");
	const read_stream = fs.createReadStream("./lessons/lesson6/test.txt");
	read_stream.pipe(write_strean_pipe);
}

{
	// Error handling on both read and write 

	const read_stream = fs.createReadStream("./lessons/lesson6/test.txt");
	const write_stream = fs.createWriteStream("./lessons/lesson6/new-test-2.txt");

	const handleError = () => {
		console.log("Error");
		read_stream.destroy();
		write_stream.end("Finished with error...");
	}

	read_stream
		.on("error", handleError)
		.pipe(write_stream)
		.on("error", handleError);
}


// Transform
{
	const zlib = require("zlib");

	const read_stream = fs.createReadStream("./lessons/lesson6/test.txt");
	const write_stream = fs.createWriteStream("./lessons/lesson6/new-test-zip.txt");
	const compress_stream = zlib.createGzip();

	const handleError = (error) => {
		console.log("Error", error);
		read_stream.destroy();
		write_stream.end("Finished with error...");
	}

	read_stream
		.on("error", handleError)
		.pipe(compress_stream)
		.pipe(write_stream)
		.on("error", handleError);
}