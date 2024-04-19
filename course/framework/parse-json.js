function ParseJson(req, resp) {
	resp.send = (data) => {
		resp.setHeader("Content-Type", "application/json");
		resp.statusCode = 200;
		resp.end(JSON.stringify(data));
	}
}

module.exports = ParseJson;