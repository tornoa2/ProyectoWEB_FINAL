import express from "express";
import userRoutes from "./routes/user_routes.js";
import adminRouthes from "./routes/admin_routes.js"
import videogameRouthes from "./routes/videogame_routes.js"
import { sequelize } from "./database/db.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(userRoutes);
app.use(adminRouthes);
app.use(videogameRouthes);


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");
    
    await sequelize.sync({ alter: true, force: true });

    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

startServer();