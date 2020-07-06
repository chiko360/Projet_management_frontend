import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter , Route, useHistory } from "react-router-dom";
import { Button, Form, Header } from "semantic-ui-react";

function ChangePassword() {

    const [old_password, setOpass] = useState('');
    const [new_password, setNpass] = useState('');
    const [errorOP, setEOP] = useState(null);
    const [errorNP, setENP] = useState(null);
    const [errorChange, setChangeError] = useState(null);

    let history = useHistory();

    const handlePChange = () =>{
      const isValid = validate();
      if (isValid) {
        setEOP(null);
        setENP(null);
        setChangeError(null);
        changepass();
      }
    }

    const changepass = async () => {
        let url = 'http://localhost:8000/auth/change_password/';
        let token = localStorage.getItem("token")
        axios.create({
          headers: {
              "Content-Type": "application/json",
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

      if (old_password==='') {
        OPError = 'Old password can\'t be blank';
      }
      
      if (new_password==='') {
        NPError = 'New password can\'t be blank';
      }

      else if (new_password===old_password) {
        NPError = 'passwords can\'t be the same';
      }

      else if (new_password.length<6) {
        NPError = 'password is too weak';
      }

  
      if (OPError || NPError) {
        setEOP(OPError);
        setENP(NPError);
        return false;
      }
  
      return true;
    }

    return(
      <div>
              <div className="auth-main">
                  <div class="auth-content">
                    <div className="auth-card">
                      <Header as="h2" color="black" textAlign="center">
                          change your password     
                      </Header>
                      <Form.Group size="large" className="auth-form" autocomplete="off">
                        <Form.Input
                          icon="lock"
                          iconPosition="left"
                          placeholder="Old Password"
                          type="password"
                          className="auth-input-field"
                          onChange={(event)=>{setOpass(event.target.value)}}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>{errorOP}</div>
                        <Form.Input
                          
                          icon="lock"
                          iconPosition="left"
                          placeholder="New Password"
                          type="password"
                          className="auth-input-field"
                          onChange={(event)=>{setNpass(event.target.value)}}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>{errorNP}</div>
                          <Button color="blue" size="huge" onClick={()=>{handlePChange()}} >
                            Change Password
                          </Button>
                          <div style={{ fontSize: 12, color: "red" }}>{errorChange}</div> 
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
    );
}
export default ChangePassword;