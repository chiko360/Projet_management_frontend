import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button, Card, Container, Row, Col, Badge } from "reactstrap";
import Footer from './Footer'; 
import { Form } from "semantic-ui-react";
import IndexNavbar from './header/NavbarComponent';
import AOS from 'aos';


function ChangePassword() {


  const [old_password, setOpass] = useState('');
  const [new_password, setNpass] = useState('');
  const [confirm_password, setCpass] = useState('');
  const [errorOP, setEOP] = useState(null);
  const [errorNP, setENP] = useState(null);
  const [errorCP, setECP] = useState(null);
  const [errorChange, setChangeError] = useState(null);

  let history = useHistory();

  const handlePChange = () =>{
    const isValid = validate();
    if (isValid) {
      setEOP(null);
      setENP(null);
      setECP(null);
      setChangeError(null);
      Chgpass();
    }
  }

  const Chgpass = async () => {
      let url = 'http://localhost:8000/auth/change_password/';
      let token = localStorage.getItem("token")
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "put",
        data: { old_password, new_password },
      })
      .then((res) => {
        history.goBack();
      })
      .catch(() => {
        setChangeError('wrong old password');
      });
  }

  const validate = () => {
    let OPError = "";
    let NPError = "";
    let CPError = "";

    if (old_password==='') {
      OPError = 'Old password can\'t be blank';
    }
    
    if (new_password==='') {
      NPError = 'New password can\'t be blank';
    }
    if (confirm_password===''){
      CPError = 'Confirm your new password';
    }
    else if (confirm_password!==new_password){
      CPError = 'Passwords are\'t the same';
    }
    else if (new_password===old_password) {
      NPError = 'passwords can\'t be the same';
    }

    else if (new_password.length<6) {
      NPError = 'password is too weak';
    }


    if (OPError || NPError || CPError) {
      setEOP(OPError);
      setENP(NPError);
      setECP(CPError);
      return false;
    }

    return true;
  }
  useEffect(()=> {
      
    AOS.init();
    AOS.refresh();
     
    },[]);

  return(
    <>
<IndexNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>

    <section id="home" class="parallax-section">
     <div class="overlay"></div>
     <div class="image-overlay">    
    </div>
        <div class="container">
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="6">
              <Card className=" card-register1 ml-auto mr-auto">
              <center>
              <h3  data-aos="fade-up" data-aos-delay="200" >Change Your Password</h3>
              </center>
                <br></br>
                
                <Form className="register-form">
                  <label data-aos="fade-up" data-aos-delay="300">Old Password</label>
                  <Form.Input
                  data-aos="fade-up" data-aos-delay="300"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Old Password"
                        type="password"
                        onChange={(event)=>{setOpass(event.target.value)}}
                      />
                  <center><div style={{ fontSize: 15, color: "red" }}>{errorOP}</div></center>
                  <br></br>
                  <label data-aos="fade-up" data-aos-delay="500">New Password</label>
                  <Form.Input
                  data-aos="fade-up" data-aos-delay="500"
                        icon="lock"
                        iconPosition="left"
                        placeholder="New Password"
                        type="password"
                        onChange={(event)=>{setNpass(event.target.value)}}
                      />
                  <center><div style={{ fontSize: 15, color: "red" }}>{errorNP}</div></center>
                  <br></br>
                  <label  data-aos="fade-up" data-aos-delay="700">Confirm Password</label>
                  <Form.Input
                   data-aos="fade-up" data-aos-delay="700"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(event)=>{setCpass(event.target.value)}}
                      />

                  <center><div style={{ fontSize: 15, color: "red" }}>{errorCP}</div></center>
                <br/>
                  <Button 
                  data-aos="fade-up" data-aos-delay="900"
                  data-aos="fade-up" 
                  style={{width: '100%'}} 
                  className="bttn-hover color-9" 
                   onClick={()=>{handlePChange()}}>
                    Change
                  </Button>
                  <center><div style={{ fontSize: 15, color: "red" }}>{errorChange}</div></center>
                </Form>
               
              </Card>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Container>

      </div>
</section> 
<Footer/>
    </>
  );
}
export default ChangePassword;