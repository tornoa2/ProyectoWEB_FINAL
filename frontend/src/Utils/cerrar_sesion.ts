export const cerrarSesion = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("mail");
};