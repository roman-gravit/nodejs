const path = require("path");

// ----------- URL ---------------------------
const site_url = "http://localhost:8080/users?id=5111"

const url = new URL(site_url);
_TEST(url.hash === "", "URL.hash failed");
_TEST(url.username === "", "URL.username failed");
_TEST(url.password === "", "URL.password failed");
_TEST(url.port === "8080", "URL.port failed");
_TEST(url.pathname === "/users", "URL.pathname failed");
_TEST(url.hostname === "localhost", "URL.hostname failed");
_TEST(url.protocol === "http", "URL.protocol failed");

// ------------- path -------------------------------

// Join all arguments together and normalize the resulting path.
let path_s = path.join("first", "second");
_TEST(path_s === "first\\second", "join #1 failed");

path_s = path.join("first", "second", "third");
_TEST(path_s === "first\\second\\third", "join #2 failed");


// resolve: absolute path
// be careful using resolve with slash - it can broke the absolute result path
const full_path = path.resolve("first", "second");
_TEST((full_path.endsWith("first\\second") && full_path.startsWith("C:\\")), "resolve failed");


// root | dir | base | ext | name
const parsed = path.parse(full_path);
for(const part in parsed) {
	console.log(`${part} : ${parsed[part]}`);
}


function _TEST(checked, error_string) {
	if(!checked) {
		throw new Error(error_string);
	}
}