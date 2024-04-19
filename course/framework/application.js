const http = require("http");
const EventEmitter = require("events");

class Application {
	emitter = undefined;
	server = undefined;
	middlewares = [];

	constructor() {
		this.emitter = new EventEmitter();
		this.server = this._CreateServer();
		this.middlewares = [];
	}
	
	// endpoints = {
	//	  "/users" : {
    //		  "GET": handler
	//	  }
	// }
	AddRouter(router) {
		console.log(`application:AddRouter  ${router}`);
		Object.keys(router.endpoints).forEach(path => {
			const endpoint = router.endpoints[path];
			Object.keys(endpoint).forEach(method => {
				this.emitter.on(this._GetRouteMask(path, method), (req, resp) => {
					const handler = endpoint[method];
					handler(req, resp);
				});
			})
		})
	}

	Use(middleware) {
		this.middlewares.push(middleware);
	}

	ListenPort(port, callback) {
		console.log(`application:ListenPort  ${port}`);
		this.server.listen(port, callback);
	}

	_CreateServer() {
		console.log(`application:_CreateServer`);
		return http.createServer((req, resp) => {
			
			let body = "";

			req.on("data", (chunk) => {
				body += chunk;		
			})

			req.on("end", () => {
				if(body) {
					req.body = JSON.parse(body);
				}		

				this.middlewares.forEach(middleware => middleware(req, resp));
				// Synchronously calls each of the listeners registered for the event named eventName, 
				// in the order they were registered, passing the supplied arguments to each.
				const emitted = this.emitter.emit(this._GetRouteMask(req.pathname, req.method), req, resp);
			
				// Returns true if the event had listeners, false otherwise.
				if(!emitted) {
					resp.end();
				}
			})

		})	
	}

	_GetRouteMask(path , method) {
		return `[${path}]:[${method}]`;
	}
}

module.exports = Application;