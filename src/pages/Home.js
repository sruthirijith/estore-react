import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Initialize hero slider when component mounts
    if (window.tns) {
      window.tns({
        container: '.hero-slider',
        slideBy: 'page',
        autoplay: true,
        autoplayButtonOutput: false,
        mouseDrag: true,
        gutter: 0,
        items: 1,
        nav: false,
        controls: true,
        controlsText: ['<i class="lni lni-chevron-left"></i>', '<i class="lni lni-chevron-right"></i>'],
      });
    }
  }, []);

  const products = [
    {
      id: 1,
      name: 'Xiaomi Mi Band 5',
      category: 'Watches',
      price: '$199.00',
      image: '/assets/images/products/product-1.jpg',
      rating: 4,
      reviews: 4.0
    },
    {
      id: 2,
      name: 'Big Power Sound Speaker',
      category: 'Speaker',
      price: '$275.00',
      originalPrice: '$300.00',
      discount: '-25%',
      image: '/assets/images/products/product-2.jpg',
      rating: 5,
      reviews: 5.0
    },
    {
      id: 3,
      name: 'WiFi Security Camera',
      category: 'Camera',
      price: '$399.00',
      image: '/assets/images/products/product-3.jpg',
      rating: 5,
      reviews: 5.0
    },
    {
      id: 4,
      name: 'iphone 6x plus',
      category: 'Phones',
      price: '$400.00',
      image: '/assets/images/products/product-4.jpg',
      rating: 5,
      reviews: 5.0,
      isNew: true
    },
    {
      id: 5,
      name: 'Wireless Headphones',
      category: 'Headphones',
      price: '$350.00',
      image: '/assets/images/products/product-5.jpg',
      rating: 5,
      reviews: 5.0
    },
    {
      id: 6,
      name: 'Mini Bluetooth Speaker',
      category: 'Speaker',
      price: '$70.00',
      image: '/assets/images/products/product-6.jpg',
      rating: 4,
      reviews: 4.0
    },
    {
      id: 7,
      name: 'PX7 Wireless Headphones',
      category: 'Headphones',
      price: '$100.00',
      originalPrice: '$200.00',
      discount: '-50%',
      image: '/assets/images/products/product-7.jpg',
      rating: 4,
      reviews: 4.0
    },
    {
      id: 8,
      name: 'Apple MacBook Air',
      category: 'Laptop',
      price: '$899.00',
      image: '/assets/images/products/product-8.jpg',
      rating: 5,
      reviews: 5.0
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i}>
          <i className={i <= rating ? 'lni lni-star-filled' : 'lni lni-star'}></i>
        </li>
      );
    }
    return stars;
  };

  return (
    <div>
      {/* Preloader */}
      <div className="preloader">
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Hero Area */}
      <section className="hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 custom-padding-right">
              <div className="slider-head">
                <div className="hero-slider">
                  <div className="single-slider" style={{ backgroundImage: 'url(/assets/images/hero/slider-bg1.jpg)' }}>
                    <div className="content">
                      <h2>
                        <span>No restocking fee ($35 savings)</span>
                        M75 Sport Watch
                      </h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.</p>
                      <h3><span>Now Only</span> $320.99</h3>
                      <div className="button">
                        <Link to="/products" className="btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="single-slider" style={{ backgroundImage: 'url(/assets/images/hero/slider-bg2.jpg)' }}>
                    <div className="content">
                      <h2>
                        <span>Big Sale Offer</span>
                        Get the Best Deal on CCTV Camera
                      </h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.</p>
                      <h3><span>Combo Only:</span> $590.00</h3>
                      <div className="button">
                        <Link to="/products" className="btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-12 md-custom-padding">
                  <div className="hero-small-banner" style={{ backgroundImage: 'url(/assets/images/hero/slider-bnr.jpg)' }}>
                    <div className="content">
                      <h2>
                        <span>New line required</span>
                        iPhone 12 Pro Max
                      </h2>
                      <h3>$259.99</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-12">
                  <div className="hero-small-banner style2">
                    <div className="content">
                      <h2>Weekly Sale!</h2>
                      <p>Saving up to 50% off all online store items this week.</p>
                      <div className="button">
                        <Link to="/products" className="btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Product Area */}
      <section className="trending-product section" style={{ marginTop: '12px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Trending Product</h2>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-lg-3 col-md-6 col-12">
                <div className="single-product">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.discount && <span className="sale-tag">{product.discount}</span>}
                    {product.isNew && <span className="new-tag">New</span>}
                    <div className="button">
                      <Link to="/product-details" className="btn">
                        <i className="lni lni-cart"></i> Add to Cart
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">{product.category}</span>
                    <h4 className="title">
                      <Link to="/product-details">{product.name}</Link>
                    </h4>
                    <ul className="review">
                      {renderStars(product.rating)}
                      <li><span>{product.reviews} Review(s)</span></li>
                    </ul>
                    <div className="price">
                      <span>{product.price}</span>
                      {product.originalPrice && (
                        <span className="discount-price">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call Action Area */}
      <section className="call-action section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <div className="inner">
                <div className="content">
                  <h2>Currently You are using free<br />
                    Lite version of ShopGrids</h2>
                  <p>Please, purchase full version of the template
                    to get all pages,<br /> features and commercial license.</p>
                  <div className="button">
                    <button className="btn" type="button">Purchase Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Area */}
      <section className="banner section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-banner" style={{ backgroundImage: "url('/assets/images/banner/banner-1-bg.jpg')" }}>
                <div className="content">
                  <h2>Smart Watch 2.0</h2>
                  <p>Space Gray Aluminum Case with <br />Black/Volt Real Sport Band </p>
                  <div className="button">
                    <Link to="/products" className="btn">View Details</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-banner custom-responsive-margin"
                style={{ backgroundImage: "url('/assets/images/banner/banner-2-bg.jpg')" }}>
                <div className="content">
                  <h2>Smart Headphone</h2>
                  <p>Lorem ipsum dolor sit amet, <br />eiusmod tempor
                    incididunt ut labore.</p>
                  <div className="button">
                    <Link to="/products" className="btn">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="shipping-info">
        <div className="container">
          <ul>
            <li>
              <div className="media-icon">
                <i className="lni lni-delivery"></i>
              </div>
              <div className="media-body">
                <h5>Free Shipping</h5>
                <span>On order over $99</span>
              </div>
            </li>
            <li>
              <div className="media-icon">
                <i className="lni lni-support"></i>
              </div>
              <div className="media-body">
                <h5>24/7 Support.</h5>
                <span>Live Chat Or Call.</span>
              </div>
            </li>
            <li>
              <div className="media-icon">
                <i className="lni lni-credit-cards"></i>
              </div>
              <div className="media-body">
                <h5>Online Payment.</h5>
                <span>Secure Payment Services.</span>
              </div>
            </li>
            <li>
              <div className="media-icon">
                <i className="lni lni-reload"></i>
              </div>
              <div className="media-body">
                <h5>Easy Return.</h5>
                <span>Hassle Free Shopping.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;