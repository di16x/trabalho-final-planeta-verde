import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { addMaterial } from "../componentes/js/api.js";

function SalvarMaterial() {
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");
  const [erroItem, setErroItem] = useState(""); 
  const navigate = useNavigate();

  const handleItemChange = (e) => {
    const valor = e.target.value;
    if (/[0-9]/.test(valor)) {
      setErroItem("Coloque apenas letras");
    } else {
      setErroItem("");
    }
    setItem(valor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (/[0-9]/.test(item)) {
      setErroItem("Coloque apenas letras");
      return;
    }

    if (!item || !quantidade || !valor) {
      setErroItem("Todos os campos com * são obrigatórios!");
      return;
    }

    if (quantidade <= 0) {
      setErroItem("A quantidade deve ser maior que zero!");
      return;
    }

    if (valor <= 0) {
      setErroItem("O valor deve ser maior que zero!");
      return;
    }

    try {
      const newItem = { item, quantidade, valor };
      await addMaterial(newItem);
      setItem("");
      setQuantidade("");
      setValor("");
      setErro("");
      setErroItem(""); // Remove o erro do item após o envio bem-sucedido
      navigate("/listar");
    } catch (error) {
      console.error("Erro ao salvar material:", error);
      setErro("Erro ao salvar o material.");
    }
  };

  return (
    <>
      <h2>Gerenciar Materiais</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="salvarMaterial">
          <Form.Label>Material*</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex: Vassoura"
            value={item}
            onChange={handleItemChange}
            className={erroItem ? "is-invalid" : ""}
          />
          {erroItem && <div className="invalid-feedback">{erroItem}</div>}
        </Form.Group>
        
        <Form.Group controlId="salvarMaterial">
          <Form.Label>Quantidade*</Form.Label>
          <Form.Control
            mask="R$ 99,99" 
            type="number"
            placeholder="Digite a quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group controlId="salvarMaterial">
          <Form.Label>Valor Unitário*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o valor unitário"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step={"0.01"}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3">
          Adicionar
        </Button>
      </Form>
    </>
  );
}

export default SalvarMaterial;
