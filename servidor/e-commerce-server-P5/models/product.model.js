import { Sequelize } from "sequelize";
import db from "../db/index.js";

class Product extends Sequelize.Model {}
Product.init(
  {
    name: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No description",
    },
    description_long: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No description",
    },
    img_url: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No image",
    },
    img_url_descript: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No image",
    },
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

export default Product;
