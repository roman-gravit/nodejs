const os = require("os");
const cluster = require("cluster");


console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
	console.log(`Master process ${process.pid} is running`);
  
	for (let i = 0; i < numCPUs-2; i++) {
	  cluster.fork();
	}
  
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker process ${worker.process.pid} died. Restarting...`);
		cluster.fork();
	});


} else {
	console.log(`Worker with pid ${process.pid} starts`);

	setInterval(()=> {
		console.log(`Worker with pid ${process.pid} still working`);
	}, 3000);
}