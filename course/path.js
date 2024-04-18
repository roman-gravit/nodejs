const path = require("path");

// Join all arguments together and normalize the resulting path.
let path_s = path.join("first", "second");
if(path_s !== "first\\second") {
	throw new Error("join #1 failed");
}

path_s = path.join("first", "second", "third");
if(path_s !== "first\\second\\third") {
	throw new Error("join #2 failed");
}

// resolve: absolute path
// be careful using resolve with slash - it can broke the absolute result path
const full_path = path.resolve("first", "second");
if( !full_path.endsWith("first\\second") || !full_path.startsWith("C:\\") ) {
	throw new Error("resolve failed");
}

// root | dir | base | ext | name
const parsed = path.parse(full_path);
for(const part in parsed) {
	console.log(`${part} : ${parsed[part]}`);
}
