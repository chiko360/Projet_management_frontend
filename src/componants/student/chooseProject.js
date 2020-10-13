import React, { useEffect, useState } from 'react';
// reactstrap components
import {
  Button,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  Label,
  Input,
  Form,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import NavBlack from '../header/NavBlack';
import Footer from '../Footer';
import AOS from 'aos';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';



function ChooseProject() {
  const [posts, setPost] = useState([]);
  const [title, setTitle] = useState(null);
  const [Leader, setLeader] = useState(false);
  const [modal, setModal] = React.useState(false);
  let history = useHistory();

  const toggleModal = () => {
    setModal(!modal);
  }
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }

  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const getprojects = async () => {
    let url = 'http://localhost:8000/posts/';
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
      console.log(response)
      setPost(response)
    })
  }


  const handleCreation = async (props) => {
    const isLeader = props.Leader;
    if (isLeader === false) {
      return null
    }
    else if (isLeader === true) {
      for (var i = 0; i < posts.length; i++) {
        var postslist = posts[i].label.split(' ');
        const title = postslist[0]
        Addprojects(title);
      }
    }
  }


  const Addprojects = async (title) => {
    let url = 'http://localhost:8000/groups/addproject/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "post",
        data: { title },
      })
      .then((res) => {
        console.log(title + ' was added')
      }
      )
      .catch(() => {
        console.log('error');
      })
  }


  const addproject = posts => {
    setPost(posts);
  }

  const loadOptions = async (callback) => {
    let url = 'http://localhost:8000/groups/lookupposts/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'GET',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    const response = await fetch(url, options)
    const json = await response.json()
    callback(json.map(i => ({ label: i.title, value: i.title })));
  }


  useEffect(() => {
    getprojects();
    AOS.init();
    AOS.refresh();
  }, []);



  return (
    <>
      <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div className="section about">
              <br />
              <br />
              <br />
              <Container>

                <section class="breadcrumbs" data-aos="fade-up" data-aos-delay="200">
                  <div class="container">
                    <div class="d-flex justify-content-between align-items-center">
                      <h2>Choose a Project to Work on.</h2>
                      <ol>
                        <li><a href="/home">home</a></li>
                        <li><a href="/student">student</a></li>
                        <li>choose project</li>
                      </ol>
                    </div>
                  </div>
                </section>
                <hr />

                <div className="container">
                  <div class="card my-4">
                    <h2 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">
                      <br />
    Enter the projects from the most wanted to the least wanted.   <br />
                      <br />
                    </h2>
                    <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                      <br />

                      <h5>Add your first choice..</h5>

                      <AsyncSelect
                        value={title}
                        onChange={addproject}
                        placeholder='enter the title of the project..'
                        loadOptions={loadOptions}
                      />
                      <br /><br />

                      <h5>Add your second choice..</h5>


                      <AsyncSelect
                        value={title}
                        onChange={addproject}
                        placeholder='enter the title of the project..'
                        loadOptions={loadOptions}
                      />
                      <br /><br />


                      <h5>Add your third choice..</h5>


                      <AsyncSelect
                        value={title}
                        onChange={addproject}
                        placeholder='enter the title of the project..'
                        loadOptions={loadOptions}
                      />
                      <br />
                      <br />
                      <br /> <center>

                        <Button
                          block
                          className="btn-hover color-1"
                          onClick={() => { handleCreation() }}>
                          Submit choices
                  </Button>

                      </center><br />
                      <br /> 
                      </div>
                  </div>
                </div>
              </Container>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChooseProject;
