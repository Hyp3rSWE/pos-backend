const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);
router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.get("/role/:role", UserController.getUserByRole); 
router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
