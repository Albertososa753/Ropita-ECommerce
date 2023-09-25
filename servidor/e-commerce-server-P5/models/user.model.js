import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize";
import db from "../db/index.js";
import ShoppingCart from "./shopping_cart.model.js";

class User extends Sequelize.Model {
  validatePassword(password) {
    let res = bcrypt.compareSync(password, this.password);
    return res;
  }
}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    lastname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.STRING,
    },
    direction: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    dateOfBirth: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    isAdmin: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.beforeCreate((user) => {
  return bcrypt.hashSync(user.password, 8);
});

export default User;
