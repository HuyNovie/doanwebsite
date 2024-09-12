import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import api from '../api/axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(''); // 'dish' or 'drinks'
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/menu/get-all`);
        setProducts(response.data.result);
      } catch (error) {
        setError('Lỗi khi lấy sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = (type, product) => {
    setFormType(type);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${formType}/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError('Lỗi khi xóa sản phẩm.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (currentProduct) {
        // Cập nhật sản phẩm
        await api.put(`/${formType}/${currentProduct.id}`, formData);
      } else {
        // Thêm sản phẩm mới
        await api.post(`/${formType}/create`, formData);
      }
      handleModalClose();
      const response = await api.get(`/menu/get-all`);
      setProducts(response.data.result);
    } catch (error) {
      setError('Lỗi khi lưu sản phẩm.');
    }
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Quản lý Sản Phẩm</h1>
      <Button variant="primary" className="mb-3" onClick={() => handleModalShow('dish', null)}>Thêm Sản Phẩm Dish</Button>
      <Button variant="primary" className="mb-3" onClick={() => handleModalShow('drinks', null)}>Thêm Sản Phẩm Drinks</Button>
      <Row>
        {products.map(product => (
          <Col md={4} key={product.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={`http://localhost:8080/restaurant/images/${product.imageUrl}`} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Giá: {product.price.toFixed(2)} VND</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="info" onClick={() => handleModalShow(product.type, product)}>Sửa</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(product.id)}>Xóa</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control type="text" name="name" defaultValue={currentProduct?.name || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control type="number" step="0.01" name="price" defaultValue={currentProduct?.price || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nguyên Liệu</Form.Label>
              <Form.Control type="text" name="ingredients" defaultValue={currentProduct?.ingredients || ''} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control type="text" name="description" defaultValue={currentProduct?.description || ''} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control as="select" name="type" defaultValue={currentProduct?.type || 'dish'}>
                <option value="dish">Dish</option>
                <option value="drinks">Drinks</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentProduct ? 'Cập Nhật' : 'Thêm'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
