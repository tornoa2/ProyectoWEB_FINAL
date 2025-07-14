import "../Estilos/carousel.css";

export default function Carousel() {
  return (
    <div className="container">
      <div
        id="carouselSection"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselSection"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselSection"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselSection"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="assests/carrusel/eldenring.jpg"
              className="d-block w-100"
              style={{ height: "650px", objectFit: "contain" }}
              alt="Titanfall"
            />
          </div>
          <div className="carousel-item">
            <img
              src="assests/carrusel/readdead2.jpg"
              className="d-block w-100"
              style={{ height: "650px", objectFit: "contain" }}
              alt="Infinity Blade"
            />
          </div>
          <div className="carousel-item">
            <img
              src="assests/carrusel/cyber.jpg"
              className="d-block w-100"
              style={{ height: "650px", objectFit: "contain" }}
              alt="Ironsight"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselSection"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previo</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselSection"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}
