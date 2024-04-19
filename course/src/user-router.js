const Router = require("../framework/router");
const controller = require("../src/user-controller");

const router = new Router();

router.get("/users", controller.GetUsers);
router.post("/users", controller.CreateUser);

module.exports = router;
