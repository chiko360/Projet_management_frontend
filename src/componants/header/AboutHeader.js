import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
function AboutHeader() {


    return (
      <>
   
   <section id="ho" class="parallax-section">
       <div class="overlay"></div>
       <div class="image-overlay">    
      </div>
      <Container>
            <Row>
      <Col lg="5" md="7">
  
      <h1 data-aos="fade-up"> Get To Know More About Us</h1>
      </Col>
      <Col lg="8" md="12">
          <h3 data-aos="fade-up" data-aos-delay="400">We Are More Than a University, We Are a Familly.</h3>
                <br />
                </Col>
                </Row>
                </Container>
      </section>
      </>
    );
}
export default AboutHeader;  