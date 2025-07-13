import express from "express";
import Admin from "../models/Admin.js"
const router = express.Router();

router.get("/admins", async (req,res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  }catch(error) {
    console.error(error);
    res.status(500).json("Error en la BD", error);
  }
})

router.post("/register_admin", async function(req, res){
  try {    
    const data = req.body;
    if(data.username && data.password && data.email){
        const adminCreado = await Admin.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        res.status(200).json(adminCreado);
        console.log("Admin creado")
    }else{
        res.status(400).json("Faltan datos");
    }
  }catch(error){
    res.status(400).json("Error en la BD", error);
  }
});

router.delete("/delete_admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin no encontrado" });
    }
    await admin.destroy();
    res.status(200).json({ message: "Admin eliminado correctamente" });
  } catch (error) {
    res.status(500).json("Error en la BD", error);
  }
});
export default router;