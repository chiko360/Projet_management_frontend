import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "reactstrap";
import Footer from './Footer'; 
import { Form } from "semantic-ui-react";
import IndexNavbar from './header/NavbarComponent';
function Login() {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("login");
    return function cleanup() {
      document.body.classList.remove("login");
    };
  });

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEerror] = useState(null);
  const [passwordError,setPerror] = useState(null);
  const [loginError,setLerror] = useState(null);
  
  let history = useHistory();

  const handlelogin = () =>{
    const isValid = validate();
    if (isValid) {
      setEerror(null);
      setPerror(null);
      setLerror(null);
      login();
    }
  }

  const login = async () => {
        let url = 'http://localhost:8000/auth/login/';
        axios.create({
          headers: {
              "Content-Type": "application/json",
              'Content-Type': 'application/json;charset=UTF-8'
            },
        })
        .request({
          url: url,
          method: "post",
          data: { email, password },
        })
        .then((res) => {
          console.log(res)
          localStorage.setItem("token",res.data.token)
          if (res.data.account_type === 'student'){
            localStorage.setItem("type","student")
            history.replace('/student');
          }
          else if (res.data.account_type === 'teacher') {
            localStorage.setItem("type","teacher")
            history.replace('/teacher');
          }
        })
        .catch(() => {
          setLerror('wrong email or password');
        });
    }

  const validate = () => {
      let emailError = "";
      let passwordError = "";
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email==='') {
        emailError = 'email can\'t be blank';
      }
      
      if (password==='') {
        passwordError = 'password can\'t be blank';
      }

      if (!re.test(String(email).toLowerCase())){
        emailError = "enter a valide email";
      }
  
      if (emailError || passwordError) {
        setEerror(emailError);
        setPerror(passwordError);
        return false;
      }
  
      return true;
    };

    useEffect(()=> {
      let token = localStorage.getItem("token")
      console.log(token)
      let type = localStorage.getItem("type")
      if (token !==null){
        history.push('/'+type)
      }
    },[]);

    return (
    <>
    <IndexNavbar />
    <section id="home" class="parallax-section">
     <div class="overlay"></div>
     <div class="image-overlay">    
    </div>
        <div class="container">
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome Back</h3>
                <Form className="register-form">
                  <label>Email</label>
                  <Form.Input
                    icon="at"
                    iconPosition="left"
                    placeholder="Email"
                    onChange={(event)=>{setEmail(event.target.value)}}
                  />
                  <center><div style={{ fontSize: 15, color: "red" }}>{emailError}</div></center>
                  <label>Password</label>
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={(event)=>{setPassword(event.target.value)}}
                  />
                  <center><div style={{ fontSize: 15, color: "red" }}>{passwordError}</div></center>
                  <Button block className="btn-round" color="info" onClick={()=>{handlelogin()}}>
                    LOGIN
                  </Button>
                  <center><div style={{ fontSize: 15, color: "red" }}>{loginError}</div></center>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="info"
                    href="#"
                    onClick={e => e.preventDefault()}
                  >
                      Forget Password?
              </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section> 
    <Footer/>
    </>
        );
    }

export default Login;
