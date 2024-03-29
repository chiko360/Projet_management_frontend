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

import NavSimple from './header/NavSimple';
import ContactHeader from './header/ContactHeader';
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


class ContactUsPage extends Component {
  
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
<ContactHeader />

<section id="headersmall" class="parallax-section">

<div class="overlay"></div> 
<div class="image-overlay">    
</div>
    </section>

<section id="contactt" class="contact">
      <div class="container">
        <div class="section-title">
          <h2>Contact Us</h2>
        </div>
        <div class="row">
          <div class="col-lg-7 col-md-6" data-aos="fade-up" data-aos-delay="50">
            <div class="contact-about">
              <h3>PFE ESI</h3>
              <p>Established in 1945, École Supérieure en Informatique (Graduate School of Computer Science) is a higher-education institution located in Sidi Bel Abbès. Officially recognized by the Ministry of Higher Education and Scientific Research of Algeria, ESI is a coeducational Algerian higher education institution. ESI offers courses and programs leading to officially recognized higher education degrees in several areas of study.
                </p><div class="social-links">
                <a href="#" class="twitter"><i class="icofont-twitter"></i></a>
                <a href="#" class="facebook"><i class="icofont-facebook"></i></a>
                <a href="#" class="instagram"><i class="icofont-instagram"></i></a>
                <a href="#" class="linkedin"><i class="icofont-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="150">
            <div class="info">
              <div>
                <p><Icofont icon="google-map"/>Wiam Street, SBA<br/>SBA, Algeria</p>
              </div>

              <div>
                <p><Icofont icon="send-mail"/>info@esi-sba.dz</p>
              </div>

              <div>
                <p><Icofont icon="phone"/> +213 48 74 94 52</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>


    <section  class="parallax-section-head">
<div className="section landing-section">

     <Container>
       <Row>
         <Col className="ml-auto mr-auto" md="8">
           <Form className="contact-form" onSubmit={this.handleSubmit} data-aos="fade-up">
             <Row>
               <Col md="6" data-aos="fade-up" data-aos-delay="250">
                 <h6 style={{color: "white"}}>Name</h6>
                 <InputGroup>
                   <InputGroupAddon addonType="prepend">
                     <InputGroupText>
                       <i className="nc-icon nc-single-02" />
                     </InputGroupText>
                   </InputGroupAddon>
                   <Input placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                 </InputGroup>
               </Col>
               <Col md="6" data-aos="fade-up" data-aos-delay="350">
                 <h6 style={{color: "white"}}>Email</h6>
                 <InputGroup>
                   <InputGroupAddon addonType="prepend">
                     <InputGroupText>
                       <i className="nc-icon nc-email-85" />
                     </InputGroupText>
                   </InputGroupAddon>
                   <Input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                 </InputGroup>
               </Col>
             </Row>
             <div data-aos="fade-up" data-aos-delay="450">
          

<br/>
             <h6 style={{color: "white"}}>Subject</h6>
                 <InputGroup>
                   <InputGroupAddon addonType="prepend">
                     <InputGroupText>
                       <i className="nc-icon nc-email-85" />
                     </InputGroupText>
                   </InputGroupAddon>
                   <Input placeholder="Subject" type="text" name="subject" value={this.state.subject} onChange={this.handleInputChange}/>
                 </InputGroup>
                 </div>

                 <div data-aos="fade-up" data-aos-delay="550">
                 <br/>
             <h6 style={{color: "white"}}>Message</h6>
             <Input
               placeholder="Dites-nous vos pensées et vos suggestions..."
               type="textarea"
               rows="4"
               name="message"
               value={this.state.message}
               onChange={this.handleInputChange}
             />
             </div>
             <Row>
               <Col className="ml-auto mr-auto" md="4" data-aos="fade-up" data-aos-delay="550">
                 <Button 
              style={{width:"100%"}}
              className="bttn-hover color-2 btn-lg ">
                   Send Your Message
                 </Button>
               </Col>
             </Row>
           </Form>
         </Col>
       </Row>
     </Container>
     
   </div>
   </section>
            <Footer/>

</>
);

  }
}

export {ContactUsPage};