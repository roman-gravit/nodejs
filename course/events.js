const Emitter = require("events");

const emitter = new Emitter();

emitter.on("message", (data, second, third) => {
	console.log(`you send message: ${data}`);
	console.log(`second argument: ${second}`);
	console.log(`third argument: ${third}`);
})

const MESSAGE  = process.env.message || "";
if(MESSAGE) {
	emitter.emit("message", MESSAGE, 123);
} else {
	emitter.emit("message", "arg1", "arg2", "arg3");
}
// emitter.once
// emitter.removeAllListeners
// emitter.removeListener

// Emitter is commonly used inside node: http  cluster