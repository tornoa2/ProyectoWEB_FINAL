import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const PlatformRoutes = () => {
  const router = express.Router();
  const prisma = new PrismaClient();

  // GET /platforms
  router.get("/", async (req: Request, res: Response) => {
    try {
      const plataformas = await prisma.platform.findMany();
      res.json(plataformas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las plataformas" });
    }
  });

  return router;
};

export default PlatformRoutes;
