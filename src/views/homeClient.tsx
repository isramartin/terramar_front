import React from "react";
import { Menu } from "../components/menu";
import "../styles/global.css"; // Asegúrate de que la ruta sea correcta
import { Carousel } from "../components/Carousel";
import image1 from '../assets/image/image1.png'
import image2 from '../assets/image/image2.png'
import image3 from '../assets/image/image3.png'

export function HomeClient(): JSX.Element {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const isLoggedIn = !!user;
  
  const images = [image1, image2, image3];

  return (
    <div className="globalcontainer">
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
      <div className="content-home">
        <h1>Bienvenido a la Página Principal del Cliente</h1>
        <p>Aquí puedes ver productos y hacer pedidos.</p>
      </div>
      <Carousel images={images} />


    </div>
  );
}

export default HomeClient;
