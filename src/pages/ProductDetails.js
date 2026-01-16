import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const [currentImage, setCurrentImage] = useState('/assets/images/product-details/01.jpg');
  const images = [
    '/assets/images/product-details/01.jpg',
    '/assets/images/product-details/02.jpg',
    '/assets/images/product-details/03.jpg',
    '/assets/images/product-details/04.jpg',
    '/assets/images/product-details/05.jpg'
  ];

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Single Product</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                <li><Link to="/">Shop</Link></li>
                <li>Single Product</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details */}
      <section className="item-details section">
        <div className="container">
          <div className="top-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-images">
                  <main id="gallery">
                    <div className="main-img">
                      <img src={currentImage} id="current" alt="Product" />
                    </div>
                    <div className="images">
                      {images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          className="img"
                          alt={`Product ${index + 1}`}
                          onClick={() => setCurrentImage(img)}
                          style={{
                            opacity: currentImage === img ? 0.6 : 1,
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h2 className="title">GoPro Karma Camera Drone</h2>
                  <p className="category">
                    <i className="lni lni-tag"></i> Drones:
                    <a href="#" onClick={(e) => e.preventDefault()}>Action cameras</a>
                  </p>
                  <h3 className="price">$850<span>$945</span></h3>
                  <p className="info-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group color-option">
                        <label className="title-label" htmlFor="size">Choose color</label>
                        <div className="single-checkbox checkbox-style-1">
                          <input type="checkbox" id="checkbox-1" defaultChecked />
                          <label htmlFor="checkbox-1"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-2">
                          <input type="checkbox" id="checkbox-2" />
                          <label htmlFor="checkbox-2"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-3">
                          <input type="checkbox" id="checkbox-3" />
                          <label htmlFor="checkbox-3"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-4">
                          <input type="checkbox" id="checkbox-4" />
                          <label htmlFor="checkbox-4"><span></span></label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group">
                        <label htmlFor="color">Battery capacity</label>
                        <select className="form-control" id="color">
                          <option>5100 mAh</option>
                          <option>6200 mAh</option>
                          <option>8000 mAh</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group quantity">
                        <label htmlFor="quantity">Quantity</label>
                        <select className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-content">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="button cart-button">
                          <button className="btn" style={{ width: '100%' }}>Add to Cart</button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button className="btn"><i className="lni lni-reload"></i> Compare</button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button className="btn"><i className="lni lni-heart"></i> To Wishlist</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-details-info">
            <div className="single-block">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="info-body custom-responsive-margin">
                    <h4>Details</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                    </p>
                    <h4>Features</h4>
                    <ul className="features">
                      <li>Capture 4K30 Video and 12MP Photos</li>
                      <li>Game-Style Controller with Touchscreen</li>
                      <li>View Live Camera Feed</li>
                      <li>Full Control of HERO6 Black</li>
                      <li>Use App for Dedicated Camera Operation</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="info-body">
                    <h4>Specifications</h4>
                    <ul className="normal-list">
                      <li><span>Weight:</span> 35.5oz (1006g)</li>
                      <li><span>Maximum Speed:</span> 35 mph (15 m/s)</li>
                      <li><span>Maximum Distance:</span> Up to 9,840ft (3,000m)</li>
                      <li><span>Operating Frequency:</span> 2.4GHz</li>
                      <li><span>Manufacturer:</span> GoPro, USA</li>
                    </ul>
                    <h4>Shipping Options:</h4>
                    <ul className="normal-list">
                      <li><span>Courier:</span> 2 - 4 days, $22.50</li>
                      <li><span>Local Shipping:</span> up to one week, $10.00</li>
                      <li><span>UPS Ground Shipping:</span> 4 - 6 days, $18.00</li>
                      <li><span>Unishop Global Export:</span> 3 - 4 days, $25.00</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;