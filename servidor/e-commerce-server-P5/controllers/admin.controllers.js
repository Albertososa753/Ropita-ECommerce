import User from "../models/user.model.js";

/**
 * Obtiene todos los usuarios.
 * Solo los usuarios con rol de administrador pueden acceder a esta información.
 * Devuelve un arreglo de todos los usuarios existentes en la base de datos.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con el arreglo de usuarios.
 */
export const allUsers = async (req, res) => {
  let { email } = req.user;
  let user = await User.findOne({ where: { email } });

  if (!user.isAdmin)
    return res
      .status(401)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  let allUsers = await User.findAll();

  return res.status(200).send(allUsers);
};

/**
 * Elimina un usuario.
 * Solo los usuarios con rol de administrador pueden realizar esta operación.
 * Si el usuario a eliminar no existe, se devuelve un código de estado 409 (Conflict)
 * junto con un mensaje de error.
 * Si se intenta eliminar el usuario loggeado, se devuelve un código de estado 500 (Internal Server Error)
 * junto con un mensaje de error indicando que no se puede eliminar el usuario loggeado.
 * En caso de éxito, se elimina el usuario y se devuelve un código de estado 201 (Created)
 * junto con un mensaje indicando que el usuario ha sido eliminado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con el resultado de la operación.
 */
export const deleteUser = async (req, res) => {
  let { email } = req.user;
  let user = await User.findOne({ where: { email } });

  if (!user.isAdmin)
    return res
      .status(401)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  let emailToDelete = req.body.email;
  let userToDelete = await User.findOne({ where: { email: emailToDelete } });

  if (!userToDelete)
    return res
      .status(409)
      .header("X-Error-Message", `${emailToDelete} no existe`)
      .send(`${emailToDelete} no existe`);

  if (emailToDelete == user.email)
    return res
      .status(500)
      .header(
        "X-Error-Message",
        `${emailToPromote} no se puede eliminar ya que es el user loggeado`
      )
      .send(
        `${emailToPromote} no se puede eliminar ya que es el user loggeado`
      );

  userToDelete.destroy();

  return res.status(201).send(`Se ha eliminado al usuario: ${emailToDelete}`);
};

/**
 * Promueve a un usuario a administrador.
 * Solo los usuarios con rol de administrador pueden realizar esta operación.
 * Si el usuario a promover ya es administrador, se devuelve un código de estado 500 (Internal Server Error)
 * junto con un mensaje de error.
 * En caso de éxito, se actualiza el estado del usuario a administrador y se devuelve un código de estado 201 (Created)
 * junto con un mensaje indicando que el usuario ahora es administrador.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con el resultado de la operación.
 */
export const promoteUser = async (req, res) => {
  let { email } = req.user;
  let user = await User.findOne({ where: { email } });
  if (!user.isAdmin)
    return res
      .status(401)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  let emailToPromote = req.body.email;
  let userToPromote = await User.findOne({ where: { email: emailToPromote } });

  if (userToPromote.isAdmin)
    return res
      .status(500)
      .header("X-Error-Message", `${emailToPromote} ya es admin`)
      .send(`${emailToPromote} ya es admin`);

  userToPromote.isAdmin = true;
  userToPromote.save();

  return res.status(201).send(`Usuario: ${emailToPromote} ahora es admin`);
};
