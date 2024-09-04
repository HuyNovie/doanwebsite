
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Productdetails.css";
import { useShoppingContext } from '../contexts/ShoppingContext';
import { formatCurrency } from '../helpers/common';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductDetails = () => {
    const { addCartItem } = useShoppingContext();
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await fetch('');
                const foundProduct = res.data.find(item => item.id === parseInt(id, 10));
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    console.error("Product not found with ID:", id);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    const handleAddToCart = () => {
        addCartItem(product, quantity);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const images = product.images.map(image => ({
        original: image,
        thumbnail: image
    }));

    return (
        <>
        <div className="container" style={{ padding: "5% 8%" }}>
            <div className="row">
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                    <ImageGallery 
                        items={images}
                        showFullscreenButton={true}
                        showPlayButton={false}
                    />
                </div>
                <div className="col-md-7">
                    <h2 className='text-color'><strong>{product.name}</strong></h2>
                    <h5><strong>Giá:</strong><strong className='text-danger px-2 '>{formatCurrency(product.price)}</strong></h5>
                    <hr />
                    <div><strong>Mô tả:</strong> {product.description}</div>
                    
                    {/* Quantity controls */}
                    <div className="quantity-controls my-3">
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
                        <span className="px-3">{quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(1)}>+</button>
                    </div>

                    <button className="btn btn-success" onClick={handleAddToCart}>Đặt hàng</button>     
                </div>
            </div>
        </div>
        <div>
            Sản phẩm liên quan
        </div>
        </>
        
    );
};

export default ProductDetails;
