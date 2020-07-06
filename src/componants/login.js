import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Header } from "semantic-ui-react";
import "../login.css";
function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loggedIn,setLoggedIn] = useState(false);
  const [account_type,setType] = useState(null);
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
          setLoggedIn(true)
          if (res.data.account_type === 'student'){
            localStorage.setItem("type","student")
            setType('student');
            history.replace('/student');
          }
          else if (res.data.account_type === 'teacher') {
            localStorage.setItem("type","teacher")
            setType('teacher');
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
            <div>
              <div className="auth-main">
                  <div class="auth-content">
                    <div className="auth-card">
                      <Header as="h2" color="black" textAlign="center">
                          Log In to you account      
                      </Header>
                      <Form.Group size="large" className="auth-form" autocomplete="off">
                        <Form.Input
                          
                          icon="at"
                          iconPosition="left"
                          placeholder="Email"
                          className="auth-input-field"
                          onChange={(event)=>{setEmail(event.target.value)}}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>{emailError}</div>
                        <Form.Input
                          
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password"
                          type="password"
                          className="auth-input-field"
                          onChange={(event)=>{setPassword(event.target.value)}}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>{passwordError}</div>
                          <Button  color="blue" size="huge" onClick={()=>{handlelogin()}} >
                            Login
                          </Button>
                          <div style={{ fontSize: 12, color: "red" }}>{loginError}</div> 
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
        );
    }

export default Login;