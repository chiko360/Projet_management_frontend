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
                           
                        
              <h2>
              {first_name} {last_name} <br />
            </h2>
            </div>
                            </div>
                            <br/>
                            <Row>
            <Col className="ml-auto mr-auto text-center" md="12">
                    <h5>Date of Birth: {date_of_birth}</h5>
                    <h5>Gender: {gender}</h5>
                    <h5>I'm a {promo} Student at ESI SBA</h5>

              <br />
              <Button size="lg"  className="bttn-hover color-4" style={{width:'250px'}}>
                           <Icofont icon="ssl-security"/> Change Password
                        </Button>
            
       </Col>
       </Row>
       <br />
         </div>
        
         </div>
         </div>
				<br></br>
				<br></br>
				<br></br>
 
            </div>
           
        </div>
 
	</div>
	   
  <br/>
         <br/> 
         <br/>
         <br/>
          <Footer/>

</>




        );
    }

export default Studentprofile;