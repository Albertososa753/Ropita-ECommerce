import bcrypt from "bcrypt";

//libs

// require de los models
import User from "../models/user.model.js";
import { createAccesToken } from "../libs/jwt.js";

/**
 * Registrar un nuevo usuario.
 * Genera un hash de la contraseña utilizando bcrypt y un salt generado aleatoriamente.
 * Verifica que el email no esté ya registrado en la base de datos.
 * Si el email ya existe, devuelve un mensaje de error indicando que el usuario ya existe.
 * Si el email es único, crea un nuevo usuario en la base de datos con el email y la contraseña hasheada.
 * Si el usuario creado es el primero en registrarse, se le asigna el rol de administrador.
 * Devuelve una respuesta exitosa con un mensaje indicando el email del usuario registrado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con un mensaje de éxito o un mensaje de error.
 */
export const register = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 8;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  // verifico que el email sea unico
  let user = await User.findOne({ where: { email } });

  if (user) {
    return res
      .status(500)
      .header("X-Error-Message", "Usuario ya existe")
      .send("Usuario ya existe");
  }

  user = await User.create({
    email,
    password: hashedPassword,
    salt: salt,
  });

  // para el primer usuario creado sea admin
  if (user.id == 1) {
    user.isAdmin = true;
    await user.save();
  }

  return res
    .status(201)
    .send(`Usuario ${user.dataValues.email} creado satisfactoriamente`);
};

/**
 * Inicio de sesión de usuarios.
 * Verifica las credenciales de inicio de sesión del usuario y genera un token de acceso si las credenciales son válidas.
 * Si el correo electrónico no existe, se devuelve un código de estado 401 (Unauthorized) junto con un mensaje de error.
 * Si la contraseña no es válida, se devuelve un código de estado 401 (Unauthorized) junto con un mensaje de error.
 * En caso de éxito, se genera un token de acceso, se establece como cookie y se devuelve un código de estado 200 (OK)
 * junto con los datos del usuario en el cuerpo de la respuesta.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 * @returns {object} Objeto de respuesta HTTP con el resultado del inicio de sesión.
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .header("X-Error-Message", "Usuario no existe")
      .send("Usuario no existe");
  }

  const isValid = user.validatePassword(password);
  if (!isValid)
    return res
      .status(401)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  if (isValid) {
    const payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await createAccesToken(payload);
    res.cookie("token", token);
    return res.status(200).send(payload); // modificar a gusto
  }
};

/**
 * Desconexión de usuarios.
 * Verifica si el usuario está autenticado y tiene una cookie de token.
 * Si el usuario está autenticado, se elimina y limpia la cookie de token y se devuelve un código de estado 204 (No Content)
 * indicando que el usuario se ha desconectado correctamente.
 * Si el usuario no está autenticado o no tiene una cookie de token, se devuelve un código de estado 401 (Unauthorized)
 * junto con un mensaje indicando que el usuario ya está desconectado.
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con el resultado de la desconexión del usuario.
 */
export const logout = async (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token");
    return res.sendStatus(204);
  } else {
    return res.status(401).send("Usuario ya esta deslogeado");
  }
};

/**
 * Edición de usuario.
 * Verifica si el usuario está autenticado y busca al usuario correspondiente en la base de datos.
 * Luego, actualiza los atributos del usuario con los valores proporcionados en el cuerpo de la solicitud.
 * Se cuentan las modificaciones realizadas y se guarda el usuario editado en la base de datos.
 * Si se realizaron modificaciones, se devuelve un código de estado 202 (Accepted) junto con un mensaje
 * indicando la cantidad de atributos modificados.
 * Si no se realizaron modificaciones, se devuelve un código de estado 200 (OK) indicando que no hubo modificaciones.
 * Si el usuario no está autenticado, se devuelve un código de estado 401 (Unauthorized).
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con el resultado de la edición del usuario.
 */
export const editUser = async (req, res) => {
  const { email } = req.user;
  let user = await User.findOne({ where: { email } });

  if (!email)
    return res
      .status(401)
      .header("X-Error-Message", "Unauthorized")
      .send("Unauthorized");

  const { name, lastName, direction, phone, dateOfBirth } = req.body;

  // dentro puede haber validaciones
  let modificaciones = [];

  const actualizarAtributo = (atributo, valor) => {
    if (valor && valor != user[atributo]) {
      user[atributo] = valor;
      modificaciones.push(atributo);
    }
  };

  actualizarAtributo("name", name);
  actualizarAtributo("lastName", lastName);
  actualizarAtributo("direction", direction);
  actualizarAtributo("phone", phone);
  actualizarAtributo("dateOfBirth", dateOfBirth);

  if (modificaciones.length === 0)
    return res
      .status(200)
      .send(`No hubo modificaciones en usuario con ID: ${user.id}`);

  await user.save();

  return res.status(200).send({
    message: `Usuario con ID: ${user.id} tuvo ${modificaciones.length} ${
      modificaciones.length === 1 ? "modificación" : "modificaciones"
    }`,
    modificaciones: modificaciones,
  });
};

/**
 * Obtención de los datos del usuario loggeado.
 * Verifica si el usuario está autenticado y busca al usuario correspondiente en la base de datos.
 * Luego, crea un nuevo objeto con los campos deseados y devuelve el objeto en la respuesta con un código de estado 200 (OK).
 * Si el usuario no está autenticado, se devuelve un código de estado 403 (Forbidden).
 *
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Objeto de respuesta HTTP con los datos del usuario.
 */
export const getUserData = async function (req, res) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(403).send("No user loggeado");

  const userEdited = {
    id: user.id,
    email: user.email,
    lastname: user.lastname,
    name: user.name,
    direction: user.direction,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
  };

  return res.status(200).send(userEdited);
};
