const { MongoClient} = require("mongodb");
const dotenv = require("dotenv");

// Loads `.env` file contents
dotenv.config();
const connect_url = process.env.MONGO_URL || "";

const client = new MongoClient(connect_url);

const start = async() => {
	try {

		await client.connect();
		console.log("db connected....");

		const collections = await client.db().collections();
		const contact = await collections[0].findOne({ name: "Youtube"});
		console.log(contact);

	} catch(e) {
		console.log(e);
	}

}

start();