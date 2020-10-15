import React from 'react';
import { Component, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/aos/dist/aos.css';
import './App.css';
import './assets/css/font-awesome.min.css';
import './assets/css/tooplate-style.css';
import etud from './assets/images/etud.jpg';
import ens from './assets/images/ens.jpg';
import entre from './assets/images/entre.jpg';
import one from './assets/images/team/team-1.jpg';
import two from './assets/images/team/team-2.jpg';
import three from './assets/images/team/team-3.jpg';
import four from './assets/images/team/team-4.jpg';
import CountUp from 'react-countup';
import AOS from 'aos';
import Footer from '././componants/Footer';
import services from './assets/images/counts-img.svg';
import {
  Button,
  Container,
  Row, Col
} from "reactstrap";
import IndexNavbar from './componants/header/NavbarComponent';
import Icofont from 'react-icofont';










function App (props) {
 
  const logged = props.islogged
  let history = useHistory();

  useEffect(() => {
  
    AOS.init(); 
    AOS.refresh(); 
  }, []);

  function Join(props){

    if (logged !==null){
      return (<Button
  
        className="bttn-hover color-9 btn-lg "
        href="/login"
        outline
        target="_blank"
      >
        Go To Dashboard
  </Button>)}
  
  if (logged===null) { return (<Button
    className="bttn-hover color-9 btn-lg "
    href="/login"
    outline
    target="_blank"
  >
  Join Us Now
  </Button>)}
  
  }
 
    document.documentElement.classList.remove("nav-open");

   

    return (

      <div className="App">
<IndexNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
        <section id="home" class="parallax-section">
          <div class="overlay"></div>
          <div id="slideshow">
            <div class="slide slideone" ></div>
          </div>
        
          <Container>
            <Row>

              <Col lg="8" md="12">
                <h1 data-aos="fade-up">PFE esi-sba</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">A Strong Project, A Unique Breliant One</h2>
                <br />
                <p data-aos="fade-up" data-aos-delay="800">
                walk to the gradution with confident steps, do your work profetionaly with just few clicks, discover the projects uploaded by our teacher, and get you work done
                 </p>
                <br />
                <div class="side" data-aos="fade-up" data-aos-delay="1200">

                  
                <Join islogged={logged} />
             
                </div>
                <div  >

              
</div>



              </Col>
            </Row>
          </Container>
          
        </section>
        
        <section id="counts" class="counts">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <br></br>
              <br></br>
              <br></br>
              <h1>Who Are We</h1>
            </div>
            <br></br>
            <div class="row">


              <div class="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150">
                <img src={services} class="img-fluid" />
              </div>

              <div class="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0" data-aos="fade-left" data-aos-delay="300">
                <div class="content d-flex flex-column justify-content-center">
                  <div class="row">
                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                        <Icofont icon="icofont-simple-smile" />
                        <CountUp delay={3} start={0} end={86} />
                        <p><strong>Happy Students</strong> our students are really satisfied with the services we provide </p>
                      </div>
                    </div>
                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                        <Icofont icon="icofont-document-folder" />
                        <CountUp delay={3} start={0} end={23} />
                        <p><strong>Projects</strong> we put on the display of our students unique projects and on the trend </p>
                      </div>
                    </div>
                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                        <Icofont icon="icofont-clock-time" />
                        <CountUp delay={3} start={0} end={5} />
                        <p><strong>Years of experience</strong> 5 years in the service and we are aiming for more </p>
                      </div>
                    </div>

                    <div class="col-md-6 d-md-flex align-items-md-stretch">
                      <div class="count-box">
                        <Icofont icon="icofont-award" />
                        <CountUp delay={3} start={0} end={47} />
                        <p><strong>Graduations</strong> we have 2 promos that graduated with excelence </p>
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


              <div class="row">
                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                    <div class="icon"><Icofont icon="learn" /></div>
                    <h4 class="title"><a href="">Consult Projects</a></h4>
                    <p class="description"> consult our projects and choose the one that suits you the most  </p>
                  </div>
                </div>

                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                    <div class="icon"><Icofont icon="group-students" /></div>
                    <h4 class="title"><a href="">Choose a Team</a></h4>
                    <p class="description"> choose the memebers of your team, or join an exisiting one </p>
                  </div>
                </div>

                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                    <div class="icon"><Icofont icon="list" /></div>
                    <h4 class="title"><a href="">Choose a Project</a></h4>
                    <p class="description">fill the request form with the projects your Team have choosen</p>
                  </div>
                </div>

                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">

                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400">

                    <div class="icon"><Icofont icon="graduate-alt" /></div>
                    <h3 class="title"><a href="">Final Work</a></h3>
                    <p class="description">coordinate, code, and deliver your final work at the right time</p>
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
                <div class="card cardone" data-aos="fade-up" data-aos-delay="100">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Teacher</a></h5>
                    <p class="card-text">our well skilled teacher are in display to answer all your questions, and guide you through your journey.</p>
                    <div class="read-more"><a href="http://www.esi-sba.dz"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div class="card cardtwo" data-aos="fade-up" data-aos-delay="200">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Student</a></h5>
                    <p class="card-text"> we put all our energy and time to form and train our students through the projects we put in display. </p>
                    <div class="read-more"><a href="http://www.esi-sba.dz"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>

              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4">
                <div class="card cardthree" data-aos="fade-up" data-aos-delay="100">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Company</a></h5>
                    <p class="card-text">we collab with companies all around the country to give you a chance to be a part of their project.</p>
                    <div class="read-more"><a href="http://www.esi-sba.dz"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-stretch mt-4">
                <div class="card cardfour" data-aos="fade-up" data-aos-delay="200">
                  <div class="card-body">
                    <h5 class="card-title"><a href="">Universities</a></h5>
                    <p class="card-text">our service will be servicing more algerian universities in the near future.</p>
                    <div class="read-more"><a href="http://www.esi-sba.dz"><i class="icofont-arrow-right"></i> Read More</a></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>



        <section id="team" class="team section-bg">
          <div class="container">

            <div class="section-title" data-aos="fade-up">
              <h2>Our Team</h2>
              <p>Meet The Heads Behind The Hard Work</p>
            </div>

            <div class="row">

              <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="fade-up" data-aos-delay="100">
                  <div class="member-img">
                    <img src={one} class="img-fluid" alt="" />
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
                    <img src={two} class="img-fluid" alt="" />
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
                    <img src={three} class="img-fluid" alt="" />
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
                    <img src={four} class="img-fluid" alt="" />
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
                <Icofont icon="question-circle" />
                <h4>Can I change my team after i have been accepted in one already?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Only the team leader is the one who has the access to add or delete a member from their team, if you want to leave a team and join another, you have to ask the leader to delete you from the team so you can join another.
            </p>
              </div>
            </div>

            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-5">
                <Icofont icon="question-circle" />
                <h4>Will we get the project we want even if another team request to get it ?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  When two or more teams request the same project, we make a draw to select the team that will get that project, this is the only way that is fair and won't cause any conflicts.
               </p>
              </div>
            </div>
            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
              <div class="col-lg-5">
                <Icofont icon="question-circle" />
                <h4>Can I select the number of my team members?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Unfortunatly, you can't, the number of the team members is defined by the administration, the 2CPI, 1CS, 2CS students will make teams of 6-5 memebers, 3CS teams will make a team out of only 2 memebers.
                   </p>
              </div>
            </div>


            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
              <div class="col-lg-5">
                <Icofont icon="question-circle" />
                <h4> I have an idea of a project, can i work on it instead of choosing one of yours?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  Only 3CS students have the right to propose a project and work on it instead of working on one of our updates projects, due to their experience with the projects that they have dealed with in the previous educational years.
                  </p>
              </div>
            </div>


            <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="500">
              <div class="col-lg-5">
                <Icofont icon="question-circle" />
                <h4>If I didn't choose a team or a project and the deadline came, what will happen?</h4>
              </div>
              <div class="col-lg-7">
                <p>
                  If you didn't choose a team and the deadline came, you will be affected randomly to a team that has members less than 5.
                  and if you didn't choose a project, also a random project will be affected you you and your team.
                    </p>
              </div>
            </div>
          </div>
        </section>



        <section id="contact" class="contact">
          <div class="container">

            <div class="section-title" data-aos="fade-up">
              <h2>Contact Us</h2>
              <br></br>
            </div>

            <div class="row">

              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div class="contact-about">
                  <h3>PFE ESI-SBA</h3>
                  <p>We are always in the service to answer all your quetions and help you if there is any issue with our template, also we put ourselves in the need of the students who face problem through their project making journey.</p>
                  <div class="social-links">
                    <a href="#" class="twitter"><i class="icofont-twitter"></i></a>
                    <a href="#" class="facebook"><i class="icofont-facebook"></i></a>
                    <a href="#" class="instagram"><i class="icofont-instagram"></i></a>
                    <a href="#" class="linkedin"><i class="icofont-linkedin"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                <div class="info">
                  <div>
                    <Icofont icon="google-map" />
                    <p>Wiam Street, SBA<br />SBA, Algeria</p>
                  </div>

                  <div>
                    <Icofont icon="send-mail" />
                    <p>info@esi-sba.dz</p>
                  </div>

                  <div>
                    <Icofont icon="phone" />
                    <p>+213 48 74 94 52</p>
                  </div>

                </div>
              </div>

              <div class="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300">
                <form action="forms/contact.php" method="post" role="form" class="php-email-form">
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
                  <div class="text-center">
                    <Button
                      className="bttn-hover color-9 btn-lg "  >
                      Send Message
                  </Button>
                  </div>
                </form>
              </div>

            </div>

          </div>
          <br></br>
          <br></br>

        </section>


        <Footer />
      </div>

    );
  }


export default App;
