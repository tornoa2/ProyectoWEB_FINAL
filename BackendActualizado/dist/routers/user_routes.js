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
const UserRoutes = () => {
    const router = express_1.default.Router();
    router.get("/all", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        try {
            const usuarios = yield prisma.videogame.findMany();
            resp.status(200).json(usuarios);
        }
        catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    }));
    router.post("/login", function (req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new prisma_1.PrismaClient();
            try {
                const data = req.body;
                if (data.email && data.password) {
                    const usuarioEncontrado = yield prisma.usuario.findUnique({
                        where: {
                            email: data.email,
                            password: data.password,
                        }
                    });
                    if (!usuarioEncontrado) {
                        resp.status(404).json("Usuario no encontrado");
                        return;
                    }
                    resp.status(200).json(usuarioEncontrado);
                    console.log("Login realizado con éxito");
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
    router.post("/register", function (req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new prisma_1.PrismaClient();
            try {
                const data = req.body;
                if (data.username && data.password && data.email) {
                    const usuarioCreado = yield prisma.usuario.create({
                        data: {
                            username: data.username,
                            email: data.email,
                            password: data.password,
                        }
                    });
                    resp.status(200).json(usuarioCreado);
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
    router.post("/change-password", function (req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new prisma_1.PrismaClient();
            try {
                const { email, password, confirm } = req.body;
                if (email && password && confirm) {
                    const usuario = yield prisma.usuario.update({
                        where: { email },
                        data: {
                            email: email,
                            password: password
                        }
                    });
                    if (!usuario) {
                        resp.status(404).json("Usuario no encontrado");
                        return;
                    }
                    resp.status(200).json(usuario);
                    console.log("Contraseña modificada");
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
    router.delete("/delete/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { id } = req.params;
        try {
            const user = yield prisma.usuario.findUnique({
                where: { id: Number(id) }
            });
            if (!user) {
                return resp.status(404).json({ message: "Usuario no encontrado" });
            }
            yield prisma.usuario.delete({
                where: {
                    id: Number(id)
                }
            });
            resp.status(200).json({ message: "Usuario eliminado correctamente" });
        }
        catch (error) {
            resp.status(500).json({ message: "Error en la BD", error: error });
        }
    }));
    return router;
};
exports.default = UserRoutes;
