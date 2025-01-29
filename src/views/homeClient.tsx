import React from "react";
import { Menu } from "../components/menu";
import "../styles/global.css"; // Asegúrate de que la ruta sea correcta
import { Carousel } from "../components/Carousel";
import image1 from '../assets/image/image1.png'
import image2 from '../assets/image/image2.png'
import image3 from '../assets/image/image3.png'
import Datos from '../assets/mockdata/Datos.json'
import CategoryCard from "../components/categoryCard";
import Testimonials from "../components/testiminios";
import RecentProducts from "../components/productosRecientes";
import TopSellingProducts from "../components/masVendido";

export function HomeClient(): JSX.Element {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const isLoggedIn = !!user;
  const userName = user?.name || "Invitado";

  const categories = [
    { id: 1, name: 'Dama', image: image1 },
    { id: 2, name: 'Cabellero', image: image2 },
    { id: 3, name: 'Cremas', image: image3 },
    { id: 4, name: 'Capilar', image: image3 },
    { id: 5, name: 'Capilar', image: image2 },
    // Agrega más categorías según sea necesario
  ];
  
  const images = [image1, image2, image3];

  return (
    <div className="globalcontainer">
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
      {/* <div className="title-home">
        <h1>Bienvenido a la Página Principal del Cliente</h1>
        <p>Aquí puedes ver productos y hacer pedidos.</p>
      </div> */}
      
      <Carousel images={images} />

      <h1>Bienvenido, {userName}!</h1> 

      <div className="content">
      <h1>Categorias</h1>
      <CategoryCard categories={categories} />

      {/* <h1>Testimonios</h1>
      <Testimonials testimonials={Datos.testimonials} /> */}

<div>
      <h1>Productos Recientes</h1>
        <RecentProducts />
        
        </div>

        <div>
     <h1>Lo mas vendido</h1>
     <TopSellingProducts />

      </div>

      </div>

     
      {/* Pie de página */}
      <footer className="footer">
        <p>© 2024 Mi Tienda. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomeClient;
