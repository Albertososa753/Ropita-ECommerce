import Product from "../models/product.model.js";
import ShoppingCart from "../models/shopping_cart.model.js";
import User from "../models/user.model.js";

/**
 * Agregar un producto al carrito.
 * Realiza una verificación para asegurarse de que el usuario esté logeado.
 * Luego, busca el producto en la base de datos según su ID.
 * Si el producto existe, busca en el carrito si ya existe una entrada para ese producto y usuario.
 * Si existe, incrementa la cantidad en uno y guarda los cambios.
 * Si no existe, devuelve un mensaje de error indicando que el producto no está en el carrito.
 * Si el usuario no está logeado, devuelve un mensaje de error de acceso no autorizado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const addOneProductToCart = async function (req, res, next) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(403).send("Usuario no logeado");

  const { productId } = req.params;
  const prod = await Product.findByPk(productId);
  if (!prod) return res.status(404).send("Producto no existe");

  const idUser = user.id;
  const idProduct = prod.id;
  let cart = await ShoppingCart.findOne({
    where: {
      idUser,
      idProduct,
    },
  });

  if (cart) {
    cart.quantity++;
    await cart.save();
    return res
      .status(200)
      .send(
        `1 ${prod.name} agregado al carrito, cantidad actual: ${cart.quantity}`
      );
  } else {
    return res.status(500).send("No existe ese producto en el carrito");
  }
};

/**
 * Restar un producto del carrito.
 * Realiza una verificación para asegurarse de que el usuario esté logeado.
 * Luego, busca el producto en la base de datos según su ID.
 * Si el producto existe, busca en el carrito si ya existe una entrada para ese producto y usuario.
 * Si existe, resta la cantidad en uno y guarda los cambios.
 * Si la cantidad llega a 0, elimina la entrada del carrito.
 * Si no existe una entrada para ese producto en el carrito, devuelve un mensaje de error indicando que el producto no está en el carrito.
 * Si el usuario no está logeado, devuelve un mensaje de error de acceso no autorizado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de llamada al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const resOneProductToCart = async function (req, res, next) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(403).send("Usuario no logeado");

  const { productId } = req.params;
  const prod = await Product.findByPk(productId);
  if (!prod) return res.status(404).send("Producto no existe");

  const idUser = user.id;
  const idProduct = prod.id;
  let cart = await ShoppingCart.findOne({
    where: {
      idUser,
      idProduct,
    },
  });

  if (cart) {
    if (cart.quantity == 1) {
      await cart.destroy();
      return res
        .status(200)
        .send(`Producto ${prod.name} eliminado del carrito`);
    }

    cart.quantity--;
    await cart.save();
    return res
      .status(200)
      .send(
        `1 ${prod.name} restado al carrito, cantidad actual: ${cart.quantity}`
      );
  } else {
    return res.status(500).send("No existe ese producto en el carrito");
  }
};
