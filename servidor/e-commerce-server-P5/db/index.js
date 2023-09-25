import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ecommerce", "postgres", 'cbsn14', {
  dialect: "postgres",
  logging: false,
  host: "localhost",
  port:5434,
});

export default sequelize;
