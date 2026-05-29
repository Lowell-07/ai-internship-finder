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

  companyLogo: {
    type: DataTypes.STRING,
  },

  workMode: {
    type: DataTypes.STRING,
  },

  duration: {
    type: DataTypes.STRING,
  },

  salary: {
    type: DataTypes.STRING,
  },

  requirements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  postedAt: {
    type: DataTypes.DATE,
  },

  applicantsCount: {
    type: DataTypes.INTEGER,
  },

  relevanceScore: {
    type: DataTypes.FLOAT,
  },

  explanation: {
    type: DataTypes.TEXT,
  },

  saved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
