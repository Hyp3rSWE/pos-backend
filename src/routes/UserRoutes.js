const express = require('express');
const { getAllUsers } = require('../controllers/UserController');

const router = express.Router();


/**
 * @swagger
 * /users/getAllUSers:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users (dummy data for testing).
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   user_role:
 *                     type: string
 *                     example: admin
 *                   user_name:
 *                     type: string
 *                     example: John Doe
 *                   user_pass:
 *                     type: string
 *                     example: password123
 */
router.get('/getAllUsers', getAllUsers);

module.exports = router;