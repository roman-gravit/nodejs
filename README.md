# NodeJS

Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. 

Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. 

Node.js lets developers use JavaScript to write command line tools and for server-side scripting.


##  NPM

NPM is a package manager for Node.js packages, or modules if you like. www.npmjs.com hosts thousands of free packages to download and use.
The NPM program is installed on your computer when you install Node.js
Main commands:

 - npm init:  Creates a new package.json file with elementary properties. Contains prompts about the project , such as the name, version, etc.

 - npm install: installing all project dependencies

 - npm install -g [package]: install pacakage globally

 - npm install --save-dev [package]:  install with develop dependency

 - npm install [package]@1.0.0: install specific package version

 - npm install [package]@latest: install latest package version

 - npm update: Checks for newer versions and updates dependencies provided in the package.json file. 

 - npm run [script name]:	Runs scripts provided in the scripts property.

 - npm uninstall [package]: uninstall package


##  *package.json* file

Every npm package and Node.js project has a package.json file with metadata for a project. 
The file resides in the root directory of every Node.js package and appears after running the npm init command.
The package.json file contains descriptive and functional metadata about a project, such as a name, version, and dependencies. 
The file provides the npm package manager with various information to help identify the project and handle dependencies.

Example:

```
{
	"name": "example-name",
	
	"version": "1.0.0",
	
	"license": "MIT",
	
	"description": "An example NodeJS project",
		
	"keywords": ["example", "learning", "kb"],
	
	"author": "Bob",
	
	"contributors": [{
		"name": "Alice",
		"email": "alice@example.com"
	}],

	// The main property points to the project's entry point. When a Node.js application imports the package 
	// through a require statement, the package.json file uses the exports from the file in the main property 
	// and returns it to the application. If a package.json file does not have the main property, the value 
	// defaults to index.js.
	//
	"main": "app.js",

	// The scripts property in a package.json file contains commands that run at various times in the package lifecycle. 
	// The key-value pairs have the script name and the corresponding user-made script or command to execute.
	// To run scripts defined in the scripts property, use the default npm run command: npm run <script name>
	//
	"scripts": {
		"start": "node index.js",
		"dev": "nodemon"
	},

	// The dependencies property is an essential field in a package.json file. 
	// The section maps production-level dependent packages and their versions used in the project.
	//
	"dependencies": {
		"express": "^4.1.4",
		"compression": "~1.3.2"
	},

	// The devDependencies property defines the package dependencies necessary for the development process. 
	// The development dependencies help other developers copy the build steps.
	// Use devDependencies to list unnecessary packages for production 
	//
	"devDependencies": {
		"nodemon": "^1.18.10"
	}
}
```

##   *package-lock.json*

package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. 
It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

This file is intended to be committed into source repositories, and serves various purposes:

 - Will lock npm dependencies the way they were at the time of making the program. So, even if someone clones your repo and installs 
   this package later, he will get hands on the version that the program was scripted in. Basically, it just ignores tilde(~) and carat(^) functions.
 
 - Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are 
   guaranteed to install exactly the same dependencies.

 - Optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages.


##  package version

``` "foo": "^2.3.0" ```

Here, foo is installed with version 2.3.0 [major.minor.patch]. 

The caret symbol tells something more:
^2.3.0 — [Caret Symbol] This tells npm to upgrade to minor and patch versions, but not major versions. 
          So, basically 2.3.4, 2.3.9, 2.4.5, 2.8 but not 3.0.0 onwards. (Upgrade to minor and patch, but not major)

~2.3.0 — [Tilde Symbol] This tells npm to upgrade to patch versions, but not minor and major versions. 
          So 2.3.4, 2.3.9 but not 2.4.0 onwards. (Upgrade to patch, but not minor and major)


##  Express

Fast, unopinionated, minimalist web framework for Node.js.
It provides mechanisms to:

 - Write handlers for requests with different HTTP verbs at different URL paths (routes).

 - Integrate with "view" rendering engines in order to generate responses by inserting data into templates.

 - Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.

 - Add additional request processing "middleware" at any point within the request handling pipeline.

https://expressjs.com/en/4x/api.html


##   Using template engines with Express

A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables 
in a template file with actual values, and transforms the template into an HTML file sent to the client. 
This approach makes it easier to design an HTML page.

Some popular template engines that work with Express are *Pug*, *Mustache*, and *EJS*. 
The Express application generator uses Jade as its default, but it also supports several others.

Steps to implement:

- install needed package

- load the template engine module in your app:  ```app.set('view engine', 'ejs')```

- Create a EJS template file named index.ejs

- Then create a route to render the index.ejs file. 


##  Global Node objects 

These objects are available in all modules.

The following variables may appear to be global but are not. They exist only in the scope of *CommonJS* modules:

 - **__dirname:** The directory name of the current module. This is the same as the path.dirname() of the __filename.
 
 - **__filename:** The file name of the current module. This is the current module file's *absolute path* with symlinks resolved.

 - **globalThis:**  The global namespace object.

 - **process:** The process object provides information about, and control over, the current Node.js process.

 - **exports**

 - **module:** In each module, the module free variable is a reference to the object representing the current module. For convenience, module.exports is also accessible via the exports module-global. module is not actually a global but rather local to each module.

 - **require()**


##  fs

[todo]

##  Events

[todo]


##  Streams

A stream is an abstract interface for working with streaming data in Node.js. 

Streams can be readable, writable, or both. All streams are instances of EventEmitter.

There are four fundamental stream types within Node.js:

 - **Writable:** streams to which data can be written (for example, fs.createWriteStream()).

 - **Readable:** streams from which data can be read (for example, fs.createReadStream()).

 - **Duplex:** streams that are both Readable and Writable (for example, net.Socket).

 - **Transform:** Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).