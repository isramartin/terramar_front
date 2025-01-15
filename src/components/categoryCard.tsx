import React from 'react';
import '../styles/categoryCard.css';

interface Category {
    id: number;
    name: string;
    // image: string;
  }
  
  interface CategoryCardProps {
    categories: Category[];
  }
  
  const CategoryCard: React.FC<CategoryCardProps> = ({ categories }) => {
    return (
      <div className="category-card-container">
      {categories.map((category) => (
        <div key={category.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a className="text-decoration-none" href="#">
            <div className="cat-item d-flex align-items-center mb-4">
              <div className="cat-item-image">
                {/* <img src={category.image} alt={category.name} className="category-image" /> */}
              </div>
              <div className="cat-item-info">
                <h6>{category.name}</h6>
                <small className="text-body">100 Products</small>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
    );
  };

export default CategoryCard;