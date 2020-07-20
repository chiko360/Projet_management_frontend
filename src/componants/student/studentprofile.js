import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";
import { useHistory } from "react-router-dom";
import HorNavbar from '../HorNavbar';
import IndexNavbar from '../header/NavbarComponent';
import Icofont from 'react-icofont';
import AOS from 'aos';
import Footer from '../Footer'; 
import avatar from '../../assets/images/avatar.jpg';

function Studentprofile() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

    const [first_name, setfname] = useState(null);
    const [last_name, setlname] = useState(null);
    const [date_of_birth, setdob] = useState(null);
    const [gender, setgender] = useState(null);
    const [promo, setpromo] = useState(null);
    let history = useHistory();

    const getinfo = async () => {
        let url = 'http://localhost:8000/profiles/student/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        
        await axios(options).then(res => {
            const response = res.data;
            setfname(response.data['0'].first_name)
            setlname(response.data['0'].last_name)
            setdob(response.data['0'].birth_date)
            setgender(response.data['0'].gender)
            setpromo(response.data['0'].promo)
        })
        .catch(function (error) {
          history.push('/Forbiden')
          }
        )
    }

    useEffect(()=> {
      if (localStorage.getItem('type')!=='student'){
        history.push('/Forbiden')
      }
        getinfo();
    },[]);
        return (
<>

<HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>

<div class="page-header header-filter" data-parallax="true" >
</div>

    <div class="main main-raised">

		<div class=" section profile-content">
        
            <div class="container">
       
                <div class="row">    
	                <div class="col-md-6 ml-auto mr-auto">
        	           <div class="profile">
                     
                            <div className="owner">
                                <div className="avatar">
	                           
                                <img src={avatar} alt="Circle Image" class="img-raised rounded-circle img-fluid"/>
	      
                            </div>
                            
                            <div className="name">
                           
                        <Button className="btn-round" color="info" >
                           <Icofont icon="ssl-security"/> Change Password
                        </Button>
                        <br></br>
                        <br></br>
                        <Button className="btn-round "  color="danger" outline>
                           <Icofont icon="logout"/> 
                        </Button>
              <h4 className="title">
              {first_name} {last_name} <br />
              </h4>
              <h6 className="description">Leader of Team</h6>
            </div>
                            </div>
                            <Row>
            <Col className="ml-auto mr-auto text-center" md="12">
                    <h6>date of birth: {date_of_birth}</h6>
                    <h6>gender: {gender}</h6>
                    <h6>i'm a {promo} student at esi sba</h6>
              <br />
            
       </Col>
       </Row>
       <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                   More Infos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Following
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */} <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="10">
                  <ul className="list-unstyled follows">
                    <li>
                      <Row>
                    
                        <Col className="ml-auto mr-auto" lg="7" md="6" xs="6">
                          <h6>
                            Did you choose a team?<br />
                            <small>Click check if you did.</small>
                          </h6>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>
                    <hr />
                    <li>
                      <Row>
                     
                        <Col className="ml-auto mr-auto" lg="7" md="6" xs="6">
                          <h6>
                            Did you choose a theme? <br />
                            <small>Click check if you did.</small>
                          </h6>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="3" md="6" xs="4">
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h3 className="text-muted">Not following anyone yet :(</h3>
              <Button className="btn-round" color="warning">
                Find artists
              </Button>
            </TabPane>
          </TabContent>
        
	                    </div>
                        
    	            </div>
                </div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>


 
            </div>
        </div>
	</div>
	   

          <Footer/>

</>




        );
    }

export default Studentprofile;