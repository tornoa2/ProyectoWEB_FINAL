import { useState } from "react"

export default function CambioContra() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [mensaje, setMensaje] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password || !confirm) {
            setMensaje("Completa todos los campos.")
            return
        }

        if (password !== confirm) {
            setMensaje("Las contraseñas no coinciden.")
            return
        }

        try {
            const response = await fetch("http://localhost:5020/user/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, confirm }),
            })

            if (response.ok) {
                setMensaje("Contraseña cambiada correctamente.")
            } else {
                const data = await response.json()
                setMensaje(data.message || "Error al cambiar la contraseña.")
            }
        } catch (error) {
            setMensaje("Error al conectar con el servidor.")
        }
    }

    return (
        <div className="container mt-5 justify-content-center d-flex">
            <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body text-center">
                    <h3 className="card-title mb-4">Reestablecer Contraseña</h3>
                    {mensaje && (
                        <div className="alert alert-info" role="alert">
                            {mensaje}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label className="form-label">Correo Electrónico:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                            />
                            <div id="emailHelpBlock" className="form-text">
                              Debes ingresar tu correo verificado para mandarte un
                              mensaje de restauración de contraseña.
                          </div>
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label">Nueva Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 mb-2">
                            Cambiar Contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
