import React from 'react';
import '../styles/categoryCard.css'; // Importa el CSS personalizado

interface Category {
  id: number;
  name: string;
  image?: string; // Imagen opcional
}

interface CategoryCardProps {
  categories: Category[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categories }) => {
  return (
    <div className="container">
      <div className="row g-3 justify-content-center">
        {categories.map((category) => (
          <div key={category.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <a href="#" className="text-decoration-none">
              {/* Diseño para pantallas grandes (circular) */}
              <div className="category-circle d-none d-lg-block hover-effect">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <span>{category.name}</span>
                  </div>
                )}
                <div className="category-overlay">
                  <h6 className="category-title">{category.name}</h6>
                  <small className="category-subtitle">100 Products</small>
                </div>
              </div>

              {/* Diseño para pantallas pequeñas (mejorado) */}
              <div className="category-card-mobile d-lg-none">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image-mobile"
                  />
                ) : (
                  <div className="no-image-placeholder-mobile">
                    <span>{category.name}</span>
                  </div>
                )}
                <div className="category-info-mobile">
                  <h6 className="category-title-mobile">{category.name}</h6>
                  <small className="category-subtitle-mobile">100 Products</small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;