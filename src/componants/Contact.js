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
import ContactHeader from './header/ContactHeader';
import Icofont from 'react-icofont';
import AOS from 'aos';
import Footer from './Footer'; 


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
      console.log("Current state is: " + JSON.stringify(this.state));
      alert("Current state is: " + JSON.stringify(this.state));
      event.preventDefault();
    };

  render (){
    const { name, email, message } = this.state;

  return (
    <>
<IndexNavbar />
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
              <p>Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p>
              <div class="social-links">
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
                 <label>Name</label>
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
                 <label>Email</label>
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
             <label>Subject</label>
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
             <label>Message</label>
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
                 <Button className="btn-round btn-info" color="info" size="lg">
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

export default ContactUsPage;