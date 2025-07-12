import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Usuario = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false
});

export default Usuario;