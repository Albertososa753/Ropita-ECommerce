import { Sequelize } from "sequelize";
import db from "../db/index.js";
import Product from "./product.model.js";
import User from "./user.model.js";
class ShoppingCart extends Sequelize.Model {}
ShoppingCart.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    idProduct: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "shoppingcarts",
  }
);

export default ShoppingCart;
