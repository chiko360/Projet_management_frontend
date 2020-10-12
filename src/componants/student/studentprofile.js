import React, { useEffect, useState } from 'react';
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
    let url = 'http://localhost:8001/profiles/student/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };

    await axios(options).then(res => {
      const response = res.data;
      setfname(response.data['0'].first_name)
      setlname(response.data['0'].last_name)
      setdob(response.data['0'].birth_date)
      if (response.data['0'].gender == 'M') {
        setgender('Male');
      }
      else if (response.data['0'].gender == 'F') {
        setgender('Female');
      }
      setpromo(response.data['0'].promo)
    })
      .catch(function (error) {
        history.push('/Forbiden')
      }
      )
  }

  const havegrp = async () => {
    let url = 'http://localhost:8001/profiles/getgroup/';
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
    let url = 'http://localhost:8001/groups/finalresults/';
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


  useEffect(() => {
    if (localStorage.getItem('type') !== 'student') {
      history.push('/Forbiden')
    }
    havegrp();
    getfinalresult();
    getinfo();
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>

      <IndexNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />

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

                      <img src={avatar} alt="Circle Image" class="img-raised rounded-circle img-fluid" />

                    </div>
                    <br /><br /> <br /><br />
                    <div className="name" data-aos="fade-up" data-aos-delay="400">
                      <h2>
                        Full Name : {first_name} {last_name} <br /><br />
                      </h2>
                    </div>
                    <div className="name" data-aos="fade-up" data-aos-delay="400">


                      <h2>
                        Date of birth : {date_of_birth} <br /><br />
                      </h2>
                    </div>
                    <div className="name" data-aos="fade-up" data-aos-delay="400">


                      <h2>
                        Gender : {gender} <br /><br />
                      </h2>
                    </div>
                    <div className="name" data-aos="fade-up" data-aos-delay="400">


                      <h2>
                        promo : {promo} <br /><br />
                      </h2>
                    </div>
                  </div>
                  <br />
                  <Row>
                  </Row>


                  <br />
                  <br />
                </div>

              </div>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <Footer />

    </>
  );
}

export default Studentprofile;