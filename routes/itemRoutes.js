const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/itemController');

// Definir las rutas para manejar usuarios
router.get('/', getUsers);
router.post('/users', createUser);
router.put('/users/:idUser', updateUser);
router.delete('/users/:idUser', deleteUser);

module.exports = router;
