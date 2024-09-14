import React from 'react';
import '../styles/paginador.css'; // Asegúrate de tener este archivo CSS

interface PaginadorProps {
  paginaActual: number;
  totalPaginas: number;
  onCambioPagina: (pagina: number) => void;
}

export default function Paginador({ paginaActual, totalPaginas, onCambioPagina }: PaginadorProps) {
  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : null;
  const paginaSiguiente = paginaActual < totalPaginas ? paginaActual + 1 : null;

  return (
    <nav className="paginador">
      <button
        className="paginador-button"
        onClick={() => paginaAnterior && onCambioPagina(paginaAnterior)}
        disabled={!paginaAnterior}
        aria-label={paginaAnterior ? `Ir a la página ${paginaAnterior}` : "No hay página anterior"}
      >
        &lt;
      </button>
      <div className="paginador-info">
        <span>Página</span>
        <span className="paginador-current">{paginaActual}</span>
        <span>de {totalPaginas}</span>
      </div>
      <div className="paginador-buttons">
        {paginaAnterior && (
          <button
            className="paginador-button"
            onClick={() => onCambioPagina(paginaAnterior)}
            aria-label={`Ir a la página ${paginaAnterior}`}
          >
            {paginaAnterior}
          </button>
        )}
        <button
          className="paginador-button paginador-current-button"
          aria-current="page"
        >
          {paginaActual}
        </button>
        {paginaSiguiente && (
          <button
            className="paginador-button"
            onClick={() => onCambioPagina(paginaSiguiente)}
            aria-label={`Ir a la página ${paginaSiguiente}`}
          >
            {paginaSiguiente}
          </button>
        )}
      </div>
      <button
        className="paginador-button"
        onClick={() => paginaSiguiente && onCambioPagina(paginaSiguiente)}
        disabled={!paginaSiguiente}
        aria-label={paginaSiguiente ? `Ir a la página ${paginaSiguiente}` : "No hay página siguiente"}
      >
        &gt;
      </button>
    </nav>
  );
}
