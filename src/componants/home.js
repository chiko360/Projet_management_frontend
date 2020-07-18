import React from 'react';
import  { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import '../assets/css/font-awesome.min.css';
import '../assets/css/tooplate-style.css';
import etud from '../assets/images/etud.jpg';
import ens from '../assets/images/ens.jpg';
import entre from '../assets/images/entre.jpg';
import one from '../assets/images/team/team-1.jpg';
import two from '../assets/images/team/team-2.jpg';
import three from '../assets/images/team/team-3.jpg';
import four from '../assets/images/team/team-4.jpg';
import CountUp from 'react-countup';
import AOS from 'aos';
import Footer from './Footer';
import services from '../assets/images/counts-img.svg';
import '../App.css';
import {
     Button,
     Container,
     Row, Col
   } from "reactstrap";
import IndexNavbar from './header/NavbarComponent.js';
import Icofont from 'react-icofont';

class Home extends Component {
     constructor(props, context) { 
          super(props, context); 
          AOS.init(); 
        } 
        componentWillReceiveProps (){ 
          AOS.refresh(); 
        } 
       
  render() {
  document.documentElement.classList.remove("nav-open");
    return (
    <div className='App'>
    <IndexNavbar />
    <section id="home" class="parallax-section">
         <div class="overlay"></div>
         <div id="slideshow">
                     <div class="slide slideone" ></div>
        </div>
              <Container>
              <Row>

                <Col lg="8" md="12">
                 <h1 data-aos="fade-up">PFE esi-sba</h1>
            <h2 data-aos="fade-up" data-aos-delay="400">Un Projet Plus Puissant, Plus Résistant</h2>
                  <br />
                  <p data-aos="fade-up" data-aos-delay="800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <br />
                 <div class="side" data-aos="fade-up" data-aos-delay="1200">
                  <Button
                    className="btn-round ml-1"  
                    color="info"
                    href="/regiter-page"
                    outline
                    target="_blank"
                  >
                       Essayez Maintenant
                  </Button>
                  </div>
             </Col>
             </Row>
             </Container>
    </section> 

        <section id="counts" class="counts">
          <div class="container">
            <br></br>
            <div class="row">
              <div class="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150">
                <img src={services} class="img-fluid"/>
              </div>
              <div class="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0" data-aos="fade-left" data-aos-delay="300">
                <div class="content d-flex flex-column justify-content-center">
                  <div class="row">
                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                      <Icofont icon="icofont-simple-smile"/>
                      <CountUp delay ={3} start={0} end={86}/>
                        <p><strong>Happy Students</strong> consequuntur voluptas nostrum aliquid ipsam architecto ut.</p>
                      </div>
                    </div>

                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                      <Icofont icon="icofont-document-folder"/>
                      <CountUp delay ={3} start={0} end={23}/>
                        <p><strong>Projects</strong> adipisci atque cum quia aspernatur totam laudantium et quia dere tan</p>
                      </div>
                    </div>

                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                      <Icofont icon="icofont-clock-time"/>
                      <CountUp delay ={3} start={0} end={5}/>
                        <p><strong>Years of experience</strong> aut commodi quaerat modi aliquam nam ducimus aut voluptate non vel</p>
                      </div>
                    </div>

                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                      <Icofont icon="icofont-award"/>
                      <CountUp delay ={3} start={0} end={47}/>
                        <p><strong>Graduations</strong> rerum asperiores dolor alias quo reprehenderit eum et nemo pad der</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    <section id="services" class="services landing-section">
    <Container>
    <Col className="ml-auto mr-auto">
    <div class="section-title" data-aos="fade-up">
              <h2> How does it work</h2>
            </div>

            <div class="row">
              <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                  <div class="icon"><Icofont icon="learn"/></div>
                  <h4 class="title"><a href="">Consult Themes</a></h4>
                  <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                </div>
              </div>

              <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                  <div class="icon"><Icofont icon="group-students"/></div>
                  <h4 class="title"><a href="">Choose a Team</a></h4>
                  <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                </div>
              </div>

              <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                  <div class="icon"><Icofont icon="list"/></div>
                  <h4 class="title"><a href="">Choose a theme</a></h4>
                  <p class="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                </div>
              </div>

              <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
                  <div class="icon"><Icofont icon="graduate-alt"/></div>
                  <h4 class="title"><a href="">Final Work</a></h4>
                  <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                </div>
              </div>

            </div>
    </Col>
          </Container>
        </section>

        <section id="more-services" class="more-services">
          <div class="container">

            <div class="row">
              <div class="col-md-6 d-flex align-items-stretch">
                <div class="card cardone"  data-aos="fade-up" data-aos-delay="100">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Teacher</a></h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua.</p>
                    <div class="read-more"><a href="#"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div class="card cardtwo" data-aos="fade-up" data-aos-delay="200">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Student</a></h5>
                    <p class="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem.</p>
                    <div class="read-more"><a href="#"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>

              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4">
                <div class="card cardthree"  data-aos="fade-up" data-aos-delay="100">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Company</a></h5>
                    <p class="card-text">Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores.</p>
                    <div class="read-more"><a href="#"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4">
                <div class="card cardfour" data-aos="fade-up" data-aos-delay="200">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Universities</a></h5>
                    <p class="card-text">Nostrum eum sed et autem dolorum perspiciatis. Magni porro quisquam laudantium voluptatem.</p>
                    <div class="read-more"><a href="#"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section> 



        <section id="team" class="team section-bg">
          <div class="container">

            <div class="section-title" data-aos="fade-up">
              <h2>Team</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
            </div>

            <div class="row">

              <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="fade-up" data-aos-delay="100">
                  <div class="member-img">
                    <img src={one} class="img-fluid" alt=""/>
                    <div class="social">
                      <a href=""><i class="icofont-twitter"></i></a>
                      <a href=""><i class="icofont-facebook"></i></a>
                      <a href=""><i class="icofont-instagram"></i></a>
                      <a href=""><i class="icofont-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="fade-up" data-aos-delay="200">
                  <div class="member-img">
                    <img src={two} class="img-fluid" alt=""/>
                    <div class="social">
                      <a href=""><i class="icofont-twitter"></i></a>
                      <a href=""><i class="icofont-facebook"></i></a>
                      <a href=""><i class="icofont-instagram"></i></a>
                      <a href=""><i class="icofont-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="fade-up" data-aos-delay="300">
                  <div class="member-img">
                    <img src={three} class="img-fluid" alt=""/>
                    <div class="social">
                      <a href=""><i class="icofont-twitter"></i></a>
                      <a href=""><i class="icofont-facebook"></i></a>
                      <a href=""><i class="icofont-instagram"></i></a>
                      <a href=""><i class="icofont-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="fade-up" data-aos-delay="400">
                  <div class="member-img">
                    <img src={four} class="img-fluid" alt=""/>
                    <div class="social">
                      <a href=""><i class="icofont-twitter"></i></a>
                      <a href=""><i class="icofont-facebook"></i></a>
                      <a href=""><i class="icofont-instagram"></i></a>
                      <a href=""><i class="icofont-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

    <section id="faq" class="faq">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>Frequently Asked Questions</h2>
            </div>

            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <div class="col-lg-5">
              <Icofont icon="question-circle"/> 
                          <h4>Non consectetur a erat nam at lectus urna duis?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                </p>
              </div>
            </div>

            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-5">
              <Icofont icon="question-circle"/> 
                <h4>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim.
                </p>
              </div>
            </div>
            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
              <div class="col-lg-5">
              <Icofont icon="question-circle"/> 
                <h4>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus.
                </p>
              </div>
            </div>


            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
              <div class="col-lg-5">
              <Icofont icon="question-circle"/> 
                <h4>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Aperiam itaque sit optio et deleniti eos nihil quidem cumque. Voluptas dolorum accusantium sunt sit enim. Provident consequuntur quam aut reiciendis qui rerum dolorem sit odio. Repellat assumenda soluta sunt pariatur error doloribus fuga.
                </p>
              </div>
            </div>


            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="500">
              <div class="col-lg-5">
              <Icofont icon="question-circle"/> 
                <h4>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                </p>
              </div>
            </div>
          </div>
        </section>




     <section id="contact" class="parallax-section">   
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>Contact Us</h2>
            </div>

            <div class="row">

              <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div class="contact-about">
                  <h3>PFE ESI</h3>
                  <p>Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p>

                </div>
              </div>

              <div class="col-lg-6 col-md-12" data-aos="fade-up" data-aos-delay="300">
                <form role="form">
                  <div class="form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                    <div class="validate"></div>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                    <div class="validate"></div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                    <div class="validate"></div>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                    <div class="validate"></div>
                  </div>

                  <div class="text-center"> <Button
                    className="btn-round ml-1"  
                    color="info"
                    href="/regiter-page"
                    outline
                    target="_blank"
                  >
                       Send Message
                  </Button></div>
                </form>
              </div>

            </div>

          </div>
        </section>
    <Footer/>
    </div>

      );
}
}
export default Home