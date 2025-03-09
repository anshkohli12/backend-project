const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser, loginUser, registerUser } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
