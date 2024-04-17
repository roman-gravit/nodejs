const path = require("path");

const CreatePath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`);

module.exports = CreatePath;