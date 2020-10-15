import React, { useEffect, useState } from 'react';
// reactstrap components
import {
  DropdownMenu,
  Dropdown,
  DropdownItem,
  DropdownToggle,
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
  const [title1, setTitle1] = useState(null);
  const [title2, setTitle2] = useState(null);
  const [title3, setTitle3] = useState(null);
  const [title4, setTitle4] = useState(null);
  const [Leader, setLeader] = useState(false);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDD] = useState(false);
  const [dropdownOpen1, setDD1] = useState(false);
  const [dropdownOpen2, setDD2] = useState(false);
  const [dropdownOpen3, setDD3] = useState(false);
  const [dropdownOpen4, setDD4] = useState(false);
  let history = useHistory();

  const toggle = () => setDD(prevState => !prevState);
  const toggle1 = () => setDD1(prevState => !prevState);
  const toggle2 = () => setDD2(prevState => !prevState);
  const toggle3= () => setDD3(prevState => !prevState);
  const toggle4 = () => setDD4(prevState => !prevState);

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    havegrp();
    LeaderOrNo();
    getprojects();
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);


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
        setLeader(res.data.leader)
      }
      )
  }

  const getprojects = async () => {
    let url = 'http://localhost:8001/posts/';
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

  const LeaderOrNo = async () => {
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
        setLeader(res.data.leader)
      }
      )
  }



  const Addprojects = async () => {
    let url = 'http://localhost:8001/groups/addtofiche/';
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
        data: { title,title1,title2 },
      })
      .then((res) => {
        history.push('/student/group');
      }
      )
      .catch(() => {
        history.push('/student/group');
      })
  }


  function ChooseProject(props) {
    const isLeader = props.Leader;
    if (isLeader) {

      return (
        <>
          <div className="container">
            <div class="card my-4">
              <h2 class="card-header headerrr headerrr-hover">
                <br />
    Enter the projects from the most wanted to the least wanted.   <br />
                <br />
              </h2>
              <div class="card-body">
                <br />
                <Row>
                <h5>Add your first choice..</h5>
                <hr/>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>
                  {title}
                </DropdownToggle>
                  <DropdownMenu>
                  {posts.map((post, index) => {
                        return <>
                    <DropdownItem ><div onClick={value => {setTitle(value.currentTarget.textContent)}}>{post.title}</div></DropdownItem>
                    
                    </>
                  })}
                  </DropdownMenu>
                </Dropdown>
                <br/><br/> <br/><br/>
                </Row>
                <Row>
                <h5>Add your second choice..</h5>
                <hr/>
                <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                  <DropdownToggle caret>
                  {title1}
                </DropdownToggle>
                  <DropdownMenu >
                  {posts.map((post, index) => {
                        return <>
                    <DropdownItem><div onClick={value => {setTitle1(value.currentTarget.textContent)}}>{post.title}</div></DropdownItem>
                    
                    </>
                  })}
                  </DropdownMenu>
                </Dropdown>
                <br/><br/> <br/><br/>
                </Row>
                <Row>
                <h5>Add your third choice..</h5>
                <hr/>
                <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                  <DropdownToggle caret>
                  {title2}
                </DropdownToggle>
                  <DropdownMenu >
                  {posts.map((post, index) => {
                        return <>
                    <DropdownItem><div onClick={value => {setTitle2(value.currentTarget.textContent)}}>{post.title}</div></DropdownItem>
                    
                    </>
                  })}
                  </DropdownMenu>
                </Dropdown>
                <br/><br/> <br/><br/>
                </Row>
                <Row>
                <h5>Add your fourth choice..</h5>
                <hr/>
                <Dropdown isOpen={dropdownOpen3} toggle={toggle3}>
                  <DropdownToggle caret>
                  {title3}
                </DropdownToggle>
                  <DropdownMenu >
                  {posts.map((post, index) => {
                        return <>
                    <DropdownItem><div onClick={value => {setTitle3(value.currentTarget.textContent)}}>{post.title}</div></DropdownItem>
                    
                    </>
                  })}
                  </DropdownMenu>
                </Dropdown>
                <br/><br/> <br/><br/>
                </Row>
                <Row>
                <h5>Add your fiveth choice..</h5>
                <hr/>
                <Dropdown isOpen={dropdownOpen4} toggle={toggle4}>
                  <DropdownToggle caret>
                    {title4}
                </DropdownToggle>
                  <DropdownMenu >
                  {posts.map((post, index) => {
                        return <>
                    <DropdownItem><div onClick={value => {setTitle4(value.currentTarget.textContent)}}>{post.title}</div></DropdownItem>
                    </>
                  })}
                  </DropdownMenu>
                </Dropdown>
                <br/><br/>
                </Row>
                <br /> <center>

                  <Button
                    block
                    className="btn-hover color-1"
                    onClick={Addprojects}>
                    Submit choices
                  </Button>

                </center><br />
                <br />
              </div>
            </div>
          </div>

        </>
      );

    }
    else return <div className="container">
      <div class="card my-4">
        <div class="card-body" data-aos="fade-up" data-aos-delay="400">
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <center><h1 > Tou have to be a leader to be able to submit</h1></center>
          <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>
    </div>
  }



  return (<>
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
              <ChooseProject Leader={Leader} />


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
