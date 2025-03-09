const { readJsonFile, writeJsonFile } = require('../util/fileUtils');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const getUsers = async (req, res) => {
    try {
        const { users } = await readJsonFile('users.json');
        res.json(users.map(u => ({ id: u.id, username : u.username, email: u.email })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { users } = await readJsonFile('users.json');
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { users } = await readJsonFile('users.json');
        
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = {
            id: String(users.length + 1),
            username,
            email,
            password: hashedPassword
        };

        users.push(newUser);
        await writeJsonFile('users.json', { users });
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { users } = await readJsonFile('users.json');
        
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Logged in successfully', 
            user: {
                id: user.id, 
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { users } = await readJsonFile('users.json');
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.email = req.body.email || user.email;
        await writeJsonFile('users.json', { users });
        res.json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { users } = await readJsonFile('users.json');
        const index = users.findIndex(u => u.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'User not found' });
        
        users.splice(index, 1);
        await writeJsonFile('users.json', { users });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser
};
