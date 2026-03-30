/**
 * COMPONENTE: Header
 * 
 * Muestra el título y la descripción de la plataforma financiera.
 */

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      
      {/* Título de la plataforma financiera */}
      <h1>🏦 Plataforma Financiera Integral</h1>

      {/* Descripción de la plataforma */}
      <p>Gestiona clientes, cuentas, transacciones y productos financieros</p>

    </header>
  );
};

// export default Header; // Se mantiene la exportación comentada según requerimiento