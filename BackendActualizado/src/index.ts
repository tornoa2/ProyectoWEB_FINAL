import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import AdminRoutes from "./routers/admin_routes"
import UserRoutes from "./routers/user_routes"
import VideogameRoutes from "./routers/videogame_routes"

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req: Request, resp: Response) => {
    resp.send("Hola mundo")
})

app.use("/admin", AdminRoutes())
app.use("/user", UserRoutes())
app.use("/videogame", VideogameRoutes())

app.listen(PORT, () => {
    console.log(`Se inicio servidor en el puerto ${PORT}`)
})