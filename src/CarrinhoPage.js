import React from "react";
import { useNavigate } from "react-router-dom";
import { imagensProdutos } from "./imagens";
import "./CarrinhoPage.css";

function CarrinhoPage({ carrinho, setCarrinho }) {
  const navigate = useNavigate();

  const finalizarPedido = () => {
    setCarrinho([]);
    navigate("/pedido-finalizado");
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id, delta) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // === ADICIONADO: cálculo do total do carrinho ===
  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  return (
    <div className="carrinho-container">
      <h2>Seu Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item) => (
            <div key={item.id} className="item-carrinho">
              <img src={imagensProdutos[item.nome]} alt={item.nome} />
              <div className="info-produto">
                <p className="nome-produto">{item.nome}</p>
                <p>
                  Quantidade: {item.quantidade} x R$ {item.preco.toFixed(2)}
                </p>
                <div>
                  <button
                    onClick={() => alterarQuantidade(item.id, -1)}
                    className="quantidade-btn"
                  >
                    –
                  </button>
                  <button
                    onClick={() => alterarQuantidade(item.id, 1)}
                    className="quantidade-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removerDoCarrinho(item.id)}
                className="remover-btn"
              >
                Remover
              </button>
            </div>
          ))}

          {/* === ADICIONADO: mostra o total do carrinho === */}
          <div className="total-carrinho">
            <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>
          </div>

          <button onClick={finalizarPedido} className="finalizar-btn">
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default CarrinhoPage;
