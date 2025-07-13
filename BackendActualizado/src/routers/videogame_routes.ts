import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const VideogameRoutes = () => {
    const router = express.Router()

    router.get("/all", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        try {
        const videogames = await prisma.videogame.findMany()
        resp.status(200).json(videogames)
        }catch(error) {
            console.error(error)
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.get("/videogame", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient();

        const min = req.query.min ? Number(req.query.min) : undefined;
        const max = req.query.max ? Number(req.query.max) : undefined;
        const category = req.query.category?.toString();
        const ofert = req.query.ofert == "true";
        const platform = req.query.platform ? Number(req.query.platform) : undefined;

        try {
            const videogames = await prisma.videogame.findMany({
                include: { category: true },
                where: {
                    ...(min != undefined || max != undefined ? {
                        price: {
                            ...(min != undefined ? { gte: min } : {}),
                            ...(max != undefined ? { lte: max } : {})
                        }
                    } : {}),
                    ...(category ? { category: { name: category } } : {}),
                    ...(req.query.ofert != undefined ? { ofert: ofert } : {}),
                    ...(platform ? { platform: platform } : {})
                }
            });

            resp.status(200).json(videogames);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    })

    router.post("/create", async function(req: Request, resp: Response){
        const prisma = new PrismaClient()
        try {    
            const data = req.body
            if(data.name && data.description && data.stock && data.platform && data.type && data.ofert && data.price && data.rate && data.releaseDate){
                const createdVideogame = await prisma.videogame.create({
                    data: {
                        name: data.name,
                        description: data.description,
                        stock: data.stock,
                        platform: data.platform,
                        type: data.type,
                        ofert: data.ofert,
                        price: data.price,
                        rate: data.rate,
                        releaseDate: data.releaseDate,
                        categoryId: data.categoryId
                    }
                })
                resp.status(200).json(createdVideogame)
                console.log("Usuario creado")
            }else{
                resp.status(400).json("Faltan datos")
            }
        }catch(error){
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.delete("/delete_videogame/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { id } = req.params
        try {
            const videogame = await prisma.videogame.findUnique({ where: { id: Number(id) } })
            if (!videogame) {
            return resp.status(404).json({ message: "Videogame not found" })
            }
            await prisma.videogame.delete({ where: { id: Number(id) } })
            resp.status(200).json({ message: "Videogame eliminado correctamente" })
        } catch (error) {
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    return router
}

export default VideogameRoutes