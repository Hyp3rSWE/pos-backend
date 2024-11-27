const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
    isAdminAuthenticated,
    isCashierAuthenticated,
} = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - user_pass
 *             properties:
 *               user_name:
 *                 type: string
 *               user_pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_role
 *               - user_name
 *               - user_pass
 *             properties:
 *               user_role:
 *                 type: string
 *                 description: Role of the user (admin or cashier).
 *               user_name:
 *                 type: string
 *               user_pass:
 *                 type: string
 *                 description: Password for the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/", isAdminAuthenticated, UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   user_role:
 *                     type: string
 *                   user_name:
 *                     type: string
 */
router.get("/", isAdminAuthenticated, UserController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data.
 *       404:
 *         description: User not found.
 */
router.get("/:id", isAdminAuthenticated, UserController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_role:
 *                 type: string
 *               user_name:
 *                 type: string
 *               user_pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put("/:id", isAdminAuthenticated, UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete("/:id", isAdminAuthenticated, UserController.deleteUser);

module.exports = router;
