const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const filePath = path.join(__dirname, '../data/db.json');

// Leer el archivo JSON
const readDB = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Escribir en el archivo JSON
const writeDB = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Obtener todos los usuarios
const getUsers = (req, res) => {
  const db = readDB();
  res.json(db.users);
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { email, password, first_name, last_name, birthday } = req.body;

  if (!email || !password || !first_name || !last_name || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const db = readDB();

  // Verificar si el usuario ya existe
  const userExists = db.users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Crear el nuevo usuario
  const newUser = {
    idUser: db.nextId++, // Asignar el próximo ID
    email,
    password,
    first_name,
    last_name,
    birthday
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json(newUser);
};

// Actualizar un usuario
const updateUser = (req, res) => {
  const { idUser } = req.params;
  const { email, password, first_name, last_name, birthday } = req.body;

  const db = readDB();
  const index = db.users.findIndex(user => user.idUser === parseInt(idUser));

  if (index !== -1) {
    db.users[index] = {
      ...db.users[index],
      email: email || db.users[index].email,
      password: password || db.users[index].password,
      first_name: first_name || db.users[index].first_name,
      last_name: last_name || db.users[index].last_name,
      birthday: birthday || db.users[index].birthday
    };

    writeDB(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Eliminar un usuario
const deleteUser = (req, res) => {
  const { idUser } = req.params;

  const db = readDB();
  const filteredUsers = db.users.filter(user => user.idUser !== parseInt(idUser));

  if (filteredUsers.length !== db.users.length) {
    db.users = filteredUsers;
    writeDB(db);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
