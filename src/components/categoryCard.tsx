import React from 'react';
import '../styles/categoryCard.css';

interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  interface CategoryCardProps {
    categories: Category[];
  }
  
  const CategoryCard: React.FC<CategoryCardProps> = ({ categories }) => {
    return (
      <div className="category-card-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-title">{category.name}</div>
          </div>
        ))}
      </div>
    );
  };

export default CategoryCard;