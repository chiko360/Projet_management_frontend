import React from 'react';
const Footer = () => {
  return (
          <footer style={{bottom:'0',position: 'relative',left: '0',right:'0'}} className="page-footer font-small unique-color-dark">
            <div style={{backgroundColor: '#3498db'}}>
              <div className="container">
                {/* Grid row style={{bottom:'0',position: 'relative',left: '0',right:'0'}}*/}
                <div className="row py-4 d-flex align-items-center">
                  {/* Grid column */}
                  <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                    <h6 className="mb-0" style={{color:"white"}}>Get connected with us on social networks!</h6>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-6 col-lg-7 text-center text-md-right">
                    {/* Facebook */}
                    <a className="fb-ic" style={{color:"white"}}>
                      <i className="fab fa-facebook-f white-text mr-4"> </i>
                    </a>
                    {/* Twitter */}
                    <a className="tw-ic" style={{color:"white"}}>
                      <i className="fab fa-twitter white-text mr-4"> </i>
                    </a>
                    {/* Google +*/}
                    <a className="gplus-ic" style={{color:"white"}}>
                      <i className="fab fa-google-plus-g white-text mr-4"> </i>
                    </a>
                    {/*Linkedin */}
                    <a className="li-ic" style={{color:"white"}}>
                      <i className="fab fa-linkedin-in white-text mr-4"> </i>
                    </a>
                    {/*Instagram*/}
                    <a className="ins-ic">
                      <i className="fab fa-instagram white-text"  style={{color:"white"}}> </i>
                    </a>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row*/}
              </div>
            </div>
            {/* Footer Links */}
            <div className="container text-center text-md-left mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6  style={{color:"#959595"}} className="text-uppercase font-weight-bold">Gestion des Projets ESI SBA</h6>
                  <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
                  <p  style={{color:"#959595"}}>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                    consectetur
                    adipisicing elit.</p>
                </div>
                {/* Grid column */}
                {/* Grid column */}

                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6  style={{color:"#959595"}} className="text-uppercase font-weight-bold">Useful links</h6>
                  <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
                  <p  style={{color:"#959595"}}>
                    <a href="/login">Your Account</a>
                  </p>
                  <p  style={{color:"#959595"}}>
                    <a href="/contactus">Contact us</a>
                  </p>
                  <p  style={{color:"#959595"}}>
                    <a href="/aboutus">About us</a>
                  </p>

                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6  style={{color:"#959595"}} className="text-uppercase font-weight-bold">Contact</h6>
                  <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
                  <p style={{color:"#959595"}}>
                    <i className="fas fa-home mr-3" /> EL WIAM, 22016 Sidi Bel Abbés</p>
                  <p  style={{color:"#959595"}}>
                    <i className="fas fa-envelope mr-3" /> www.esi-sba.dz</p>
                  <p  style={{color:"#959595"}}>
                    <i className="fas fa-phone mr-3" /> +213 48 74 94 52</p>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
            {/* Footer Links */}
            {/* Copyright */}
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
              <a href="https://esi-sba.dz/"> ESI SBA &#10084;&#65039; </a>
            </div>
            {/* Copyright */}
          </footer>
    );
}

export default Footer;