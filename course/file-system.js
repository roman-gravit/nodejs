const fs = require("fs");
const path = require("path");

{
	// recursively create inner folders
	fs.mkdirSync(path.resolve(__dirname, "dir", "dir1"), { recursive: true});
	fs.rmSync(path.resolve(__dirname, "dir"), {recursive: true});
}

{
	// recursively create inner folders
	/*console.log("start");
	fs.mkdir(path.resolve(__dirname, "dir", "dir1"), (err) => {
		if(err){
			console.log(err);
		}
		console.log("created");
	});
	console.log("start");
	*/
}

{
	// fs.writeFile
	// fs.appendFile
}

// fs.promises
{
	const writeFileAsync = async(num, path, data) => {
		console.log("writeFileAsync->", num);
		return new Promise((resolve, reject) => {
			console.log("writeFileAsync:Promise ->", num);
			fs.writeFile(path, data, (err) => {
				console.log("writeFileAsync:Promise:writeFile ->", num);
				if(err) {
					return reject(err.message);
				}
				return resolve();
			})
		})
	}

	const AppendFileAsync = async(num, path, data) => {
		console.log("AppendFileAsync sync->", num);
		return new Promise((resolve, reject) => {
			console.log("AppendFileAsync:Promise sync->", num);
			fs.appendFile(path, data, (err) => {
				console.log("AppendFileAsync:Promise:appendFile  async->", num);
				if(err) {
					return reject(err.message);
				}
				return resolve();
			})
		})
	}

	const ReadFileAsync = async(path) => {
		console.log("ReadFileAsync->");
		return new Promise((resolve, reject) => {
			console.log("ReadFileAsync:Promise ->");
			fs.readFile(path, {encoding: "utf8"} , (err, data) => {
				console.log("ReadFileAsync:Promise:readFile->");
				if(err) {
					return reject(err.message);
				}
				return resolve(data);
			})
		})
	}

	const RemoveFileAsync = async(path) => {
		console.log("RemoveFileAsync->");
		return new Promise((resolve, reject) => {
			console.log("RemoveFileAsync:Promise ->");
			fs.rm(path, (err) => {
				console.log("RemoveFileAsync:Promise:rm->");
				if(err) {
					return reject(err.message);
				}
				return resolve();
			})
		})
	}

	console.log("before calling writeFileAsync...");
	writeFileAsync(1, path.resolve(__dirname, "test.txt"), "123")
		.then(()=> {
			return AppendFileAsync(2, path.resolve(__dirname, "test.txt"), "456")
		})
		.then(()=> {
			console.log("before AppendFileAsync... 3");
			const pr = AppendFileAsync(3, path.resolve(__dirname, "test.txt"), "789")
			console.log("after AppendFileAsync... 3");
			return pr;
		})
		.then(()=>AppendFileAsync(4, path.resolve(__dirname, "test.txt"), "10-11-12"))
		.then(()=> {
			return ReadFileAsync(path.resolve(__dirname, "test.txt"))
		})
		.then(data => console.log(data))
		.then(()=>RemoveFileAsync(path.resolve(__dirname, "test.txt")))
		.catch((err)=>{
			console.log(err);
		})

	//fs.readFile  encoding: utf-8
}

// Task:
// 1. pass string via env
// 2. write it to file  first.txt
// 3. read file 
// 4. count words count in the file
// 5. write these words to the new file count.txt
// 6. delete first file
{

	const writeFile = async(path, data) => {
		return new Promise((resolve, reject) =>{
			fs.writeFile(path, data, (err)=> {
				if(err) {
					return reject(err.message);
				}
				return resolve();
			})
		})
	}

	const readFile = async(path) => {
		return new Promise((resolve, reject) =>{
			fs.readFile(path, {encoding: "utf8"}, (err, data)=> {
				if(err) {
					return reject(err.message);
				}
				return resolve(data);
			})
		})
	}

	const daleteFile = async(path) => {
		return new Promise((resolve, reject) =>{
			fs.rm(path, (err)=> {
				if(err) {
					return reject(err.message);
				}
				return resolve();
			})
		})
	}

	// Loads `.env` file contents
	require("dotenv").config();
	const text = process.env.TEXT || "";

	const first_file_path = path.resolve(__dirname, "first.txt");
	const count_file_path = path.resolve(__dirname, "count.txt");

	writeFile(first_file_path, text)
		.then(() => readFile(first_file_path) )
		.then((data) => data.split(" ").length )
		.then((count) => writeFile(count_file_path, `words count: ${count}`) )
		.then(() => daleteFile(first_file_path) )
		.catch((err) => {
			console.log(err);
		})
}