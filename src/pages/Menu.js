import React, { useState, useEffect, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Carousel,
  Button,
  Dropdown,
} from "react-bootstrap";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "use-debounce";
import fiveStar from "../assets/rating/5sao.png";
import fourStar from "../assets/rating/4sao.png";
import threeStar from "../assets/rating/3sao.png";
import twoStar from "../assets/rating/2sao.png";
import oneStar from "../assets/rating/1sao.png";
import {
  faCameraRetro,
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import bannerOpenTime from "../assets/Banner/openTime.png";
import bannerBooking from "../assets/Banner/booking.png";
import bannerShip from "../assets/Banner/ship.png";
import pic1 from "../assets/Banner/kimchi2.jpeg";
import pic2 from "../assets/Banner/samgyeopsal2.jpeg";
import pic3 from "../assets/Banner/soondae2.jpeg";

const top3Pic = [
  { id: 1, text: "kimchi", icon: pic1 },
  { id: 2, text: "samgyeopsal", icon: pic2 },
  { id: 3, text: "soondae", icon: pic3 },
];
const Banner = [
  {
    id: 1,
    text: "Thời gian hoạt động",
    title: "Banner thời gian hoạt động",
    icon: bannerOpenTime,
  },
  { id: 2, text: "Đặt chỗ", title: "Banner booking", icon: bannerBooking },
  { id: 3, text: "Giao hàng", title: "Banner giao hàng", icon: bannerShip },
];

const Menu = () => {
  const navigate = useNavigate();
  const [listType, setListType] = useState([
    { id: 1, title: "Tất cả", name: "all", values: 0 },
    { id: 2, title: "Ẩm thực hàn", name: "dish", values: 0 },
    { id: 3, title: "Đồ uống", name: "drinks", values: 0 },
  ]);

  const [listRating, setListRating] = useState([
    { id: 5, title: "5 sao", icon: fiveStar, values: 0 },
    { id: 4, title: "4 sao", icon: fourStar, values: 0 },
    { id: 3, title: "3 sao", icon: threeStar, values: 0 },
    { id: 2, title: "2 sao", icon: twoStar, values: 0 },
    { id: 1, title: "1 sao", icon: oneStar, values: 0 },
  ]);

  const [listDescription, setListDescription] = useState([
    { id: 1, title: "Thịt", values: 0 },
    { id: 2, title: "Canh", values: 0 },
    { id: 3, title: "Món phụ", values: 0 },
    { id: 4, title: "Xào", values: 0 },
    { id: 5, title: "Trộn", values: 0 },
    { id: 6, title: "Hải sản", values: 0 },
    { id: 7, title: "Cơm", values: 0 },
    { id: 8, title: "Nước", values: 0 },
    { id: 9, title: "Cà phê", values: 0 },
    { id: 10, title: "Rượu", values: 0 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(
    searchTerm,
    500
  );
  const [products, setProducts] = useState([]);
  const [selectedNameValue, setSelectedNameValue] = useState(1);
  const [selectedRatingValue, setSelectedRatingValue] = useState(null);
  const [selectedDescriptionValue, setSelectedDescriptionValue] =
    useState(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const typeLookup = useMemo(
    () =>
      listType.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {}),
    [listType]
  );

  const ratingLookup = useMemo(
    () => listRating.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    [listRating]
  );

  const descriptionLookup = useMemo(
    () =>
      listDescription.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.title }),
        {}
      ),
    [listDescription]
  );

  const [loading, setLoading] = useState(false);

  const getCurrentTypeName = useMemo(
    () => typeLookup[selectedNameValue] || "all",
    [typeLookup, selectedNameValue]
  );

  const getCurrentRating = useMemo(() => {
    const rating = ratingLookup[selectedRatingValue];
    if (rating) {
      return { minRating: rating.id, maxRating: rating.id + 0.9 };
    }
    return { minRating: 0, maxRating: 5 };
  }, [ratingLookup, selectedRatingValue]);

  const loadProduct = useCallback(
    async (initialLoad = false) => {
      try {
        setLoading(true);
        const { minRating, maxRating } = getCurrentRating;
        const params = new URLSearchParams();
        const currentType = getCurrentTypeName;

        if (currentType !== "all") {
          params.append("productType", currentType);
        }
        if (selectedDescriptionValue) {
          params.append(
            "description",
            descriptionLookup[selectedDescriptionValue]
          );
        }
        if (minRating !== undefined && maxRating !== undefined) {
          params.append("minRating", minRating);
          params.append("maxRating", maxRating);
        }

        const response = await fetch(
          `http://localhost:8080/restaurant/menu/filter?${params.toString()}`
        );
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setProducts(data.result);
          if (initialLoad) {
            updateCounts(data.result);
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [
      getCurrentTypeName,
      getCurrentRating,
      descriptionLookup,
      selectedDescriptionValue,
    ]
  );

  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurant/menu/search?keyword=${debouncedSearchTerm}`
      );
      const data = await response.json();
      if (data.result) {
        setProducts(data.result);
        updateCounts(data.result);
      } else {
        setProducts([]);
        updateCounts([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [debouncedSearchTerm]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setDebouncedSearchTerm(searchTerm);
      fetchSearchResults();
    }
  };

  const updateCounts = (result) => {
    setListType((prevListType) =>
      prevListType.map((type) => ({
        ...type,
        values:
          type.name === "all"
            ? result.length
            : result.filter((product) => product.type === type.name).length,
      }))
    );

    setListRating((prevListRating) =>
      prevListRating.map((rating) => ({
        ...rating,
        values: result.filter(
          (product) => Math.floor(product.rating) === rating.id
        ).length,
      }))
    );

    setListDescription((prevListDescription) =>
      prevListDescription.map((description) => ({
        ...description,
        values: result.filter((product) =>
          product.description
            .toLowerCase()
            .includes(description.title.toLowerCase())
        ).length,
      }))
    );
  };

  const resetSelections = () => {
    setSelectedNameValue(1);
    setSelectedRatingValue(null);
    setSelectedDescriptionValue(null);
    setSearchTerm("");
    loadProduct(true);
  };

  useEffect(() => {
    if (!initialLoadDone) {
      loadProduct(true);
      setInitialLoadDone(true);
    } else if (debouncedSearchTerm.length > 0) {
      fetchSearchResults();
    } else {
      loadProduct();
    }
  }, [
    debouncedSearchTerm,
    selectedNameValue,
    selectedRatingValue,
    selectedDescriptionValue,
    fetchSearchResults,
    loadProduct,
    initialLoadDone,
  ]);

  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (key, ascending) => {
    if (key === null) {
      setSortOrder(null);
      return;
    }

    const sortedProducts = [...products].sort((a, b) => {
      if (ascending) {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });

    setProducts(sortedProducts);
    setSortOrder({ key, ascending });
  };
  const handleCardClick = (id, productType) => {
    navigate(`/menu/${productType}/${id}`);
};

  return (
    <Container fluid className="mt-4">
      <Row className="center-container">
        <Col className="content" xs={12} md={8}>
          <div>
            <Carousel data-bs-theme="dark" slide touch="true">
              {Banner.map((banner) => (
                <Carousel.Item key={banner.id}>
                  <img
                    src={banner.icon}
                    alt={banner.title}
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "cover",
                      margin: "auto",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>
        <Col md={4} className="content xs-none">
          <div>
            {top3Pic.map((list) => (
              <div key={list.id}>
                <img
                  src={list.icon}
                  alt={list.text}
                  style={{
                    width: "100%",
                    maxWidth: "480px",
                    height: "160px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className=" mt-2">
        <Col xs={12} md={2} className="xs-none">
          <div className="radio-md">
            {/* list type  */}
            <div className="radio-input">
              {listType.map((type) => (
                <label key={type.id} className="label">
                  <input
                    type="radio"
                    name="type"
                    value={type.id}
                    checked={selectedNameValue === type.id}
                    onChange={(e) =>
                      setSelectedNameValue(parseInt(e.target.value, 10))
                    }
                  />
                  <span className="text">{type.title}</span>
                  <span className="count">({type.values})</span>
                </label>
              ))}
            </div>
            <hr className="hr-md" />
            {/* list rating */}
            <div className="radio-input">
              {listRating.map((rating) => (
                <label key={rating.id} className="label">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.id}
                    checked={selectedRatingValue === rating.id}
                    onChange={(e) =>
                      setSelectedRatingValue(parseInt(e.target.value, 10))
                    }
                  />
                  <img
                    src={rating.icon}
                    alt={`${rating.title} icon`}
                    style={{
                      width: "55px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <span className="count">({rating.values})</span>
                </label>
              ))}
            </div>
            <hr className="hr-md" />
            <div className="radio-input">
              {listDescription.map((description) => (
                <label key={description.id} className="label">
                  <input
                    type="radio"
                    name="description"
                    value={description.id}
                    checked={selectedDescriptionValue === description.id}
                    onChange={(e) =>
                      setSelectedDescriptionValue(parseInt(e.target.value, 10))
                    }
                  />
                  <span className="text">{description.title}</span>
                  <span className="count">({description.values})</span>
                </label>
              ))}
            </div>
          </div>
          {/* button reset */}
          <div className="center mt-1">
            <button
              className="btn btn-primary"
              onClick={() => resetSelections()}
            >
              Reset
            </button>
          </div>
        </Col>
        <Col className="content" xs={12} md={8}>
          {/* search */}
          <Row>
            <Col xs={12} md={10}>
              <div className="search search-bar">
                <button className="search__button">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                  type="text"
                  className="search__input"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button className="mic__button">
                  <FontAwesomeIcon icon={faMicrophone} />
                </button>
                <button className="picture__button">
                  <FontAwesomeIcon icon={faCameraRetro} />
                </button>
              </div>
              {searchTerm && products.length > 0 && (
                <ListGroup className="search-results">
                  {products.map((result, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => setSearchTerm(result.name)}
                    >
                      {result.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            {/* sapxep */}
            <Col xs={12} md={2}>
              <div className="mt-2 center">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Sắp xếp:
                    <span className="sort-info">
                      {sortOrder
                        ? sortOrder.key === "price"
                          ? sortOrder.ascending
                            ? " Giá: tăng dần"
                            : " Giá: giảm dần"
                          : sortOrder.ascending
                          ? " Đánh giá: tăng dần"
                          : " Đánh giá: giảm dần"
                        : " Không"}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSort(null, null)}>
                      Không sắp xếp
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("price", true)}>
                      Giá: tăng dần &#9650;
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("price", false)}>
                      Giá: giảm dần &#9660;
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("rating", true)}>
                      Đánh giá: tăng dần &#9650;
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("rating", false)}>
                      Đánh giá: giảm dần &#9660;
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
          {/* loader */}
          <Row className="center mt-3">
            {loading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Row>
          {/* list product */}
          <Row>
            {(products || []).map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} className="center">
                <Card className="card mb-4" onClick={() => handleCardClick(product.id, product.type)} style={{ cursor: 'pointer' }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/restaurant/images/${product.imageUrl}`}
                    alt={product.name}
                    className="card-img"
                  />
                  <Card.Body className="card-info">
                    <Card.Title className="text-title">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="text-body">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="text-body">
                      {product.ingredients}
                    </Card.Text>
                    <Card.Text>Đánh giá: {product.rating}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="card-footer">
                    {" "}
                    <span className="text-title">${product.price}</span>
                    <Button variant="outline-primary" className="card-button">
                      {" "}
                      <svg
                        className="svg-icon"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                      >
                        <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                        <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                        <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                      </svg>
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <hr></hr>
    </Container>
  );
};

export default Menu;
