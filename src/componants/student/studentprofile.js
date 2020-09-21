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

  const [selected_project, setselected_project] = useState(null);
  const [groupfiche, setgroupfiche] = useState(null);
  const [Grp, setGrp] = useState('');
  const [mem, setmem] = useState([]);
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

    const havegrp = async () => {
      let url = 'http://localhost:8000/profiles/getgroup/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' + token
        },
      })
        .request({
          url: url,
          method: "get",
        })
        .then((res) => {
          setGrp(res.data.grp);
        }
        )
    }
  
  
   const getfinalresult = async () => {
  let url = 'http://localhost:8000/groups/finalresults/';
  let token = localStorage.getItem("token");
  axios.create({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .request({
      url: url,
      method: "get",
    })
    .then((res) => {
      setmem(res.data);
    }
    )
    .catch(() => {
      console.log('there is no results yet');
    })
}


    useEffect(()=> {
      if (localStorage.getItem('type')!=='student'){
        history.push('/Forbiden')
      }
      havegrp();
      getfinalresult();
        getinfo();
        AOS.init();
        AOS.refresh();
    },[]);
        return (
<>

<IndexNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>

<div class="page-header header-filter" data-parallax="true" >
</div>

    <div class="main main-raised">

		<div class=" section profile-content">
        
            <div class="container">
       
                <div class="row">    
	                <div class="col-md-6 ml-auto mr-auto">
        	           <div class="profile">
                     
                            <div className="owner">
                                <div className="avatar" data-aos="fade-up" data-aos-delay="200">
	                           
                                <img src={avatar} alt="Circle Image" class="img-raised rounded-circle img-fluid"/>
	      
                            </div>
                            
                            <div className="name" data-aos="fade-up" data-aos-delay="400">
                           
                        
              <h2>
              {first_name} {last_name} <br />
            </h2>
            </div>
                            </div>
                            <br/>
                            <Row>
            <Col className="ml-auto mr-auto text-center" md="12">
                    <h5 data-aos="fade-up" data-aos-delay="500">Date of Birth: {date_of_birth}</h5>
                    <h5 data-aos="fade-up" data-aos-delay="600">Gender: {gender}</h5>
                    <h5 data-aos="fade-up" data-aos-delay="700">I'm a {promo} Student at ESI SBA</h5>
<br/>

       </Col>
       </Row>
       

       <br />
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
                   Final results
                  </NavLink>
                </NavItem>
             
              </Nav>
            </div>
          </div>

          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
              <Col className="ml-auto mr-auto" >
                <ul className="list-unstyled follows">
                    <li>
                    <div class="card my-4">
                    <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                        {mem.map((mem, index) => {
                          if(Grp==mem.groupfiche){
                          return  <Col>
                          <p>
                          <h5>  Your Group : 
                            <span style={{color:'#3498db'}}> 
                            {mem.groupfiche}
                             </span></h5>
                          <hr/>
                          
                          <h5> The Project's That Your Group is Concerned With : 
                          <span  style={{color:'#3498db'}}>
                            {mem.selected_project}
                            </span>
                             </h5>
                          </p>
                          </Col>
                        }
                         })}
                        </div>
                        </div>
                <p>If you want to check on the rests of the you whole promo, 
                  <a href="/student/results"> <span style={{color:'#3498db'}}>
                    click here </span> </a></p>
                      
                    </li>
                
                    
                  </ul>
                </Col>
              </Row>
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