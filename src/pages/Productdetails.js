import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Productdetails.css";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import ImageGallery from "react-image-gallery";
import { jwtDecode } from "jwt-decode";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetails = () => {
  const { addCartItem } = useShoppingContext();
  const { id, productType } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/restaurant/menu/${productType}/${id}`
        );
        const data = await response.json();
        if (data.result) {
          setProduct(data.result);
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
  }, [id, productType]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId || decodedToken.sub;

      if (!userId) {
        console.error("User ID not found in token");
        navigate("/login");
        return;
      }

      addCartItem(
        { ...product, thumbnail: product.imageUrl, userId },
        quantity
      );
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const imagesArray =
    typeof product.images === "string"
      ? JSON.parse(product.images)
      : product.images;

  const images = [
    {
      original: `http://localhost:8080/restaurant/images/${product.imageUrl}`,
      thumbnail: `http://localhost:8080/restaurant/images/${product.imageUrl}`,
    },
    ...imagesArray.map((image) => ({
      original: `http://localhost:8080/restaurant/images/${image}`,
      thumbnail: `http://localhost:8080/restaurant/images/${image}`,
    })),
  ];

  return (
    <div className="container" style={{ padding: "5% 8%" }}>
      <div className="row">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          {images.length > 0 ? (
            <ImageGallery
              items={images}
              showFullscreenButton={true}
              showPlayButton={false}
              showBullets={true}
              showNav={true}
              slideDuration={300}
              slideInterval={5000}
              thumbnailPosition="bottom"
              lazyLoad={true}
              slideOnThumbnailHover={true}
              useBrowserFullscreen={false}
              additionalClass="custom-image-gallery"
            />
          ) : (
            <div>No images available</div>
          )}
        </div>
        <div className="col-md-7">
          <h2 className="text-color">
            <strong>{product.name}</strong>
          </h2>
          <h5>
            <strong>Giá:</strong>
            <strong className="text-danger px-2">
              {formatCurrency(product.price)}
            </strong>
          </h5>
          <hr />
          <div>
            <strong>Mô tả:</strong> {product.description}
          </div>
          <div>
            <strong>Thành phần:</strong> {product.ingredients}
          </div>
          <div className="quantity-controls my-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Đặt hàng
          </button>
        </div>
      </div>
      <div>Sản phẩm liên quan</div>
    </div>
  );
};

export default ProductDetails;
