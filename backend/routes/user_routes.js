import express from "express";
import Usuario from "../models/User.js";
const router = express.Router();

router.get("/users", async (req,res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  }catch(error) {
    console.error(error);
    res.status(500).json("Error en la BD", error);
  }
})

router.post("/register_user", async function(req, res){
  try {    
    const data = req.body;
    if(data.username && data.password && data.email){
        const usuarioCreado = await Usuario.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        res.status(200).json(usuarioCreado);
        console.log("Usuario creado")
    }else{
        res.status(400).json("Faltan datos");
    }
  }catch(error){
    res.status(400).json("Error en la BD", error);
  }
});

router.delete("/delete_user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json("Error en la BD", error);
  }
});
export default router;