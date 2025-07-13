import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const UserRoutes = () => {
    const router = express.Router()

    router.get("/all", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        try {
            const usuarios = await prisma.videogame.findMany()
            resp.status(200).json(usuarios)
        }catch(error) {
            console.error(error)
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.post("/login", async function(req: Request, resp: Response){
        const prisma = new PrismaClient()
        try {    
            const data = req.body
            if(data.email && data.password){
                const usuarioEncontrado = await prisma.usuario.findUnique({
                    where: {
                        email: data.email,
                        password: data.password,
                    }
                })
                if (!usuarioEncontrado) {
                    resp.status(404).json("Usuario no encontrado")
                    return
                }
                resp.status(200).json(usuarioEncontrado)
                console.log("Login realizado con éxito")
            }else{
                resp.status(400).json("Faltan datos")
            }
        }catch(error){
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.post("/register", async function(req: Request, resp: Response){
        const prisma = new PrismaClient()
        try {    
            const data = req.body
            if(data.username && data.password && data.email){
                const usuarioCreado = await prisma.usuario.create({
                    data: {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    }
                })
                resp.status(200).json(usuarioCreado)
                console.log("Usuario creado")
            }else{
                resp.status(400).json("Faltan datos")
            }
        }catch(error){
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.post("/change-password", async function(req: Request, resp: Response){
        const prisma = new PrismaClient()
        try {
            const {email, password, confirm} = req.body
            if(email && password && confirm){
                const usuario = await prisma.usuario.update({
                    where: { email },
                    data: {
                        email: email,
                        password: password
                    }
                })
                if (!usuario) {
                    resp.status(404).json("Usuario no encontrado")
                    return
                }
                resp.status(200).json(usuario)
                console.log("Contraseña modificada")
            }else{
                resp.status(400).json("Faltan datos")
            }
        }catch(error){
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    router.delete("/delete/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { id } = req.params
        try {
            const user = await prisma.usuario.findUnique({
                where: { id : Number(id) }
            })
            if (!user) {
            return resp.status(404).json({ message: "Usuario no encontrado" })
            }
            await prisma.usuario.delete({
                where: {
                    id: Number(id)
                }
            })
            resp.status(200).json({ message: "Usuario eliminado correctamente" })
        } catch (error) {
            resp.status(500).json({ message: "Error en la BD", error: error })
        }
    })

    return router
}

export default UserRoutes