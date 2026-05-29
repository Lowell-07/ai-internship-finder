// backend/src/utils/test-db.js
import sequelize from "../configs/database.js";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected");
    await sequelize.close();
  } catch (error) {
    console.error("❌ Unable to connect:", error.message);
    process.exit(1);
  }
}

testConnection();
