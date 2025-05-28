const fs = require('fs')

const path = require('path')

const filePath = path.join(__dirname, '../data/usuarios.json')

const leerUsuarios = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

let usuarios = leerUsuarios();

console.log("usuarios", usuarios);

const escribirUsuarios = (usuarios) => {
    fs.writeFileSync(filePath, JSON.stringify (usuarios, null, 2))
}

// Obtiene todos los usuarios.
const getUsers = (req, res) => {
    res.json({ data: usuarios, status: 200, message: 'Uusuarios obtenidos de manera exitosa' })
}

// Funcion que obtiene un usuario a traves de su id.
const getUserById = (req, res) => {
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if (!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' })
    res.json({ data: usuario, status: 200, message: "Usuario encontrado" })
}

const createUser = (req, res) => {
    const nuevoUsuario = req.body
    nuevoUsuario.id = usuarios.length + 1
    usuarios.push(nuevoUsuario)

    escribirUsuarios(usuarios)

    res.json({ status: 200, data: nuevoUsuario, message: 'Usuario creado exitosamente' })
}

const updateUser = (req, res) => {
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))

    if (!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' })
    const { nombre, email, edad } = req.body
    usuario.nombre = nombre || usuario.nombre
    usuario.email = email || usuario.email
    usuario.edad = edad || usuario.edad

    escribirUsuarios(usuarios)

    res.json({status: 201, message: 'Usuario editado exitosamente'})
}

const deleteUser = (req, res) => {
    let usuario = usuarios.find(item => item.id === parseInt(req.params.id))

    if (!usuario) return res.json({status: 404, message: 'Usuario no encontrado'})
    usuarios = usuarios.filter(item => item.id !== usuario.id)

    escribirUsuarios(usuarios)

    res.json({ status: 201, message: 'Usuario eliminado exitosamente' })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
