import React from 'react';
import '../styles/testimonial.css';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  comment: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="testimonials-container">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="testimonial-image"
          />
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-comment">{testimonial.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
