import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

export const Internship = sequelize.define("Internship", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  company: {
    type: DataTypes.STRING,
  },

  location: {
    type: DataTypes.STRING,
  },

  url: {
    type: DataTypes.TEXT,
  },

  description: {
    type: DataTypes.TEXT,
  },

  source: {
    type: DataTypes.STRING,
  },
});