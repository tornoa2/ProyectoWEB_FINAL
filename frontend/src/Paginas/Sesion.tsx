import { useState, type FormEvent } from "react"
import AuthCard from "../Componentes/Tarjeta"
import FormInput from "../Componentes/Input"
import SubmitButton from "../Componentes/Boton"
import FormTitle from "../Componentes/Titulo"
import { Link } from "react-router-dom"
import { revisarAdmin } from "../Utils/admins"
import { useNavigate } from "react-router-dom"

const IniciarSesion = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    let siExiste: null | boolean = true

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        console.log({ email, password });

        try {
            const res = await fetch("http://localhost:5020/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
            const error = await res.text();
            throw new Error(`Error del servidor: ${error}`);
            }

            // Petición para obtener los datos del usuario
            const usuarioRes = await fetch(`http://localhost:5020/user/one?email=${email}`);

            const usuario = await usuarioRes.json();

            // Guardamos datos en sesión
            sessionStorage.setItem("user", usuario.username); // Asegúrate que el backend responde con ese campo
            sessionStorage.setItem("mail", email);

            // Verificamos si es admin
            if (revisarAdmin(email, password)) {
            navigate("/games");
            } else {
            navigate("/");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales inválidas o error en el servidor.");
        }
        };

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <FormTitle
                    title="Iniciar Sesión en GameStore"
                    description="Llene los siguientes datos para ingresar:"
                />
                <FormInput
                    label="Correo Electrónico"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <FormInput
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <SubmitButton label="Ingresar" className="mx-auto p-2" />
            </form>
            {(() => {
                if (
                    !siExiste ||
                    !email.includes("@") ||
                    !email.includes(".") ||
                    password == ""
                ) {
                    return (
                        <button
                            type="button"
                            className="btn btn-danger mx-auto p-2"
                        >
                            
                        </button>
                    )
                }
            })()}

            <div className="row justify-content-around">
                <div className="col-4">
                    <Link to="/crear_cuenta" className="d-block mt-3">
                        ¿No tienes una cuenta?
                    </Link>
                </div>
                <div className="col-4">
                    <Link to="/cambio-contra" className="d-block mt-3">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </AuthCard>
    )
}

export default IniciarSesion
