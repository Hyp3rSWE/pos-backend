const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['user_pass'] } });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, { attributes: { exclude: ['user_pass'] } });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    static async createUser(req, res) {
        try {
            const { user_role, user_name, user_pass } = req.body;
    
            if (!user_role || !user_name || !user_pass) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            const existingUser = await User.findOne({ where: { user_name } });
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(user_pass, 10);
    
            const newUser = await User.create({
                user_role,
                user_name,
                user_pass: hashedPassword,
            });
    
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error during user creation:', error);
            res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    }
    
    

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { user_role, user_name, user_pass } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedData = {
                user_role: user_role || user.user_role,
                user_name: user_name || user.user_name,
            };

            if (user_pass) {
                updatedData.user_pass = await bcrypt.hash(user_pass, 10);
            }

            await user.update(updatedData);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
    static async getUserByRole(req, res) {
        try {
            const { role } = req.params;
            const users = await User.findAll({
                where: { user_role: role },
                attributes: { exclude: ['user_pass'] },
            });

            if (!users || users.length === 0) {
                return res.status(404).json({ error: `No users found with role ${role}` });
            }

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users by role' });
        }
    }
    static async login(req, res) {
        const { user_name, user_pass, role } = req.body;
    
        try {
            const user = await User.findOne({ where: { user_name } });
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            if (user.user_role !== role) {
                return res.status(403).json({ error: 'Role mismatch' });
            }
    
            const isMatch = await bcrypt.compare(user_pass, user.user_pass);
    
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
    
            req.session.userId = user.user_id;
            req.session.userRole = user.user_role;
    
            res.status(200).json({
                message: 'Login successful',
                user_id: user.user_id,
                user_role: user.user_role
            });
        } catch (error) {
            res.status(500).json({ error: 'Error during login' });
        }
    }
    
    
}

module.exports = UserController;