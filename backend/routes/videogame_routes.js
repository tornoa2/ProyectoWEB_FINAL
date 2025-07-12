import express from "express";
import Videogame from "../models/Videogame.js"
const router = express.Router();

router.get("/videogames", async (req,res) => {
  try {
    const videogames = await Videogame.findAll();
    res.status(200).json(videogames);
  }catch(error) {
    console.error(error);
    res.status(500).json("Error en la BD", error);
  }
})

router.post("/create_videogame", async function(req, res){
  try {    
    const data = req.body;
    if(data.name && data.description && data.stock && data.platform && data.type && data.ofert && data.price && data.rate && data.releaseDate){
        const createdVideogame = await Videogame.create({
            name: data.name,
            description: data.description,
            stock: data.stock,
            platform: data.platform,
            type: data.type,
            ofert: data.ofert,
            price: data.price,
            rate: data.rate,
            releaseDate: data.releaseDate
        });
        res.status(200).json(createdVideogame);
        console.log("Usuario creado")
    }else{
        res.status(400).json("Faltan datos");
    }
  }catch(error){
    res.status(400).json("Error en la BD", error);
  }
});

router.delete("/delete_videogame/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const videogame = await Videogame.findByPk(id);
    if (!videogame) {
      return res.status(404).json({ message: "Videogame not found" });
    }
    await videogame.destroy();
    res.status(200).json({ message: "Videogame eliminado correctamente" });
  } catch (error) {
    res.status(500).json("Error en la BD", error);
  }
});
export default router;