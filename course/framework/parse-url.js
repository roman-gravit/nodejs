module.exports = (base_url) => (req, resp) => {
	const parsed_url = new URL(req.url, base_url);
	const params = {};
	parsed_url.searchParams.forEach((value, key) => params[key] = value )
	req.pathname = parsed_url.pathname;
	req.params = params;
}
