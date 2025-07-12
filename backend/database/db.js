import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("GameStore", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});