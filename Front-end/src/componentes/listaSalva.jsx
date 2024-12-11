import { useEffect, useState, useCallback } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getMateriais, deleteMaterial, updateMaterial } from "../componentes/js/api.js";


function ListaSalva() {
  const [items, setItems] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ item: "", quantidade: "", valor: "" });
  const [termo, setTermo] = useState('');

  const carregarMateriais = useCallback(async () => {
    try {
      const response = await getMateriais(termo || ''); 
      setItems(response.data.data); 
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  }, [termo]);

  
  useEffect(() => {
    carregarMateriais();
  }, [carregarMateriais]);

 
  const handleDelete = async (id) => {
    if (window.confirm("Você tem certeza que deseja excluir este item?")) {
      try {
        await deleteMaterial(id);
        carregarMateriais();
      } catch (error) {
        console.error("Erro ao excluir material:", error);
      }
    }
  };

  
  const handleAlterar = (item) => {
    setEditando(item.id);
    setFormData({ item: item.item, quantidade: item.quantidade, valor: item.valor });
  };

  
  const handleSaveAlteracao = async () => {
    try {
      await updateMaterial(editando, formData);
      setEditando(null);
      carregarMateriais();
    } catch (error) {
      console.error("Erro ao alterar material:", error);
    }
  };

  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h2>Lista de Materiais</h2>
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar material"
        className="mb-3 form-control"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((itemObj, index) => (
            <tr key={itemObj.id}>
              <td>{index + 1}</td>
              <td>{itemObj.item}</td>
              <td>{itemObj.quantidade}</td>
              <td>{itemObj.valor}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(itemObj.id)} className="me-2">
                  Excluir
                </Button>
                <Button variant="warning" onClick={() => handleAlterar(itemObj)}>
                  Alterar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={editando !== null} onHide={() => setEditando(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                name="item"
                value={formData.item}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor Unitário</Form.Label>
              <Form.Control
                type="text"
                name="valor"
                value={formData.valor}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditando(null)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveAlteracao}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListaSalva;
