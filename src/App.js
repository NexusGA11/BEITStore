import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CarrinhoPage from "./CarrinhoPage";
import PedidoFinalizado from "./PedidoFinalizado";
import "./App.css";
import CarrinhoIcon from "./img/Carrinhoicon.png";
import { imagensProdutos } from "./imagens"; 

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [notificacao, setNotificacao] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });

    setNotificacao(`"${produto.nome}" adicionado ao carrinho!`);
    setTimeout(() => setNotificacao(""), 2000);
  };

  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            BE IT
          </Link>
          <Link to="/carrinho" className="carrinho-link">
            <img src={CarrinhoIcon} alt="Carrinho" className="icon-carrinho" />
            <span>({carrinho.reduce((acc, item) => acc + item.quantidade, 0)})</span>
          </Link>
        </nav>

        {notificacao && <div className="notificacao">{notificacao}</div>}

        <Routes>
          <Route
            path="/"
            element={
              <div className="produtos">
                {produtos.map((produto) => {
                  const imagemProduto = imagensProdutos[produto.nome] || produto.imagem;

                  return (
                    <div key={produto.id} className="card">
                      <img src={imagemProduto} alt={produto.nome} />
                      <h3>{produto.nome}</h3>
                      <p>R$ {produto.preco.toFixed(2)}</p>
                      <p>{produto.descricao}</p>
                      <button onClick={() => adicionarAoCarrinho(produto)}>
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  );
                })}
              </div>
            }
          />
          <Route
            path="/carrinho"
            element={<CarrinhoPage carrinho={carrinho} setCarrinho={setCarrinho} />}
          />
          <Route path="/pedido-finalizado" element={<PedidoFinalizado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
