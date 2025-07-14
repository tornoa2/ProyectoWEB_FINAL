"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const VideogameRoutes = () => {
    const router = express_1.default.Router();
    router.get("/all", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        try {
            const videogames = yield prisma.videogame.findMany();
            resp.status(200).json(videogames);
        }
        catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    }));
    router.get("/videogame", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const prisma = new prisma_1.PrismaClient();
        const min = req.query.min ? Number(req.query.min) : undefined;
        const max = req.query.max ? Number(req.query.max) : undefined;
        const category = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString();
        const ofert = req.query.ofert == "true";
        const platform = req.query.platform ? Number(req.query.platform) : undefined;
        try {
            const videogames = yield prisma.videogame.findMany({
                include: { category: true },
                where: Object.assign(Object.assign(Object.assign(Object.assign({}, (min != undefined || max != undefined ? {
                    price: Object.assign(Object.assign({}, (min != undefined ? { gte: min } : {})), (max != undefined ? { lte: max } : {}))
                } : {})), (category ? { category: { name: category } } : {})), (req.query.ofert != undefined ? { ofert: ofert } : {})), (platform ? { platform: platform } : {}))
            });
            resp.status(200).json(videogames);
        }
        catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    }));
    router.post("/create", function (req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new prisma_1.PrismaClient();
            try {
                const data = req.body;
                if (data.name && data.description && data.stock && data.platform && data.type && data.ofert && data.price && data.rate && data.releaseDate) {
                    const createdVideogame = yield prisma.videogame.create({
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
                    });
                    resp.status(200).json(createdVideogame);
                    console.log("Usuario creado");
                }
                else {
                    resp.status(400).json("Faltan datos");
                }
            }
            catch (error) {
                resp.status(500).json({ message: "Error en la BD", error: error });
            }
        });
    });
    router.delete("/delete_videogame/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { id } = req.params;
        try {
            const videogame = yield prisma.videogame.findUnique({ where: { id: Number(id) } });
            if (!videogame) {
                return resp.status(404).json({ message: "Videogame not found" });
            }
            yield prisma.videogame.delete({ where: { id: Number(id) } });
            resp.status(200).json({ message: "Videogame eliminado correctamente" });
        }
        catch (error) {
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    }));
    return router;
};
exports.default = VideogameRoutes;
