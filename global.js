setTimeout(()=>{
	console.log(globalThis);
}, 200);


setTimeout(()=>{
	console.log("dirname:",__dirname);
}, 200);

setTimeout(()=>{
	console.log("filename:", __filename);
}, 200);

setTimeout(()=>{
	console.log("process.env:", process.env);
}, 200);

setTimeout(()=>{
	console.log("process.argv:", process.argv);
}, 200);

const my_url = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'); 
for(const part in my_url) {
	console.log(`${part} : ${my_url[part]}`);
}