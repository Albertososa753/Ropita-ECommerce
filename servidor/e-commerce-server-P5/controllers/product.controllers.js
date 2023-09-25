import Product from "../models/product.model.js";
import User from "../models/user.model.js";
/**
 * Obtener todos los productos.
 * Realiza una consulta a la base de datos para obtener todos los productos almacenados.
 * Si se encuentran productos, devuelve una respuesta exitosa con los productos.
 * Si no se encuentran productos, devuelve una respuesta sin contenido (204) con un mensaje indicando que no hay productos.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con los productos o un mensaje de error.
 */
export const getProducts = async function (req, res, next) {
  const prod = await Product.findAll();

  if (!prod) return res.status(204).send("No products");

  return res.status(200).send(prod);
};

/**
 * Obtener un producto por ID.
 * Realiza una consulta a la base de datos para obtener un producto específico según su ID.
 * Si se encuentra el producto, devuelve una respuesta exitosa con el producto.
 * Si no se encuentra el producto, devuelve una respuesta sin contenido (204) con un mensaje indicando que no se encontró el producto.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con el producto encontrado o un mensaje de error.
 */
export const getIdProduct = async function (req, res, next) {
  const { productId } = req.params;
  const prod = await Product.findByPk(productId);
  if (!prod) return res.status(204).send("No product");

  return res.status(200).send(prod);
};

/**
 * Eliminar un producto por ID.
 * Realiza una verificación de autorización para asegurarse de que el usuario tenga permisos de administrador.
 * Luego, realiza una consulta a la base de datos para encontrar y eliminar un producto específico según su ID.
 * Si se encuentra y elimina el producto, devuelve una respuesta exitosa con un mensaje indicando que el producto se ha eliminado.
 * Si no se encuentra el producto, devuelve una respuesta sin contenido (204) con un mensaje indicando que el producto no se encontró.
 * Si el usuario no tiene permisos de administrador, devuelve una respuesta de error de acceso no autorizado (403).
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const deleteIdProduct = async function (req, res, next) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });

  if (!user.isAdmin)
    return res
      .status(403)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  const { productId } = req.params;

  const prod = await Product.findByPk(productId);

  if (!prod)
    return res
      .status(204)
      .header("X-Error-Message", "Product not found")
      .send("Product not found");

  prod.destroy();

  return res.status(200).send(`Producto ${prod.name} eliminado`);
};

/**
 * Editar un producto.
 * Realiza una verificación de autorización para asegurarse de que el usuario tenga permisos de administrador.
 * Luego, realiza una consulta a la base de datos para encontrar y editar un producto específico según su ID.
 * Si se encuentra y se realizan modificaciones en el producto, devuelve una respuesta exitosa con un mensaje indicando las modificaciones realizadas.
 * Si no se encuentra el producto, devuelve una respuesta sin contenido (204) con un mensaje indicando que el producto no se encontró.
 * Si el usuario no tiene permisos de administrador, devuelve una respuesta de error de acceso no autorizado (403).
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const editProduct = async function (req, res, next) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });

  if (!user || !user.isAdmin)
    return res
      .status(403)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  const { productId } = req.params;

  const prod = await Product.findByPk(productId);

  if (!prod)
    return res
      .status(204)
      .header("X-Error-Message", "Product not found")
      .send("Product not found");

  const {
    name,
    quantity,
    price,
    description,
    description_long,
    img_url,
    img_url_descript,
  } = req.body;

  let modificaciones = [];

  const actualizarAtributo = (atributo, valor) => {
    if (valor && valor != prod[atributo]) {
      prod[atributo] = valor;
      modificaciones.push(atributo);
    }
  };

  actualizarAtributo("name", name);
  actualizarAtributo("quantity", quantity);
  actualizarAtributo("price", price);
  actualizarAtributo("description", description);
  actualizarAtributo("description_long", description_long);
  actualizarAtributo("img_url", img_url);
  actualizarAtributo("img_url_descript", img_url_descript);

  if (modificaciones.length === 0)
    return res
      .status(200)
      .send(`No hubo modificaciones en producto con ID: ${prod.id}`);

  await prod.save();

  return res.status(200).send({
    message: `Producto con ID: ${prod.id} tuvo ${modificaciones.length} ${
      modificaciones.length === 1 ? "modificación" : "modificaciones"
    }`,
    modificaciones: modificaciones,
  });
};

/**
 * Agregar un nuevo producto.
 * Realiza una verificación de autorización para asegurarse de que el usuario tenga permisos adecuados.
 * Luego, busca en la base de datos si ya existe un producto con el mismo nombre.
 * Si no existe, crea un nuevo producto con la información proporcionada.
 * Si el producto ya existe, devuelve un mensaje de error indicando que el producto ya existe.
 * Si el usuario no está autorizado, devuelve un mensaje de error de acceso no autorizado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const addProduct = async function (req, res) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res
      .status(403)
      .header("X-Error-Message", "Usuario no autorizado")
      .send("Usuario no autorizado");

  if (!user.isAdmin)
    return res
      .status(403)
      .header("X-Error-Message", "Usuario no autorizado")
      .send("Usuario no autorizado");

  const {
    name,
    quantity,
    price,
    description,
    description_long,
    img_url,
    img_url_descript,
  } = req.body;

  const prod = await Product.findOne({ where: { name } });

  if (!prod) {
    await Product.create({
      name: name,
      quantity: quantity,
      price: price,
      description: description,
      description_long: description_long,
      img_url: img_url,
      img_url_descript: img_url_descript,
    });

    return res.status(201).send(`Producto ${name} creado`);
  } else {
    return res.status(500).send(`Producto ${name} ya existe`);
  }
};
