import React from 'react';
import '../styles/breadCrumb.css';

interface BreadCrumbProps {
  paths: { label: string; url?: string }[];
  current: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ paths, current }) => {
  return (
    <nav className="breadcrumb-container">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {path.url ? (
            <a href={path.url} className="breadcrumb-link">
              {path.label}
            </a>
          ) : (
            <span className="breadcrumb-current">{path.label}</span>
          )}
          {index < paths.length - 1 && <span className="breadcrumb-separator"> &lt; </span>}
        </React.Fragment>
      ))}
      <span className="breadcrumb-current">{current}</span>
    </nav>
  );
};

export default BreadCrumb;
