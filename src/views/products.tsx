import React, { useEffect, useState } from 'react';
import { products } from '../assets/mockdata/Datos.json'; // Importa los datos mock


// types.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
function Products() {
    const [productList, setProductList] = useState<Product[]>([]);
  
    useEffect(() => {
      // Cargar productos desde los datos mock
      setProductList(products);
    }, []);
  
    return (
      <div>
        <h1>Productos</h1>
        <ul>
          {productList.map(product => (
            <li key={product.id}>{product.name} - ${product.price}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Products;
