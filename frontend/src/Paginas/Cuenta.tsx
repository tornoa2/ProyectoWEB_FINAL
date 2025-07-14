import { useState, type FormEvent } from "react";
import AuthCard from "../Componentes/Tarjeta";
import FormInput from "../Componentes/Input";
import SubmitButton from "../Componentes/Boton";
import FormTitle from "../Componentes/Titulo";
import { Link, useNavigate } from "react-router-dom";


const CrearCuenta = () => {
  const [username, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
   
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    console.log({ username, email, password });
    
    const res = await fetch("http://localhost:5020/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error del servidor: ${error}`);
    }

    const data = await res.json();
    console.log("Usuario creado:", data);

    sessionStorage.setItem("user", username);
    navigate("/")
    
  };


  return (
    <AuthCard>
     
      <form onSubmit={handleSubmit}>
        <FormTitle
          title="Crear Cuenta en GameStore"
          description="Llene los siguientes datos para crear una cuenta:"
        />
        <FormInput
          label="Nombre"
          type="text"
          id="nombre"
          value={username}
          onChange={(e) => setNombre(e.currentTarget.value)}
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
        <SubmitButton label="Crear" className="mx-auto p-2" />
      </form>
      {(() => {
        if (username == "" || !email.includes("@") || !email.includes(".") || password == "") {
          return (
            <button type="button" className="btn btn-danger mx-auto p-2">
              
            </button>
          );
        }
      })()}
      
      <Link to="/iniciar_sesion" className="d-block mt-3">
        ¿Ya tienes una cuenta?
      </Link>
    </AuthCard>
  );
};

export default CrearCuenta;