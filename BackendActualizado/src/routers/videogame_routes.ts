import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const VideogameRoutes = () => {
    const router = express.Router()
    const prisma = new PrismaClient();
    
    router.get("/", async (req: Request, res: Response) => {
        try {
            const games = await prisma.game.findMany({
                where: { estado: true },
                orderBy: { id: "asc" },
                include: {
                    categoria: true,
                    plataformas: {
                        include: { platform: true },
                    },
                },
            });
            
            res.json(games);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener los juegos" });
        }
    });

    router.post("/", async (req: Request, res: Response) => {
        try {
            const {
                titulo,
                description,
                precio,
                categoriaId,
                releaseDate,
                plataformasSeleccionadas,
                descuento,
                image,
                videoURL,
                stock
            } = req.body;
            
            if (!titulo || !description || !precio || !categoriaId || !releaseDate) {
                res.status(400).json({ error: "Faltan campos obligatorios." });
                return;
            }
            
            const nuevoJuego = await prisma.game.create({
                data: {
                    titulo,
                    description,
                    precio: parseFloat(precio),
                    categoria_id: parseInt(categoriaId),
                    releaseDate: new Date(releaseDate),
                    image: image || null,
                    videoURL: videoURL || null,
                    rating: null,
                    descuento: descuento ? parseFloat(descuento) : 0,
                    esta_oferta: descuento && descuento > 0 ? true : false,
                    stock: stock ? parseInt(stock) : 100
                },
            });
            
            if (Array.isArray(plataformasSeleccionadas)) {
                for (const plataformaId of plataformasSeleccionadas) {
                    await prisma.platformOnGame.create({
                        data: {
                            gameId: nuevoJuego.id,
                            platformId: parseInt(plataformaId),
                        },
                    });
                }
            }
            
            res.status(201).json({ message: "Juego creado exitosamente", juego: nuevoJuego });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al crear el juego" });
        }
    });

    router.patch("/:id/ocultar", async (req: Request, res: Response) => {
        const { id } = req.params;
        
        try {
            const juego = await prisma.game.update({
                where: { id: parseInt(id) },
                data: { estado: false },
            });
            
            res.json({ message: "Juego ocultado correctamente", juego });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al ocultar el juego" });
        }
    });
    
    router.put("/:id", async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            titulo,
            description,
            precio,
            descuento,
            releaseDate,
            categoriaId,
            plataformasSeleccionadas,
            image,
            videoURL
        } = req.body;
        
        try {
            if (!titulo || !description || !precio || !releaseDate || !categoriaId) {
                return res.status(400).json({ error: "Faltan campos obligatorios." });
            }
            
            const juegoActualizado = await prisma.game.update({
                where: { id: parseInt(id) },
                data: {
                    titulo,
                    description,
                    precio: parseFloat(precio),
                    descuento: descuento ? parseFloat(descuento) : 0,
                    esta_oferta: descuento && descuento > 0 ? true : false,
                    releaseDate: new Date(releaseDate),
                    categoria_id: parseInt(categoriaId),
                    image: image || null,
                    videoURL: videoURL || null,
                },
            });
            
            if (Array.isArray(plataformasSeleccionadas)) {
                await prisma.platformOnGame.deleteMany({
                    where: { gameId: parseInt(id) },
                });
                
                if (plataformasSeleccionadas.length > 0) {
                    const datosPlataformas = plataformasSeleccionadas.map((platformId: number) => ({
                        gameId: parseInt(id),
                        platformId,
                    }));
                    
                    await prisma.platformOnGame.createMany({ data: datosPlataformas });
                }
            }
            
            res.status(200).json({
                message: "Juego actualizado correctamente",
                juego: juegoActualizado,
            });
        } catch (error) {
            console.error("Error al actualizar juego:", error);
            res.status(500).json({ error: "Error al actualizar juego" });
        }
    });

    return router
}

export default VideogameRoutes