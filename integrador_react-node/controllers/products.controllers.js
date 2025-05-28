const fs = require('fs')

const path = require('path')

const filePath = path.join(__dirname, '../data/productos.json')

const leerProductos = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

let productos = leerProductos();

console.log("productos", productos);

const escribirProductos = (productos) => {
    fs.writeFileSync(filePath, JSON.stringify (productos, null, 2))
}

// Obtiene todos los usuarios.
const getProducts = (req, res) => {
    res.json({ data: productos, status: 200, message: 'Productos obtenidos de manera exitosa' })
}

// Funcion que obtiene un usuario a traves de su id.
const getProductById = (req, res) => {
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if (!producto) return res.json({ status: 404, message: 'Producto no encontrado' })
    res.json({ data: producto, status: 200, message: "Producto encontrado" })
}

const createProduct = (req, res) => {
    const nuevoProducto = req.body
    nuevoProducto.id = productos.length + 1
    productos.push(nuevoProducto)

    escribirProductos(productos)

    res.json({ status: 200, data: nuevoProducto, message: 'Producto creado exitosamente' })
}

const updateProduct = (req, res) => {
    const producto = productos.find(item => item.id === parseInt(req.params.id))

    if (!producto) return res.json({ status: 404, message: 'Producto no encontrado' })
    const { nombre, precio, cantidad } = req.body
    producto.nombre = nombre || producto.nombre
    producto.precio = precio || producto.precio
    producto.cantidad = cantidad || producto.cantidad

    escribirProductos(productos)

    res.json({status: 201, message: 'Producto editado exitosamente'})
}

const deleteProduct = (req, res) => {
    let producto = productos.find(item => item.id === parseInt(req.params.id))

    if (!producto) return res.json({status: 404, message: 'Producto no encontrado'})
    productos = productos.filter(item => item.id !== producto.id)

    escribirProductos(productos)

    res.json({ status: 201, message: 'Producto eliminado exitosamente' })
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
