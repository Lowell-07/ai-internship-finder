import { sequelize } from "../configs/database.js";
import "./internship.model.js";
import "./chatHistory.model.js";

export async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database Synced");
  } catch (error) {
    console.error(error);
  }
}
