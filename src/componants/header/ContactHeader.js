import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";

function ContactHeader() {
  return (
    <>
 <section id="ho" class="parallax-section">
     <div class="overlay"></div>
     <div class="image-overlayy">    
    </div>
    <Container>
          <Row>
    <Col lg="5" md="7">

    <h1 data-aos="fade-up"> Contact Us</h1>
    </Col>
    <Col lg="8" md="12">
        <h3 data-aos="fade-up" data-aos-delay="400">We Want to Hear From You.</h3>
              <br />
              </Col>
              </Row>
              </Container>
    </section>
    </>
  );
}

export default ContactHeader;
