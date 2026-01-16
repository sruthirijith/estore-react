import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="inner-content">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="footer-logo">
                  <Link to="/">
                    <img src="/assets/images/logo/white-logo.svg" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-12">
                <div className="footer-newsletter">
                  <h4 className="title">
                    Subscribe to our Newsletter
                    <span>Get all the latest information, Sales and Offers.</span>
                  </h4>
                  <div className="newsletter-form-head">
                    <form action="#" method="get" target="_blank" className="newsletter-form">
                      <input name="EMAIL" placeholder="Email address here..." type="email" />
                      <div className="button">
                        <button className="btn">Subscribe<span className="dir-part"></span></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Middle */}
      <div className="footer-middle">
        <div className="container">
          <div className="bottom-inner">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer f-contact">
                  <h3>Get In Touch With Us</h3>
                  <p className="phone">Phone: +1 (900) 33 169 7720</p>
                  <ul>
                    <li><span>Monday-Friday: </span> 9.00 am - 8.00 pm</li>
                    <li><span>Saturday: </span> 10.00 am - 6.00 pm</li>
                  </ul>
                  <p className="mail">
                    <a href="mailto:support@shopgrids.com">support@shopgrids.com</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer our-app">
                  <h3>Our Mobile App</h3>
                  <ul className="app-btn">
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="lni lni-apple"></i>
                        <span className="small-title">Download on the</span>
                        <span className="big-title">App Store</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="lni lni-play-store"></i>
                        <span className="small-title">Download on the</span>
                        <span className="big-title">Google Play</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer f-link">
                  <h3>Information</h3>
                  <ul>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Downloads</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Sitemap</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>FAQs Page</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer f-link">
                  <h3>Shop Departments</h3>
                  <ul>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Computers & Accessories</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Smartphones & Tablets</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>TV, Video & Audio</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Cameras, Photo & Video</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()}>Headphones</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="inner-content">
            <div className="row align-items-center">
              <div className="col-lg-4 col-12">
                <div className="payment-gateway">
                  <span>We Accept:</span>
                  <img src="/assets/images/footer/credit-cards-footer.png" alt="Payment Methods" />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="copyright">
                  <p>Designed and Developed by <a href="https://graygrids.com/" rel="nofollow" target="_blank">GrayGrids</a></p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <ul className="socila">
                  <li><span>Follow Us On:</span></li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <i className="lni lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <i className="lni lni-twitter-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <i className="lni lni-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <i className="lni lni-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <a href="#" className="scroll-top">
        <i className="lni lni-chevron-up"></i>
      </a>
    </footer>
  );
};

export default Footer;