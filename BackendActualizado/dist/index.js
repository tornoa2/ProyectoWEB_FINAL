"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const admin_routes_1 = __importDefault(require("./routers/admin_routes"));
const user_routes_1 = __importDefault(require("./routers/user_routes"));
const videogame_routes_1 = __importDefault(require("./routers/videogame_routes"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.get("/", (req, resp) => {
    resp.send("Hola mundo");
});
app.use("/admin", (0, admin_routes_1.default)());
app.use("/user", (0, user_routes_1.default)());
app.use("/videogame", (0, videogame_routes_1.default)());
app.listen(PORT, () => {
    console.log(`Se inicio servidor en el puerto ${PORT}`);
});
