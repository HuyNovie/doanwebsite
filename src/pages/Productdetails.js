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
  const [type, setType] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurant/menu/${productType}/${id}`
      );
      const data = await response.json();
      if (data.result) {
        setProduct(data.result);
        setType(data.result.productType);
      } else {
        console.error("Product not found with ID:", id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    if (type) {
      try {
        const response = await fetch(
          `http://localhost:8080/restaurant/menu/filter?productType=${productType}&&type=${type}`
        );
        const data = await response.json();
        if (data.result) {
          const filteredProducts = data.result.filter(
            (relatedProduct) => relatedProduct.id !== product.id
          );
          setRelatedProducts(filteredProducts);
        } else {
          console.error(
            "No related products found for productType:",
            productType
          );
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id, productType]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("jwtToken");

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
        { ...product, thumbnail: product.imageUrl, productId: product.id },
        quantity
      );
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login");
    }
  };

  const handleImageClick = (item) => {
    if (item && item.id) {
      navigate(`/menu/${productType}/${item.id}`);
    } else {
      console.error("Không tìm thấy sản phẩm hoặc sản phẩm không có ID", item);
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
        <div className="col-md-5 d-flex justify-content-center align-items-center product-image">
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
          <div>
            <strong>Đánh giá:</strong> {product.rating} /5
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
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 ? (
        <div className="related-products mt-5">
          <h3>Sản phẩm liên quan</h3>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="col-md-3 related-product-container"
                onClick={() => handleImageClick(relatedProduct)}
              >
                <img
                  src={`http://localhost:8080/restaurant/images/${relatedProduct.imageUrl}`}
                  alt={relatedProduct.name}
                  className="img-fluid"
                />
                <div className="related-product-overlay">
                  <p>{relatedProduct.name}</p>
                  <p>{formatCurrency(relatedProduct.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Không có sản phẩm liên quan</div>
      )}
    </div>
  );
};

export default ProductDetails;
