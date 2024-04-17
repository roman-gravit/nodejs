const fs = require("fs");

console.log("start");

// buffer as bytes
fs.readFile("./test.txt", (error, data) => {
	console.log(data);
});

// buffer as string
fs.readFile("./test.txt", (error, data) => {
	console.log(data.toString());
});

// utf-8
fs.readFile("./test.txt", "utf-8", (error, data) => {
	console.log(data);
});

// write file
fs.readFile("./test.txt", "utf-8", (error, data) => {
	fs.writeFile("./test2.txt", `${data} new text`, () =>{
		//
	});
});

// write file to inner folder: error:ENOENT: no such file or directory 
fs.readFile("./test.txt", "utf-8", (error, data) => {
	fs.writeFile("./files/test2.txt", `${data} new text`, (error) =>{
		console.log(error);
	});
});

// read file, create folder, write file
fs.readFile("./test.txt", "utf-8", (error, data) => {
	fs.mkdir("./files", ()=>{
		fs.writeFile("./files/test2.txt", `${data} new text`, (error) => {
			if(error) {
				console.log(error);
			}
		});
	});
});

// SYNC read file, create folder, write file
fs.readFile("./test.txt", "utf-8", (error, data) => {
	
	fs.mkdirSync("./files1", ()=>{});

	fs.writeFileSync("./files1/test2.txt", `${data} new text`, (error) => {});
});


// cleanup dir and files
setTimeout(() => {
	
	// files
	if(fs.existsSync("./test2.txt")) {
		fs.unlinkSync("./test2.txt");
	}

	if(fs.existsSync("./files1/test2.txt")) {
		fs.unlinkSync("./files1/test2.txt");
	}

	if(fs.existsSync("./files/test2.txt")) {
		fs.unlinkSync("./files/test2.txt");
	}

	// folders
	if(fs.existsSync("./files1")) {
		fs.rmdirSync("./files1");
	}

	if(fs.existsSync("./files")) {
		fs.rmdirSync("./files");
	}

}, 3000);


console.log("end");