
import React, {Component} from "react";
// reactstrap components
import {
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import IndexNavbar from './header/NavbarComponent';
import AboutHeader from './header/AboutHeader';
import Icofont from 'react-icofont';
import AOS from 'aos';
import Footer from './Footer'; 
import cliensone from '../assets/images/clients/client-1.jpg';
import clienstwo from '../assets/images/clients/client-2.jpg';
import cliensthree from '../assets/images/clients/client-3.png';
import cliensfour from '../assets/images/clients/client-4.jpg';
import cliensfive from '../assets/images/clients/client-5.png';
import clienssix from '../assets/images/clients/client-6.png';
import cliensseven from '../assets/images/clients/client-7.jpg';
import clienseight from '../assets/images/clients/client-8.jpg';
import test1 from '../assets/images/testimonials/testimonials-1.jpg';
import test2 from '../assets/images/testimonials/testimonials-2.jpg';
import test3 from '../assets/images/testimonials/testimonials-3.jpg';
import test4 from '../assets/images/testimonials/testimonials-4.jpg';
import test5 from '../assets/images/testimonials/testimonials-5.jpg';


class AboutUsPage extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    document.documentElement.classList.remove("nav-open");

    AOS.init(); 
 
    this.state = {
        name: '',
        email: '',
        message: '',
        agree: false,
    }
  }
  componentWillReceiveProps (){ 
    AOS.refresh(); 
  } 

  handleInputChange (event){
    const {name , value}=event.target;
    this.setState({
      [name] : value
    });
  };

    handleSubmit(event) {
      ;
      alert("Current state is: " + JSON.stringify(this.state));
      event.preventDefault();
    };

  render (){
    const { name, email, message } = this.state;

  return (
    <>
<IndexNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
<AboutHeader />
        <section id="about" class="about">
<Container>
        <div class="section-title" data-aos="fade-up">
          <h2>About Us</h2>
        </div>
             <Row className="content">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <p>
Esi SBA is one of the best edicutional instituts in algeria, we provide lot of mission, and these are the main ones            </p>
            <ul>
              <li><Icofont icon="check"/>We offer courses and programs in several areas of study</li>
              <li><Icofont icon="check"/>We provide several academic and non-academic facilities </li>
              <li><Icofont icon="check"/>We services to students including as well as administrative services</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay="250">
            <p>
            Established in 1945, École Supérieure en Informatique (Graduate School of Computer Science) is a higher-education institution located in Sidi Bel Abbès. Officially recognized by the Ministry of Higher Education and Scientific Research of Algeria, ESI is a coeducational Algerian higher education institution. ESI offers courses and programs leading to officially recognized higher education degrees in several areas of study.

            </p>
            <Button
            href="#"  
              style={{width:"150px"}}
              className="btn-hover color-3  btn-md">
                Learn More
             </Button>

          
          </div>
          </Row>
        </Container>
            </section>

<section id="clients" class="clients clients">
<div class="section-title" data-aos="fade-up">
          <h2>Our Partners</h2>
        </div>
      <Container>

        <Row>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={cliensone} class="img-fluid" alt="" data-aos="zoom-in"/>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={clienstwo} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="100"/>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={cliensthree} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="200"/>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={cliensfour} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="300"/>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={clienssix} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500"/>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <img src={clienseight} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500"/>
          </div>

        </Row>

      </Container>
      <br></br>
<br></br>
    </section>


            <section id="testimonials" class="testimonials section-bg">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <center>
          <h2>Testimonials</h2>
          <p>Check Out The Opinion of Some of Our Testers</p>
          </center>
        </div>

          <div class="testimonial-wrap" data-aos="fade-up" data-aos-delay="200">
            <div class="testimonial-item">
              <img src={test1} class="testimonial-img" alt=""/>
              <h3>Saul Goodman</h3>
              <h4>Ceo &amp; Founder</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>

          <div class="testimonial-wrap" data-aos="fade-up" data-aos-delay="300">
            <div class="testimonial-item">
              <img src={test2} class="testimonial-img" alt=""/>
              <h3>Sara Wilsson</h3>
              <h4>Designer</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>

          <div class="testimonial-wrap" data-aos="fade-up" data-aos-delay="400">
            <div class="testimonial-item">
              <img src={test3} class="testimonial-img" alt=""/>
              <h3>Jena Karlis</h3>
              <h4>Store Owner</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>

          <div class="testimonial-wrap" data-aos="fade-up" data-aos-delay="500">
            <div class="testimonial-item">
              <img src={test4} class="testimonial-img" alt=""/>
              <h3>Matt Brandon</h3>
              <h4>Freelancer</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
            <br></br>
          </div>
        </div>

    </section>


            <Footer/>

</>
);

  }
}

export {AboutUsPage};