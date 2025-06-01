import React from "react";
import { Link } from "react-router-dom";

function PedidoFinalizado() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Pedido Finalizado!</h1>
      <p>Obrigado pela preferência.</p>
      <Link to="/" style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}>
        Voltar para a loja
      </Link>
    </div>
  );
}

export default PedidoFinalizado;
