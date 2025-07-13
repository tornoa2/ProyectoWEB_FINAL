import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const CategoryRoutes = () => {
  const router = express.Router();
  const prisma = new PrismaClient();

  // GET /categories
  router.get("/", async (req: Request, res: Response) => {
    try {
      const categorias = await prisma.category.findMany();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las categorías" });
    }
  });

  return router;
};

export default CategoryRoutes;
