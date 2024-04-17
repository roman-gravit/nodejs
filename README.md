# NodeJS

Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. 

Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. 

Node.js lets developers use JavaScript to write command line tools and for server-side scripting.


## Global objects 

These objects are available in all modules.

The following variables may appear to be global but are not. They exist only in the scope of *CommonJS* modules:

 - **__dirname:** The directory name of the current module. This is the same as the path.dirname() of the __filename.
 
 - **__filename:** The file name of the current module. This is the current module file's *absolute path* with symlinks resolved.

 - **globalThis:**  The global namespace object.

 - **process:** The process object provides information about, and control over, the current Node.js process.

 - **exports**

 - **module:** In each module, the module free variable is a reference to the object representing the current module. For convenience, module.exports is also accessible via the exports module-global. module is not actually a global but rather local to each module.

 - **require()**

