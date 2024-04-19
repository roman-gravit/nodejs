const UserModel = require("./user-model");

const GetUsers = async (req, resp) => {
	let users;
	if(req.params.id) {
		users = await UserModel.findById(req.params.id);
	} else {
		users = await UserModel.find();
	}
	
	resp.send(users);
}

const CreateUser = async (req, resp) => {
	const user = await UserModel.create(req.body);
	resp.send(user);
}

module.exports = {
	CreateUser,
	GetUsers
}